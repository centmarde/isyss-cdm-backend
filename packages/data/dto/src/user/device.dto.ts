import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DevicePayloadDTO {
  @ApiProperty({ example: 'mobile' })
  @IsNotEmpty()
  @IsString()
  deviceType: string;

  @ApiProperty({ example: 'iPhone 14' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ example: 'A2650' })
  @IsNotEmpty()
  @IsString()
  modelVersion: string;

  @ApiProperty({ example: 'iOS' })
  @IsNotEmpty()
  @IsString()
  os: string;

  @ApiProperty({ example: '16.5' })
  @IsNotEmpty()
  @IsString()
  osVersion: string;

  @ApiProperty({ example: 'Apple' })
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  uuid?: string;

  @ApiProperty({ example: '192.168.1.1', required: false })
  ipAddress?: string;

  @ApiProperty({ example: 'mobile_app', required: false })
  source?: string;

  @ApiProperty({ example: 'Safari', required: false })
  browser?: string;
}
