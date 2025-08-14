import { UserStatus } from './enums';
import { IUserSetting } from './user-setting.interface';
import { IUserSignature } from './user-signature.interface';
import { IUserDevice } from './user-device.interface';

/**
 * Interface for the AdminUser model
 */
export interface IAdminUser {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  address?: Record<string, any>;
  contactNumber: string;
  avatar?: Record<string, any>;
  status: UserStatus;
  role?: Record<string, any>;
  createdBy?: Record<string, any>;
  isLoggedIn: boolean;
  salt: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  setting?: IUserSetting[];
  signature?: IUserSignature[];
  device?: IUserDevice[];
}