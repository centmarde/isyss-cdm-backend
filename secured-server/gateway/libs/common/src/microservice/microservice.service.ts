import {
  ACTIVITY_LOGS_SERVICE,
  CACHING_SERVICE,
  SECURITY_SERVICE,
  USER_ACCOUNT_SERVICE,
} from '@isyss-cdm/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroService {
  constructor(
    @Inject(SECURITY_SERVICE)
    private readonly securityClient: ClientKafka,

    @Inject(CACHING_SERVICE)
    private readonly cachingClient: ClientKafka,

    @Inject(USER_ACCOUNT_SERVICE)
    private readonly userAccountClient: ClientKafka,

    @Inject(ACTIVITY_LOGS_SERVICE)
    private readonly activityLogsClient: ClientKafka,
  ) {
    //
  }

  async onModuleInit() {
    this.securityClient.subscribeToResponseOf('auth.login.admin');
    this.securityClient.subscribeToResponseOf('auth.generate.token');
    this.securityClient.subscribeToResponseOf('auth.logout');
    await this.securityClient.connect();

    this.cachingClient.subscribeToResponseOf(
      'auth.get.login.session.by.user.id',
    );
    this.cachingClient.subscribeToResponseOf('auth.get.refresh.token');
    this.cachingClient.subscribeToResponseOf('caching.is.token.black.listed');
    await this.cachingClient.connect();

    this.userAccountClient.subscribeToResponseOf('user.get.admin.by.user.id');
    await this.userAccountClient.connect();

    this.activityLogsClient.subscribeToResponseOf('activity.get.my.activities');
    await this.activityLogsClient.connect();
  }

  async onModuleDestroy() {
    this.securityClient.close();
    this.activityLogsClient.close();
  }

  async securityService(pattern: string, data: any) {
    return await lastValueFrom(this.securityClient.send(pattern, data));
  }

  async cachingService(pattern: string, data: any) {
    return await lastValueFrom(this.cachingClient.send(pattern, data));
  }

  async userAccountService(pattern: string, data: any) {
    return await lastValueFrom(this.userAccountClient.send(pattern, data));
  }

  async activityLogsService(pattern: string, data: any) {
    return await lastValueFrom(this.activityLogsClient.send(pattern, data));
  }
}
