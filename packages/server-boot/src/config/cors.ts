import { envConfig } from '@isyss-cdm/constants';
import { EnvType } from '@isyss-cdm/enum';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function buildCorsOptions(allowedOrigins: string[] = []): CorsOptions {
  const { env } = envConfig();
  const validateOrigin: CorsOptions['origin'] = (origin, cb) => {
    if (env === EnvType.DEV) return cb(null, true); // ok for dev
    if (env === EnvType.PROD) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} not allowed by CORS`));
    }
    return cb(null, true);
  };

  return {
    origin: validateOrigin,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Content-Disposition'],
  };
}
