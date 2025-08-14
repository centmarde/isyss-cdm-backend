import { INestApplication, RequestMethod } from '@nestjs/common';
import { json } from 'body-parser';
import { useContainer } from 'class-validator';

export function applyCommonAppConfig(app: INestApplication, appModule: any) {
  app.enableVersioning();
  app.use(json());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  useContainer(app.select(appModule), { fallbackOnErrors: true });
}

export async function startHttpAndMicroservices(
  app: INestApplication,
  port: number,
) {
  await app.startAllMicroservices();
  await app.listen(port);
}
