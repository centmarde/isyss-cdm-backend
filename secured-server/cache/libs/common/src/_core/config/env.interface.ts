import { ValidationPipeOptions, VersioningOptions } from '@nestjs/common';

export interface IEnvironmentalVariables {
  env: string;
  port: number;
  microservice: IMicroServiceConfig;
  mongo: IMongoConfig;
  validationPipeOpts: ValidationPipeOptions;
  versioningOpts: VersioningOptions;
  redis: IRedisCredentials;
  rateLimiter: IRateLimiterCredentials;
  encryption: IEncryptionCredentials;
}

interface IMicroServiceConfig {
  address: string;
}

interface IMongoConfig {
  uri: string;
}

interface IRateLimiterCredentials {
  isDisabled: boolean;
  maxLoginTtl: number;
  maxLoginAttempt: number;
  api_ttl: number;
  api_limit: number;
}

interface IRedisCredentials {
  host: string;
  port: number;
  db: number;
  prefix: string;
  pass: string;
}

interface IEncryptionCredentials {
  cryptoKey: string;
  rsaPassPhrase: string;
}
