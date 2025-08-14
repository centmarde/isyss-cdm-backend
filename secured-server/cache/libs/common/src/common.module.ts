import {
  ErrorLoggingInterceptor,
  ResponseSuccessDataInterceptor,
} from '@isyss-cdm/interceptor';
import { LogsMiddleware } from '@isyss-cdm/middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import { envConfig } from './_core/config/env.config';
import { EventsModule } from './_core/events/events.module';
import { CatchHandlerService } from './_core/handler/catch-handler.service';
import { CommonAuthModule } from './auth';
import { CommonCachingModule } from './caching';
import { CommonService } from './common.service';
import { CommonMicroServiceModule } from './microservice';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [envConfig] }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore as any,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASS || undefined,
        ttl: 0,
      }),
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    EventsModule,
    CommonMicroServiceModule,
    CommonAuthModule,
    CommonCachingModule,
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
