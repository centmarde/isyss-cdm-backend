import { CommonMicroService } from '@app/common';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@isyss-cdm/constants';
import { LoginPayloadDTO, LoginResDTO } from '@isyss-cdm/dto';
import { ICurrentUser } from '@isyss-cdm/interface';
import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }

  async loginAdmin(
    userAgent: string,
    ipAddress: string,
    payload: LoginPayloadDTO,
    res: Response,
  ): Promise<LoginResDTO> {
    const { response, cookies } = await this.commonMicroService.securityService(
      'auth.login.admin',
      {
        userAgent,
        ipAddress,
        payload,
      },
    );

    // Set cookies
    cookies.forEach((cookie) => {
      res.cookie(cookie.name, cookie.value, cookie.options);
    });

    return response;
  }

  async logout(
    refreshToken: string,
    res: Response,
    currUser: ICurrentUser,
    token: string,
  ) {
    const result = await this.commonMicroService.securityService(
      'auth.logout',
      { token, refreshToken, currUser },
    );

    // Remove cookies
    res.clearCookie(ACCESS_COOKIE);
    res.clearCookie(REFRESH_COOKIE);

    return result;
  }
}
