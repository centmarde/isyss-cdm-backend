import { envConfig } from '@isyss-cdm/constants';
import { EnvType } from '@isyss-cdm/enum';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

export function setupSwagger(app: INestApplication, hideModels?: boolean) {
  const cfg = new DocumentBuilder()
    .setTitle('MicroService API for ISYSS-CDM')
    .setDescription('MicroService API for ISYSS-CDM')
    .setVersion('1.0.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, doc, {
    ...(hideModels
      ? {
          swaggerOptions: {
            defaultModelsExpandDepth: -1,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
          },
        }
      : {}),
  });
}

export function protectAndSetupSwagger(app: INestApplication) {
  const { env, swagger } = envConfig();
  if ([EnvType.DEV, EnvType.QA].includes(env as EnvType)) {
    const users = {} as Record<string, string>;
    if (swagger.username && swagger.password) {
      users[swagger.username] = swagger.password;
    }

    const docsAuth = expressBasicAuth({
      challenge: true,
      users: users,
      // If username/password are missing, basic-auth still works with no users (denies all).
    });

    // @ts-ignore: Nest wraps Express
    const raw = app.getHttpAdapter().getInstance();
    raw.use('/docs', docsAuth);
    raw.use('/docs-json', docsAuth);

    const hide =
      typeof swagger.hideModel === 'string'
        ? swagger.hideModel === 'true'
        : Boolean(swagger.hideModel);

    setupSwagger(app, hide);
  }
}
