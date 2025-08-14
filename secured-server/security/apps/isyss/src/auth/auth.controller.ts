import {
  GenerateTokenPayloadDTO,
  LoginPayloadDTO,
  LogoutPayloadDTO,
} from '@isyss-cdm/dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    //
  }

  @MessagePattern('auth.login.admin')
  async loginAdminRequest(@Payload() data: LoginPayloadDTO): Promise<string> {
    return JSON.stringify(this.authService.loginAdmin(data));
  }

  @MessagePattern('auth.generate.token')
  async generateTokenRequest(
    @Payload() data: GenerateTokenPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(this.tokenService.generateToken(data));
  }

  @MessagePattern('auth.logout')
  async logoutRequest(@Payload() data: LogoutPayloadDTO): Promise<string> {
    return JSON.stringify(this.authService.logout(data));
  }
}
