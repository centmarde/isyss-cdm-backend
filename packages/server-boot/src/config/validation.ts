import { CustomApiResponse } from '@isyss-cdm/exception';
import { ValidationPipe } from '@nestjs/common';

export function buildValidationPipe() {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => {
      const e0 = errors[0];
      const constraints = e0?.constraints ?? e0?.children?.[0]?.constraints;
      let message = 'Validation failed';
      if (constraints && Object.keys(constraints).length > 0) {
        const firstKey = Object.keys(constraints)[0];
        message = constraints[firstKey] ?? message;
      }
      throw new CustomApiResponse({
        message,
        code: 'GW4000006',
        statusCode: 400,
      });
    },
  });
}
