import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroServiceName(): string {
    return '✅ User Account Service is Running.';
  }
}
