import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroServiceName(): string {
    return '✅ Gateway Service is Running.';
  }
}
