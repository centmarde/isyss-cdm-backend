import { CommonCachingService } from '@app/common';
import {
  BlacklistTokenPayloadDTO,
  IsTokenBlacklistedPayloadDTO,
} from '@isyss-cdm/dto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CachingService {
  private readonly logger = new Logger(CachingService.name);

  constructor(private readonly commonCachingService: CommonCachingService) {
    //
  }

  async blacklistToken(data: BlacklistTokenPayloadDTO): Promise<HttpStatus> {
    const { token, ttlSeconds } = data;
    if (!token) return;

    const key = `blacklist_${token}`;
    await this.commonCachingService.set(key, true, ttlSeconds);

    HttpStatus.CREATED;
  }

  async isTokenBlacklisted(
    data: IsTokenBlacklistedPayloadDTO,
  ): Promise<boolean> {
    if (!data.token) return false;
    const key = `blacklist_${data.token}`;
    return !!(await this.commonCachingService.get(key));
  }
}
