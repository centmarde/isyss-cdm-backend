import { ICustomApiError } from '@isyss-cdm/interface';
import { HttpException } from '@nestjs/common';

export class CustomApiResponse extends HttpException {
  constructor(data: ICustomApiError) {
    super(
      {
        ...data,
        message: data.message,
        code: data.code,
        statusCode: data.statusCode,
      },
      data.statusCode,
    );
  }
}
