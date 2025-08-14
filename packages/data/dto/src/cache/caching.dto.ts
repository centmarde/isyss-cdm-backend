import { ApiProperty, PickType } from '@nestjs/swagger';

export class BlacklistTokenPayloadDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  ttlSeconds?: number;
}

export class IsTokenBlacklistedPayloadDTO extends PickType(
  BlacklistTokenPayloadDTO,
  ['token'],
) {}
