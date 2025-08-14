import { ValidationPipeOptions, VersioningOptions } from '@nestjs/common';

export interface IEnvironmentalVariables {
  env: string;
  port: number;
  database: IDatabaseConfig;
  microservice: IMicroServiceConfig;
  validationPipeOpts: ValidationPipeOptions;
  versioningOpts: VersioningOptions;
}

interface IMicroServiceConfig {
  address: string;
}

interface IDatabaseConfig {
  url: string;
}
