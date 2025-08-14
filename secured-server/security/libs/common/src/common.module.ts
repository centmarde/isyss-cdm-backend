import {
  ErrorLoggingInterceptor,
  ResponseSuccessDataInterceptor,
} from '@isyss-cdm/interceptor';
import { LogsMiddleware } from '@isyss-cdm/middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from './_core/config/env.config';
import { jwtConfig } from './_core/config/jwt.config';
import { JwtStrategy } from './_core/config/jwt.strategy';
import { EventsModule } from './_core/events/events.module';
import { CatchHandlerService } from './_core/handler/catch-handler.service';
import { CommonService } from './common.service';
import { CommonMicroServiceModule } from './microservice';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [envConfig] }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    JwtModule.registerAsync(jwtConfig),
    EventsModule,
    CommonMicroServiceModule,
  ],
  providers: [
    CommonService,
    JwtStrategy,
    jwtConfig,
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
