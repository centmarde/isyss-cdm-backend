import {
  ErrorLoggingInterceptor,
  ResponseSuccessDataInterceptor,
} from '@isyss-cdm/interceptor';
import { LogsMiddleware } from '@isyss-cdm/middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonService } from './common.service';
import { CommonMicroServiceModule } from './microservice';
import { CommonUserModule } from './user';
import { envConfig } from './_core/config/env.config';
import { EventsModule } from './_core/events/events.module';
import { CatchHandlerService } from './_core/handler/catch-handler.service';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [envConfig] }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    EventsModule,
    CommonMicroServiceModule,
    CommonUserModule,
  ],
  providers: [
    CommonService,
    CatchHandlerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessDataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggingInterceptor,
    },
  ],
  exports: [CommonService, CommonMicroServiceModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
