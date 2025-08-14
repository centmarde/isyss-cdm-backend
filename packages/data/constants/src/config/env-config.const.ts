import { EnvType } from '@isyss-cdm/enum';
import { IEnvironmentalVariables } from '@isyss-cdm/interface';
import { VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = (): IEnvironmentalVariables => {
  const {
    NODE_ENV,
    POSTGRES_USER_ACCOUNT_URL,
    POSTGRES_LICENSING_URL,
    MONGO_CACHE_URI,
    MONGO_SYSTEM_URI,
    REDIS_HOST,
    REDIS_DB,
    REDIS_PORT,
    REDIS_PASS,
    REDIS_PREFIX,
    MICRO_ADDRESS,
    JWT_SECRET_KEY,
    JWT_EXPIRATION,
    REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRATION,
    COOKIE_SECRET_KEY,
    CRYPTO_ENCRYPTION_KEY,
    RSA_PASS_PHRASE,
    ACTLOG_PORT,
    CACHE_PORT,
    GATEWAY_PORT,
    SECURITY_PORT,
    USERACC_PORT,
    RL_MAX_LOGIN_TTL,
    RL_MAX_LOGIN_ATTEMPT,
    RL_DISABLED,
    RL_API_TTL,
    RL_API_LIMIT,
    SWAGGER_HIDE_MODELS,
    SWAGGER_USERNAME,
    SWAGGER_PASSWORD,
  } = process.env;

  return {
    env: String(NODE_ENV) || EnvType.DEV,
    database: {
      postgres: {
        userAccountUrl: String(POSTGRES_USER_ACCOUNT_URL) || '',
        licensingUrl: String(POSTGRES_LICENSING_URL) || '',
      },
      mongo: {
        cacheUri: String(MONGO_CACHE_URI) || '',
        systemUri: String(MONGO_SYSTEM_URI) || '',
      },
    },
    redis: {
      host: String(REDIS_HOST) || 'localhost',
      database: String(REDIS_DB) || '',
      port: Number(REDIS_PORT) || 6379,
      password: String(REDIS_PASS) || '',
      prefix: String(REDIS_PREFIX) || '',
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
    jwt: {
      secretKey: String(JWT_SECRET_KEY) || '',
      expiration: String(JWT_EXPIRATION) || '',
    },
    refreshToken: {
      tokenSecretKey: String(REFRESH_TOKEN_SECRET_KEY) || '',
      tokenExpiration: String(REFRESH_TOKEN_EXPIRATION) || '',
      cookieSecretKey: String(COOKIE_SECRET_KEY) || '',
    },
    encryption: {
      cryptoKey: String(CRYPTO_ENCRYPTION_KEY) || '',
      rsaPassPhrase: RSA_PASS_PHRASE || '',
    },
    activityLogsService: { port: Number(ACTLOG_PORT) || 3004 },
    cacheService: { port: Number(CACHE_PORT) || 3002 },
    gatewayService: { port: Number(GATEWAY_PORT) || 3000 },
    securityService: { port: Number(SECURITY_PORT) || 3001 },
    userAccountService: { port: Number(USERACC_PORT) || 3003 },
    rateLimiter: {
      isDisabled: Boolean(RL_DISABLED) || true,
      maxLoginTtl: Number(RL_MAX_LOGIN_TTL) || 3,
      maxLoginAttempt: Number(RL_MAX_LOGIN_ATTEMPT) || 3,
      api_ttl: Number(RL_API_TTL) || 60000,
      api_limit: Number(RL_API_LIMIT) || 10,
    },
    swagger: {
      hideModel: Boolean(SWAGGER_HIDE_MODELS) || true,
      username: String(SWAGGER_USERNAME) || '',
      password: String(SWAGGER_PASSWORD) || '',
    },
  };
};
