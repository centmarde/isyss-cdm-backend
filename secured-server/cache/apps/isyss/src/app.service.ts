import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroServiceName(): string {
    return '✅ Caching Service is Running.';
  }
}
