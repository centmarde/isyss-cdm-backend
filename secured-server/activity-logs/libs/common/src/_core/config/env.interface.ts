import { ValidationPipeOptions, VersioningOptions } from '@nestjs/common';

export interface IEnvironmentalVariables {
  env: string;
  port: number;
  microservice: IMicroServiceConfig;
  mongo: IMongoConfig;
  validationPipeOpts: ValidationPipeOptions;
  versioningOpts: VersioningOptions;
}

interface IMicroServiceConfig {
  address: string;
}

interface IMongoConfig {
  uri: string;
}
