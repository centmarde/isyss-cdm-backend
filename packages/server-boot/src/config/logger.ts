import { envConfig } from '@isyss-cdm/constants';
import { EnvType } from '@isyss-cdm/enum';
import { LogLevel } from '@nestjs/common';

export function getLogLevels(): LogLevel[] {
  const { env } = envConfig();
  const isProd = env === EnvType.PROD || env === 'production';
  return isProd
    ? ['log', 'warn', 'error']
    : ['error', 'warn', 'log', 'verbose', 'debug'];
}
