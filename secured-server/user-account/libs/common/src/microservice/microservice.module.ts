import { ACTIVITY_LOGS_SERVICE } from '@isyss-cdm/constants';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroService } from './microservice.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
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
