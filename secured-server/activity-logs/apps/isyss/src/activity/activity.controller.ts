import {
  CreateActivityPayloadDTO,
  GetMyActivitiesPayloadDTO,
} from '@isyss-cdm/dto';
import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {
    //
  }

  @EventPattern('activity.create.activity')
  async createActivityRequest(
    @Payload() data: CreateActivityPayloadDTO,
  ): Promise<HttpStatus> {
    return await this.activityService.createActivity(data);
  }

  @MessagePattern('activity.get.my.activities')
  async getMyActivitiesRequest(
    @Payload() data: GetMyActivitiesPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(await this.activityService.getMyActivities(data));
  }
}
