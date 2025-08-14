import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
