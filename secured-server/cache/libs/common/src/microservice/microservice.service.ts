import { USER_ACCOUNT_SERVICE } from '@isyss-cdm/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroService {
  constructor(
    @Inject(USER_ACCOUNT_SERVICE)
    private readonly userAccountClient: ClientKafka,
  ) {
    //
  }

  async onModuleInit() {
    this.userAccountClient.subscribeToResponseOf('user.get.admin.by.user.id');
    this.userAccountClient.subscribeToResponseOf(
      'user.get.applicant.by.user.id',
    );

    await this.userAccountClient.connect();
  }

  async onModuleDestroy() {
    this.userAccountClient.close();
  }

  async userAccountService(pattern: string, data: any) {
    return await lastValueFrom(this.userAccountClient.send(pattern, data));
  }
}
