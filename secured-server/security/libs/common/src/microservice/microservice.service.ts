import {
  ACTIVITY_LOGS_SERVICE,
  CACHING_SERVICE,
  USER_ACCOUNT_SERVICE,
} from '@isyss-cdm/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroService {
  constructor(
    @Inject(ACTIVITY_LOGS_SERVICE)
    private readonly activityLogsClient: ClientKafka,

    @Inject(CACHING_SERVICE)
    private readonly cachingClient: ClientKafka,

    @Inject(USER_ACCOUNT_SERVICE)
    private readonly userAccountClient: ClientKafka,
  ) {
    //
  }

  async onModuleInit() {
    // Activity Logs Service
    this.activityLogsClient.subscribeToResponseOf('activity.create.activity');
    await this.activityLogsClient.connect();

    // Caching Service
    this.cachingClient.subscribeToResponseOf('auth.create.login.session');
    this.cachingClient.subscribeToResponseOf('auth.create.refresh.token');
    this.cachingClient.subscribeToResponseOf('auth.get.refresh.token');
    this.cachingClient.subscribeToResponseOf('auth.delete.refresh.token');
    this.cachingClient.subscribeToResponseOf('caching.black.list.token');
    this.cachingClient.subscribeToResponseOf('caching.is.token.black.listed');
    await this.cachingClient.connect();

    // User Account Service
    this.userAccountClient.subscribeToResponseOf(
      'user.update.user.login.status',
    );
    this.userAccountClient.subscribeToResponseOf(
      'user.get.admin.user.by.identifier',
    );
    this.userAccountClient.subscribeToResponseOf('user.validate.user.login');
    this.userAccountClient.subscribeToResponseOf(
      'user.get.device.by.source.and.user.id',
    );
    this.userAccountClient.subscribeToResponseOf('user.create.user.device');
    await this.userAccountClient.connect();
  }

  async onModuleDestroy() {
    this.activityLogsClient.close();
    this.cachingClient.close();
    this.userAccountClient.close();
  }

  async activityLogsService(pattern: string, data: any) {
    return await lastValueFrom(this.activityLogsClient.send(pattern, data));
  }

  async cachingService(pattern: string, data: any) {
    return await lastValueFrom(this.cachingClient.send(pattern, data));
  }

  async userAccountService(pattern: string, data: any) {
    return await lastValueFrom(this.userAccountClient.send(pattern, data));
  }
}
