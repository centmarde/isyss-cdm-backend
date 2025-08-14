import { IActivityLog } from '../activity/activity-log-event.interface';

export interface IHandleAsyncOptions<T = any, R = any> {
  action: string;
  actorId?: string;
  actorType?: string;
  actorData?: { lastName: string; firstName: string };
  module?: string;
  successEvent?: string;
  failureEvent?: string;
  onSuccess?: (result: T) => R;
  onError?: (error: unknown) => never | R;
  errorMessageCode?: string | ((err: unknown) => string);
  activityData?: Partial<IActivityLog>;
}
