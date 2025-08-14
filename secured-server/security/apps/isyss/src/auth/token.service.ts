import { apiMessage, CommonMicroService, envConfig } from '@app/common';
import { ACCESS_COOKIE, cookieConfig } from '@isyss-cdm/constants';
import { GenerateTokenPayloadDTO, GenerateTokenResDTO } from '@isyss-cdm/dto';
import { EnvType } from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly commonMicroService: CommonMicroService,
  ) {
    //
  }

  async generateToken(
    data: GenerateTokenPayloadDTO,
  ): Promise<GenerateTokenResDTO> {
    const { env } = envConfig();
    const { refreshToken } = data;

    await this.validateRefreshToken(refreshToken);

    const { user } = await this.commonMicroService.cachingService(
      'auth.get.refresh.token',
      { refreshToken },
    );

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      type: user.type,
      env: env || EnvType.DEV,
    });

    return {
      response: {
        statusCode: 200,
      },
      cookie: {
        name: ACCESS_COOKIE,
        value: accessToken,
        options: cookieConfig,
      },
    };
  }

  async validateRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new CustomApiResponse(apiMessage['SEC4030004']);
    }

    const data = await this.commonMicroService.cachingService(
      'auth.get.refresh.token',
      { refreshToken },
    );

    if (!data.refreshToken || !data.user) {
      throw new CustomApiResponse(apiMessage['SEC4030004']);
    }

    // Check refresh token expiration
    const now = new Date();
    const expirationDate = new Date(data.refreshToken.expiration);
    if (now > expirationDate) {
      throw new CustomApiResponse(apiMessage['SEC4030004']);
    }
  }
}
