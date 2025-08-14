import { ACTIVITY_LOGS_SERVICE } from '@isyss-cdm/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroService {
  constructor(
    @Inject(ACTIVITY_LOGS_SERVICE)
    private readonly activityLogsClient: ClientKafka,
  ) {
    //
  }

  async onModuleInit() {
    this.activityLogsClient.subscribeToResponseOf('activity.create.activity');
    await this.activityLogsClient.connect();
  }

  async onModuleDestroy() {
    this.activityLogsClient.close();
  }

  async activityLogsService(pattern: string, data: any) {
    return await lastValueFrom(this.activityLogsClient.send(pattern, data));
  }
}
