import { DeviceStatus } from './enums';
import { IAdminUser } from './admin-user.interface';
import { IApplicantUser } from './applicant-user.interface';

export interface IUserDevice {
  id: string;
  deviceType: string;
  os: string;
  osVersion: string;
  manufacturer: string;
  model: string;
  modelVersion: string;
  uuid: string;
  registrationToken?: string;
  ipAddress: string;
  source: string;
  browser: string;
  status: DeviceStatus;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  admin?: IAdminUser;
  adminId: string;
  applicant?: IApplicantUser;
  applicantId: string;
}