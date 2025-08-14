import { USER_ACCOUNT_SERVICE } from '@isyss-cdm/constants';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroService } from './microservice.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_ACCOUNT_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-account',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: `user-account-service-${Math.random()}`,
          },
        },
      },
    ]),
  ],
  providers: [MicroService],
  exports: [MicroService],
})
export class MicroServiceModule {}
