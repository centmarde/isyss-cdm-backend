import { CommonMicroService } from '@app/common';
import { GenerateTokenResDTO } from '@isyss-cdm/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }

  async generateToken(
    refreshToken: string,
    res: Response,
  ): Promise<GenerateTokenResDTO> {
    const { response, cookie } = await this.commonMicroService.securityService(
      'auth.generate.token',
      { refreshToken },
    );

    res.cookie(cookie.name, cookie.value, cookie.options);

    return response;
  }
}
