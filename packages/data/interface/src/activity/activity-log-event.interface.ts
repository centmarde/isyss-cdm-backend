import { ActivityStatus, UserType } from '@isyss-cdm/enum';

export interface IActivityLog {
  action: string;
  status: ActivityStatus;
  remarks?: string;
  affectedData?: Record<string, any>;
  actorType: UserType;
  actorId?: string;
  actorNameSnapshot?: string;
  subjectType?: UserType;
  subjectId?: string;
  subjectNameSnapshot?: string;
  module?: string;
  entity?: string;
  entityId?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
}
