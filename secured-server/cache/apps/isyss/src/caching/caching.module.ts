import { CatchHandlerService, CommonCachingModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CachingController } from './caching.controller';
import { CachingService } from './caching.service';

@Module({
  imports: [CommonCachingModule],
  providers: [CachingService, CatchHandlerService],
  controllers: [CachingController],
})
export class CachingModule {}
