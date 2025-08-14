import { envConfig } from '@isyss-cdm/constants';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

type KafkaOpts = { groupId: string };

export function connectKafka(
  app: INestApplication,
  opts: KafkaOpts,
): INestMicroservice {
  const { microservice } = envConfig();
  return app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [microservice.address] },
      consumer: { groupId: opts.groupId },
    },
  });
}
