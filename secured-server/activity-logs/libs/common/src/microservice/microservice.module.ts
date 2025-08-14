import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MicroService } from './microservice.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      //
    ]),
  ],
  providers: [MicroService],
  exports: [ClientsModule, MicroService],
})
export class MicroServiceModule {}
