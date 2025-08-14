import { ACCESS_COOKIE, REFRESH_COOKIE } from '@isyss-cdm/constants';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { IDecodedRefreshToken, IJwtRequest } from '@isyss-cdm/interface';
import { decrypt } from '@isyss-cdm/utils';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CommonMicroService } from 'libs/common/src/microservice';
import { apiMessage } from '../../swagger/api-message.const';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commonMicroService: CommonMicroService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IJwtRequest>();
    const token = this.extractAccessTokenFromCookies(request);

    if (token) {
      // Check if the token is blacklisted
      const isBlacklisted = await this.commonMicroService.cachingService(
        'caching.is.token.black.listed',
        { token },
      );

      if (isBlacklisted) {
        throw new BadRequestException('isBlacklisted', isBlacklisted);
      }

      // Optional: Decode and validate custom fields in the token
      const decodedToken = this.decodeToken(token);

      if (!decodedToken || !this.validateTokenPayload(decodedToken)) {
        throw new CustomApiResponse(apiMessage['GATEWAY4010001']); // Invalid token
      }

      // Retrieve and validate the refresh token from cookies
      const refreshToken = this.extractRefreshTokenFromCookies(request);

      if (refreshToken) {
        await this.validateRefreshToken(refreshToken); // Validate refresh token
      } else {
        throw new CustomApiResponse(apiMessage['GATEWAY4010001']); // Invalid refresh token
      }

      // Inject token as Bearer in header so Passport-JWT can pick it up
      request.headers['authorization'] = `Bearer ${token}`;
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new CustomApiResponse(apiMessage['GATEWAY4010001']);
    }
    return user;
  }

  private extractAccessTokenFromCookies(request: IJwtRequest): string | null {
    return request.cookies?.[ACCESS_COOKIE] || null;
  }

  private decodeToken(token: string): Record<string, unknown> | null {
    try {
      return this.jwtService.decode(token);
    } catch {
      return null;
    }
  }

  private validateTokenPayload(payload: Record<string, unknown>): boolean {
    // Check required fields in the token
    const requiredFields = [
      'id',
      'email',
      'username',
      'lastName',
      'firstName',
      'type',
      'env',
    ];
    return requiredFields.every((field) => field in payload);
  }

  private async validateRefreshToken(refreshToken: string): Promise<void> {
    // Split and decrypt the refresh token
    const [iv, content] = refreshToken.split('.');
    const decryptedToken = decrypt({ iv, content }); // Replace with your actual decryption method

    // Decode the decrypted refresh token
    const decodedRefreshToken: IDecodedRefreshToken =
      this.jwtService.decode(decryptedToken);

    // Get the current time in seconds
    const now = Math.floor(Date.now() / 1000);

    // Check if the refresh token is expired
    if (
      !decodedRefreshToken ||
      typeof decodedRefreshToken.exp !== 'number' ||
      now >= decodedRefreshToken.exp
    ) {
      throw new CustomApiResponse(apiMessage['GATEWAY4010001']); // Invalid or expired
    }

    // Fetch the refresh token record from the database
    const tokenRecord = await this.commonMicroService.cachingService(
      'auth.get.refresh.token',
      { refreshToken },
    );

    // Check if the token exists and matches the expiration in the database
    if (
      !tokenRecord ||
      new Date(tokenRecord.expiration).getTime() <= Date.now()
    ) {
      throw new CustomApiResponse(apiMessage['GATEWAY4010001']); // Refresh token invalid or expired
    }
  }

  private extractRefreshTokenFromCookies(request: IJwtRequest): string | null {
    // Ensure the cookies object exists and retrieve the refresh token
    return request.cookies[REFRESH_COOKIE] || null;
  }
}
