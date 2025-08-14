import { ApiProperty } from '@nestjs/swagger';

export class CustomResDTO {
  @ApiProperty({ example: 'Ok' })
  message?: string;

  @ApiProperty({ example: '000000' })
  code?: string;

  @ApiProperty({ example: 200 })
  statusCode?: number;
}
