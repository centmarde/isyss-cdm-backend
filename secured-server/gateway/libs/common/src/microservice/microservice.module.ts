import {
  ACTIVITY_LOGS_SERVICE,
  CACHING_SERVICE,
  SECURITY_SERVICE,
  USER_ACCOUNT_SERVICE,
} from '@isyss-cdm/constants';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroService } from './microservice.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: SECURITY_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'security',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: `security-service-${Math.random()}`,
          },
        },
      },
      {
        name: CACHING_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'caching',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: `caching-service-${Math.random()}`,
          },
        },
      },
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
      {
        name: ACTIVITY_LOGS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'activity-logs',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: `activity-logs-service-${Math.random()}`,
          },
        },
      },
    ]),
  ],
  providers: [MicroService],
  exports: [MicroService],
})
export class MicroServiceModule {}
