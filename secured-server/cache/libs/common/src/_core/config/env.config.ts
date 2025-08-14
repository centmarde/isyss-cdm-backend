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
    REDIS_HOST,
    REDIS_DB,
    REDIS_PORT,
    REDIS_PASS,
    REDIS_PREFIX,
    RL_MAX_LOGIN_TTL,
    RL_MAX_LOGIN_ATTEMPT,
    RL_DISABLED,
    RL_API_TTL,
    RL_API_LIMIT,
    MONGO_URI,
    CRYPTO_ENCRYPTION_KEY,
    RSA_PASS_PHRASE,
  } = process.env;

  return {
    env: String(NODE_ENV),
    port: Number(PORT) || 3002,
    mongo: {
      uri: String(MONGO_URI),
    },
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
    rateLimiter: {
      isDisabled: Boolean(RL_DISABLED),
      maxLoginTtl: Number(RL_MAX_LOGIN_TTL),
      maxLoginAttempt: Number(RL_MAX_LOGIN_ATTEMPT),
      api_ttl: Number(RL_API_TTL),
      api_limit: Number(RL_API_LIMIT),
    },
    redis: {
      host: String(REDIS_HOST),
      port: Number(REDIS_PORT),
      db: Number(REDIS_DB),
      prefix: String(REDIS_PREFIX),
      pass: String(REDIS_PASS),
    },
    encryption: {
      cryptoKey: String(CRYPTO_ENCRYPTION_KEY),
      rsaPassPhrase: RSA_PASS_PHRASE || '',
    },
  };
};
