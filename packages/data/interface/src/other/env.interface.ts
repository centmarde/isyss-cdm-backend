import { ValidationPipeOptions, VersioningOptions } from '@nestjs/common';

export interface IEnvironmentalVariables {
  env: string;
  database: IDatabaseConfig;
  redis: IRedisCredentials;
  microservice: IMicroServiceConfig;
  validationPipeOpts: ValidationPipeOptions;
  versioningOpts: VersioningOptions;
  jwt: IJwtCredentials;
  refreshToken: IRefreshTokenCredentials;
  encryption: IEncryptionCredentials;
  activityLogsService: IActivityLogsServiceCredentials;
  cacheService: ICacheServiceCredentials;
  gatewayService: IGatewayServiceCredentials;
  securityService: ISecurityServiceCredentials;
  userAccountService: IUserAccountServiceCredentials;
  rateLimiter: IRateLimiterCredentials;
  swagger: ISwaggerCredentials;
}

interface IDatabaseConfig {
  postgres: {
    userAccountUrl: string;
    licensingUrl: string;
  };
  mongo: {
    cacheUri: string;
    systemUri: string;
  };
}

interface IRedisCredentials {
  host: string;
  database: string;
  port: number;
  password: string;
  prefix: string;
}

interface IMicroServiceConfig {
  address: string;
}

interface IJwtCredentials {
  secretKey: string;
  expiration: string;
}

interface IRefreshTokenCredentials {
  tokenSecretKey: string;
  cookieSecretKey: string;
  tokenExpiration: string;
}

interface IEncryptionCredentials {
  cryptoKey: string;
  rsaPassPhrase: string;
}

interface IActivityLogsServiceCredentials {
  port: number;
}

interface ICacheServiceCredentials {
  port: number;
}

interface IGatewayServiceCredentials {
  port: number;
}

interface ISecurityServiceCredentials {
  port: number;
}

interface IUserAccountServiceCredentials {
  port: number;
}

interface IRateLimiterCredentials {
  isDisabled: boolean;
  maxLoginTtl: number;
  maxLoginAttempt: number;
  api_ttl: number;
  api_limit: number;
}

interface ISwaggerCredentials {
  hideModel: boolean;
  username: string;
  password: string;
}
