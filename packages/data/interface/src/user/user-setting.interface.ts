import { IAdminUser } from './admin-user.interface';
import { IApplicantUser } from './applicant-user.interface';


export interface IUserSetting {
  id: string;
  key: string;
  value: Record<string, any>;
  effectiveFrom: string;
  effectiveTo: string;
  createdBy?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  admin?: IAdminUser;
  adminId: string;
  applicant?: IApplicantUser;
  applicantId: string;
}