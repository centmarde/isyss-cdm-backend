import { EnvType } from '@isyss-cdm/enum';
import { VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IEnvironmentalVariables } from './env.interface';

dotenv.config();

export const envConfig = (): IEnvironmentalVariables => {
  const { NODE_ENV, PORT, MICRO_ADDRESS, MONGO_URI } = process.env;

  return {
    env: String(NODE_ENV),
    port: Number(PORT) || 3004,
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
  };
};
