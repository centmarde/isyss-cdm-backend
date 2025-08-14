import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// const { microservice, swagger, env } = envConfig();

// function getLogLevels(isProduction: boolean): LogLevel[] {
//   if (isProduction) {
//     return ['log', 'warn', 'error'];
//   }
//   return ['error', 'warn', 'log', 'verbose', 'debug'];
// }

// const initHelmet = () => {
//   return helmet({
//     referrerPolicy: { policy: 'no-referrer' },
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: [`'self'`],
//         styleSrc: [`'self'`, `'unsafe-inline'`],
//         imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
//         scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
//       },
//     },
//   });
// };

// const initCors = (appNodeEnv: string): CorsOptions => {
//   const allowedOrigins = [
//     // list here all allowed origin
//   ];

//   const validateOrigin = (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void,
//   ) => {
//     // In development, allow all origins
//     if (appNodeEnv === EnvType.DEV) {
//       return callback(null, true);
//     }

//     // In production, apply strict whitelist
//     if (appNodeEnv === EnvType.PROD) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     }

//     // Fallback: allow everything
//     callback(null, true);
//   };

//   return {
//     origin: validateOrigin,
//     credentials: true,
//   };
// };

// const initSwagger = (app, swaggerHideModels: boolean) => {
//   const hideModel = Boolean(swaggerHideModels);

//   const options = new DocumentBuilder()
//     .setTitle('MicroService API for ISYSS-CDM')
//     .setVersion('1.0.0')
//     .setDescription('MicroService API for ISYSS-CDM')
//     .addBearerAuth({ in: 'header', type: 'http' })
//     .build();

//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('docs', app, document, {
//     ...(hideModel
//       ? {
//           swaggerOptions: {
//             defaultModelsExpandDepth: -1,
//             tagsSorter: 'alpha',
//             operationsSorter: 'alpha',
//           },
//         }
//       : {}),
//   });
// };

// const initSwaggerDocs = (secretManager: any, app: any) => {
//   if ([EnvType.DEV, EnvType.QA].includes(secretManager.NODE_ENV)) {
//     const docsAuth = expressBasicAuth({
//       challenge: true,
//       users: {
//         [secretManager.SWAGGER_USERNAME]: secretManager.SWAGGER_PASSWORD,
//       },
//     });

//     app.use('/docs', docsAuth);
//     app.use('/docs-json', docsAuth);
//     initSwagger(app, secretManager.SWAGGER_HIDE_MODELS);
//   }
// };

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     logger: getLogLevels(process.env.NODE_ENV === EnvType.PROD),
//   });
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.KAFKA,
//     options: {
//       client: {
//         brokers: [microservice.address],
//       },
//       consumer: {
//         groupId: 'gateway-service',
//       },
//     },
//   });
//   app.enableVersioning();
//   app.useGlobalPipes(
//     new ValidationPipe({
//       exceptionFactory: (errors) => {
//         throw new CustomApiResponse({
//           message: errors[0].hasOwnProperty('constraints')
//             ? errors[0].constraints[Object?.keys(errors[0]?.constraints)[0]]
//             : (errors[0].children[0].constraints[
//                 Object?.keys(errors[0].children[0].constraints)[0]
//               ] ?? 'Validation failed'),
//           code: 'GW4000006',
//           statusCode: 400,
//         });
//       },
//     }),
//   );
//   app.use(json());
//   app.setGlobalPrefix('api', {
//     exclude: [{ path: '/', method: RequestMethod.GET }],
//   });
//   useContainer(app.select(AppModule), { fallbackOnErrors: true });
//   app.enableCors(initCors(env));
//   app.use(initHelmet());

//   initSwaggerDocs(swagger, app);
//   await app.startAllMicroservices();
//   await app.listen(process.env.PORT);
// }

// bootstrap().catch((err) => {
//   console.error('Application failed to start:', err);
// });

import { envConfig } from '@isyss-cdm/constants';
import {
  applyCommonAppConfig,
  buildCorsOptions,
  buildValidationPipe,
  connectKafka,
  getLogLevels,
  initHelmet,
  protectAndSetupSwagger,
  startHttpAndMicroservices,
} from '@isyss-cdm/server-boot';

async function bootstrap() {
  const { gatewayService } = envConfig();
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels() as LogLevel[],
  });

  app.useGlobalPipes(buildValidationPipe());
  const raw = app.getHttpAdapter().getInstance();
  initHelmet(raw);
  app.enableCors(
    buildCorsOptions([
      // e.g. 'https://isyss.local',
    ]),
  );

  connectKafka(app, { groupId: 'gateway-service' });
  protectAndSetupSwagger(app);
  applyCommonAppConfig(app, AppModule);

  await startHttpAndMicroservices(app, gatewayService.port);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
});
