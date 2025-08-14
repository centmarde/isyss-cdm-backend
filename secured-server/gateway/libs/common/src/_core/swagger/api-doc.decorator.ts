import { IApiDocConfig } from '@isyss-cdm/interface';
import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiDocMap } from './api-doc.const';

export function ApiDoc(name: keyof typeof ApiDocMap) {
  const config: IApiDocConfig = ApiDocMap[name];

  if (!config) {
    throw new Error(`Missing ApiDoc config for: ${name}`);
  }

  const decorators = [];

  if (config.bearerAuth !== false) {
    decorators.push(ApiBearerAuth());
  }

  decorators.push(
    HttpCode(config.statusCode || HttpStatus.OK),
    ApiOperation({
      summary: config.summary,
      description: config.description,
    }),
    ...config.responses.map((r) =>
      ApiResponse({
        ...r,
        ...(config.type && Number(r.status) === Number(config.statusCode)
          ? { type: config.type }
          : {}),
      }),
    ),
  );

  return applyDecorators(...(decorators as MethodDecorator[]));
}
