import {
  GetActivityParamDTO,
  GetActivityQueryDTO,
  GetMyActivitiesResDTO,
} from '@isyss-cdm/dto';
import { ActivityStatus } from '@isyss-cdm/enum';
import { ICurrentUser } from '@isyss-cdm/interface';
import { ActivityDocument } from '@isyss-cdm/system-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activity')
    private readonly activityModel: Model<ActivityDocument>,
  ) {
    //
  }

  async getActivityByQuery(
    param: GetActivityParamDTO,
    query: GetActivityQueryDTO,
    currUser: ICurrentUser,
  ): Promise<GetMyActivitiesResDTO> {
    const skip = Number(query.page) * Number(query.limit);
    const limit = Number(query.limit);
    const filter: any = {};

    // Filter by actorId
    const actorId = query.isMe ? currUser.id : param?.id;
    if (actorId) filter.actorId = actorId;

    // Date range filter
    if (query?.dateRange) {
      filter.createdAt = {
        $gte: new Date(query.dateRange.from),
        $lte: new Date(query.dateRange.to),
      };
    }

    // Search filter
    if (query?.search) {
      const regex = new RegExp(query.search, 'i');
      filter.$or = [
        { action: regex },
        { remarks: regex },
        { actorNameSnapshot: regex },
        { subjectNameSnapshot: regex },
      ];

      if (
        Object.values(ActivityStatus).includes(query.search as ActivityStatus)
      ) {
        filter.$or.push({ status: query.search });
      }
    }

    // Query DB
    const [activities, count] = await Promise.all([
      this.activityModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: query.orderBy?.toLowerCase() === 'asc' ? 1 : -1 })
        .lean(),
      this.activityModel.countDocuments(filter),
    ]);

    return {
      count,
      data: activities,
    };
  }

  async createActivity(
    data: Partial<ActivityDocument>,
  ): Promise<ActivityDocument> {
    return await this.activityModel.create(data);
  }
}
