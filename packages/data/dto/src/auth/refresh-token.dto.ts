import { ApiProperty, PickType } from '@nestjs/swagger';
import { CookieOptions } from 'express';
import { CustomResDTO } from '../other/custom-api.dto';

export class GenerateTokenUserResDTO extends PickType(CustomResDTO, [
  'message',
  'code',
  'statusCode',
] as const) {}

export class GenerateTokenPayloadDTO {
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class GetRefreshTokenPayloadDTO extends PickType(
  GenerateTokenPayloadDTO,
  ['refreshToken'],
) {}

export class GenerateTokenResDTO {
  @ApiProperty({ example: '' })
  response: GenerateTokenUserResDTO;

  @ApiProperty({ example: '' })
  cookie: { name: string; value: string; options: CookieOptions };
}

export class DeleteRefreshTokenPayloadDTO {
  @ApiProperty({ example: '' })
  id: string;
}
