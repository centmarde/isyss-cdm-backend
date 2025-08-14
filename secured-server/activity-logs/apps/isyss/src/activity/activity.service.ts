import { CommonActivityService } from '@app/common';
import {
  CreateActivityPayloadDTO,
  GetMyActivitiesPayloadDTO,
  GetMyActivitiesResDTO,
} from '@isyss-cdm/dto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private readonly commonActivityService: CommonActivityService) {
    //
  }

  async getMyActivities(
    data: GetMyActivitiesPayloadDTO,
  ): Promise<GetMyActivitiesResDTO> {
    return await this.commonActivityService.getActivityByQuery(
      { id: null },
      { ...data, isMe: true },
      { ...data.currUser },
    );
  }

  async createActivity(payload: CreateActivityPayloadDTO): Promise<HttpStatus> {
    const data = {
      action: payload.action,
      status: payload.status,
      remarks: payload.remarks ?? null,
      affectedData: payload.affectedData ?? null,
      actorType: payload.actorType,
      actorId: payload.actorId,
      actorNameSnapshot: payload.actorNameSnapshot ?? null,
      subjectType: payload.subjectType ?? null,
      subjectId: payload.subjectId ?? null,
      subjectNameSnapshot: payload.subjectNameSnapshot ?? null,
      module: payload.module ?? null,
      entity: payload.entity ?? null,
      entityId: payload.entityId ?? null,
      before: payload.before ?? null,
      after: payload.after ?? null,
    };

    await this.commonActivityService.createActivity(data);

    return HttpStatus.CREATED;
  }
}
