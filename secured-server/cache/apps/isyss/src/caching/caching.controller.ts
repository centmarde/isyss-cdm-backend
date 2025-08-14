import {
  BlacklistTokenPayloadDTO,
  IsTokenBlacklistedPayloadDTO,
} from '@isyss-cdm/dto';
import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CachingService } from './caching.service';

@Controller('caching')
export class CachingController {
  constructor(private readonly cachingService: CachingService) {
    //
  }

  @EventPattern('caching.black.list.token')
  async blacklistTokenRequest(
    @Payload() data: BlacklistTokenPayloadDTO,
  ): Promise<HttpStatus> {
    return this.cachingService.blacklistToken(data);
  }

  @EventPattern('caching.is.token.black.listed')
  async isTokenBlacklistedRequest(
    @Payload() data: IsTokenBlacklistedPayloadDTO,
  ): Promise<boolean> {
    return this.cachingService.isTokenBlacklisted(data);
  }
}
