import { ValidationPipeOptions, VersioningOptions } from '@nestjs/common';

export interface IEnvironmentalVariables {
  env: string;
  port: number;
  microservice: IMicroServiceConfig;
  validationPipeOpts: ValidationPipeOptions;
  versioningOpts: VersioningOptions;
  jwt: IJwtCredentials;
  refreshToken: IRefreshTokenCredentials;
  encryption: IEncryptionCredentials;
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
