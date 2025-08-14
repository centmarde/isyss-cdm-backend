import { EnvType } from '@isyss-cdm/enum';
import { VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IEnvironmentalVariables } from './env.interface';

dotenv.config();

export const envConfig = (): IEnvironmentalVariables => {
  const {
    NODE_ENV,
    PORT,
    MICRO_ADDRESS,
    JWT_SECRET_KEY,
    JWT_EXPIRATION,
    CRYPTO_ENCRYPTION_KEY,
    RSA_PASS_PHRASE,
    REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRATION,
    COOKIE_SECRET_KEY,
  } = process.env;

  return {
    env: String(NODE_ENV),
    port: Number(PORT) || 3001,
    microservice: {
      address: String(MICRO_ADDRESS) || 'localhost:9092',
    },
    validationPipeOpts: {
      disableErrorMessages: NODE_ENV === EnvType.PROD ? true : false,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
    },
    versioningOpts: {
      type: VersioningType.URI,
    },
    jwt: {
      secretKey: String(JWT_SECRET_KEY),
      expiration: String(JWT_EXPIRATION),
    },
    refreshToken: {
      tokenSecretKey: String(REFRESH_TOKEN_SECRET_KEY),
      tokenExpiration: String(REFRESH_TOKEN_EXPIRATION),
      cookieSecretKey: String(COOKIE_SECRET_KEY),
    },
    encryption: {
      cryptoKey: String(CRYPTO_ENCRYPTION_KEY),
      rsaPassPhrase: RSA_PASS_PHRASE || '',
    },
  };
};
