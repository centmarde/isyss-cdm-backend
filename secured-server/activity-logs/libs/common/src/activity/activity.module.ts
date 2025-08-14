import { ActivitySchema } from '@isyss-cdm/system-schema';
import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
  ],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
