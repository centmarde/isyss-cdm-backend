import { IActivityLog } from '@isyss-cdm/interface';

// * Authentication
export class LoginSuccessDTO {
  activity: IActivityLog;
}
export class LoginFailedDTO {
  activity: IActivityLog;
}
export class LogoutSuccessDTO {
  activity: IActivityLog;
}
