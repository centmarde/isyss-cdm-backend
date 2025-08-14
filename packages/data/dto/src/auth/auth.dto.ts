import { UserType } from '@isyss-cdm/enum';
import { ICurrentUser } from '@isyss-cdm/interface';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CookieOptions } from 'express';
import { CustomResDTO } from '../other/custom-api.dto';
import { DevicePayloadDTO } from '../user/device.dto';

export class LoginBodyDTO {
  @ApiProperty({ example: 'admin@example.com' })
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty({ example: 'Password@123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DevicePayloadDTO)
  device: DevicePayloadDTO;
}

export class LoginUserDTO {
  @ApiProperty({ example: 'admin@example.com' })
  email: string;

  @ApiProperty({ example: UserType.ADMIN })
  type: UserType;
}

export class LogoutPayloadDTO {
  @ApiProperty({ example: '' })
  token: string;

  @ApiProperty({ example: '' })
  refreshToken: string;

  @ApiProperty({ example: '' })
  currUser: ICurrentUser;
}

export class LogoutResDTO extends PickType(CustomResDTO, [
  'message',
  'code',
  'statusCode',
] as const) {}

export class CheckSessionResDTO extends PickType(CustomResDTO, [
  'message',
  'code',
  'statusCode',
] as const) {}

export class LoginPayloadDTO {
  @ApiProperty({ example: '' })
  userAgent: string;

  @ApiProperty({ example: '' })
  ipAddress: string;

  @ApiProperty({ example: '' })
  body: LoginBodyDTO;
}

export class LoginResDTO {
  @ApiProperty({ example: '' })
  response: LoginUserDTO;

  @ApiProperty({ example: '' })
  cookies: { name: string; value: string; options: CookieOptions }[];
}
