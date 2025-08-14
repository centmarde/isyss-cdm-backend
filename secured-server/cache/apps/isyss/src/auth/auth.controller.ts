import { RefreshTokenDocument } from '@isyss-cdm/cache-schema';
import {
  CreateLoginSessionPayloadDTO,
  DeleteRefreshTokenPayloadDTO,
  GetLoginSessionByUserIdPayloadDTO,
  GetRefreshTokenPayloadDTO,
} from '@isyss-cdm/dto';
import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginSessionService } from './login-session.service';
import { RefreshTokenService } from './refresh-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginSessionService: LoginSessionService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    //
  }

  @EventPattern('auth.create.login.session')
  async createLoginSessionRequest(
    @Payload() data: CreateLoginSessionPayloadDTO,
  ): Promise<HttpStatus> {
    return this.loginSessionService.createLoginSession(data);
  }

  @MessagePattern('auth.get.login.session.by.user.id')
  async getLoginSessionByUserIdRequest(
    @Payload() data: GetLoginSessionByUserIdPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(
      this.loginSessionService.getLoginSessionByUserId(data),
    );
  }

  @EventPattern('auth.create.refresh.token')
  async createRefreshTokenRequest(
    @Payload() data: Partial<RefreshTokenDocument>,
  ): Promise<HttpStatus> {
    return this.refreshTokenService.createRefreshToken(data);
  }

  @MessagePattern('auth.get.refresh.token')
  async getRefreshTokenRequest(
    @Payload() data: GetRefreshTokenPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(this.refreshTokenService.getRefreshToken(data));
  }

  @EventPattern('auth.delete.refresh.token')
  async deleteRefreshTokenRequest(
    @Payload() data: DeleteRefreshTokenPayloadDTO,
  ): Promise<HttpStatus> {
    return this.refreshTokenService.deleteRefreshToken(data);
  }
}
