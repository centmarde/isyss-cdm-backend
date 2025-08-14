import { CommonActivityModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [CommonActivityModule],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
