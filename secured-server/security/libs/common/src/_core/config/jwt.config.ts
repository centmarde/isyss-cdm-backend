import { JWT_STRATEGY_CONFIG } from '@isyss-cdm/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { isNumberString } from 'class-validator';
import { envConfig } from './env.config';

export const jwtConfig = {
  provide: JWT_STRATEGY_CONFIG,
  imports: [ConfigModule],
  useFactory: (): JwtModuleOptions => {
    const {
      jwt: { expiration, secretKey },
    } = envConfig();

    return {
      secret: secretKey,
      signOptions: {
        expiresIn: isNumberString(expiration) ? Number(expiration) : expiration,
      },
    };
  },
  inject: [ConfigService],
};
