import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroServiceName(): string {
    return '✅ Activity Logs Service is Running.';
  }
}
