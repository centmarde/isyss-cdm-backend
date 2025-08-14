import { EnvType, UserType } from '@isyss-cdm/enum';

export interface ICurrentUser {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  type: UserType;
  env: EnvType;
  permissions?: string[];
}
