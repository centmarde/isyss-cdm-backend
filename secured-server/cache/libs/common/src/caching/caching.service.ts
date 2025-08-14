import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    //
  }

  async set<T = any>(key: string, value: T, ttlSeconds?: number) {
    if (ttlSeconds !== undefined) {
      return this.cache.set(key, value, ttlSeconds);
    }
    return this.cache.set(key, value);
  }

  async get<T = any>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key) as any;
  }

  async del(key: string) {
    return this.cache.del(key);
  }
}
