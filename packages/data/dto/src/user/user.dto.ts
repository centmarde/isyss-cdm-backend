import { UserType } from '@isyss-cdm/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDTO {
  id: string;
  email: string;
  username: string;
  mobileNumber: string;
  type: UserType;
  adminId?: string | null;
  clientId?: string | null;
}

export class GetUserByUserIdPayloadDTO {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  @IsNotEmpty()
  @IsUUID(4, { message: 'Invalid ID format.' })
  userId: string;
}

export class ValidateUserLoginPayloadDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  type: UserType;
}

export class GetUserByIdentifierDTO {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  isUsername: boolean;
}

export class UpdateUserLoginStatusDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  isLoggedIn: boolean;

  @ApiProperty()
  userType: UserType;
}

export class GetDeviceBySourceAndUserIdDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userType: UserType;

  @ApiProperty()
  source: string;
}
