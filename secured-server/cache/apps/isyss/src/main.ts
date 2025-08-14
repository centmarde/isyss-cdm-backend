import { envConfig } from '@app/common';
import { EnvType } from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { SanitizeResponseInterceptor } from '@isyss-cdm/interceptor';
import {
  INestApplication,
  LogLevel,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { json } from 'body-parser';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { AppModule } from './app.module';

const { microservice, env } = envConfig();

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

const initHelmet = () => {
  return helmet({
    referrerPolicy: { policy: 'no-referrer' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
};

const initCors = (appNodeEnv: string): CorsOptions => {
  const allowedOrigins = [
    // list here all allowed origin
  ];

  const validateOrigin = (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    // In development, allow all origins
    if (appNodeEnv === EnvType.DEV) {
      return callback(null, true);
    }

    // In production, apply strict whitelist
    if (appNodeEnv === EnvType.PROD) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    }

    // Fallback: allow everything
    callback(null, true);
  };

  return {
    origin: validateOrigin,
    credentials: true,
  };
};

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === EnvType.PROD),
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [microservice.address],
      },
      consumer: {
        groupId: 'caching-service',
      },
    },
  });
  app.enableVersioning();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        throw new CustomApiResponse({
          message: errors[0].hasOwnProperty('constraints')
            ? errors[0].constraints[Object?.keys(errors[0]?.constraints)[0]]
            : (errors[0].children[0].constraints[
                Object?.keys(errors[0].children[0].constraints)[0]
              ] ?? 'Validation failed'),
          code: 'CACHE4000006',
          statusCode: 400,
        });
      },
    }),
  );
  app.use(json());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.useGlobalInterceptors(new SanitizeResponseInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(initCors(env));
  app.use(initHelmet());

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
});
