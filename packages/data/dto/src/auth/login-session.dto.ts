import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginSessionPayloadDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userType: string;

  @ApiProperty()
  deviceId: string;
}

export class GetLoginSessionByUserIdPayloadDTO {
  @ApiProperty()
  userId: string;
}
