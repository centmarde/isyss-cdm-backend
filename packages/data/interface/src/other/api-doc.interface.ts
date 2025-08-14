import { HttpStatus, Type } from '@nestjs/common';

export interface IApiDocConfig {
  summary: string;
  description: string;
  statusCode?: HttpStatus;
  bearerAuth?: boolean;
  type?: Type<unknown>;
  responses: IApiDocResponse[];
}

interface IApiDocResponse {
  status: number;
  description: string;
}
