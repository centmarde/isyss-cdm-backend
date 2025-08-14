import { ApiDoc, JwtAuthGuard } from '@app/common';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@isyss-cdm/constants';
import { Cookies, CurrentUser } from '@isyss-cdm/decorator';
import {
  GenerateTokenResDTO,
  LoginPayloadDTO,
  LoginResDTO,
} from '@isyss-cdm/dto';
import { ICurrentUser } from '@isyss-cdm/interface';
import {
  Body,
  Controller,
  Headers,
  Ip,
  Post,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    //
  }

  @Post('admin/login')
  @Version('1')
  @ApiDoc('login')
  async login(
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
    @Body() payload: LoginPayloadDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResDTO> {
    return this.authService.loginAdmin(userAgent, ipAddress, payload, res);
  }

  @Post('token')
  @Version('1')
  @ApiDoc('token')
  async generateToken(
    @Cookies(REFRESH_COOKIE) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<GenerateTokenResDTO> {
    return this.tokenService.generateToken(refreshToken, res);
  }

  @Post('logout')
  @Version('1')
  @ApiDoc('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Cookies(ACCESS_COOKIE) token: string,
    @Cookies(REFRESH_COOKIE) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() currUser: ICurrentUser,
  ) {
    return this.authService.logout(refreshToken, res, currUser, token);
  }

  // @Get('verify')
  // @Version('1')
  // // @ApiDoc('verifySession')
  // @UseGuards(
  //   JwtAuthGuard,
  //   IsUserNotInactiveGuard,
  //   IsValidLoginSessionGuard,
  //   IsValidEnvGuard,
  // )
  // checkSession(): boolean {
  //   return true;
  // }
}
