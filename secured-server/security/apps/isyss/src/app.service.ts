import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroServiceName(): string {
    return '✅ Security Service is Running.';
  }
}
