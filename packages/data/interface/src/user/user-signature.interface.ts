import { SignatureStatus } from './enums';
import { IAdminUser } from './admin-user.interface';
import { IApplicantUser } from './applicant-user.interface';

export interface IUserSignature {
  id: string;
  signatureType: string;
  fileUrl: string;
  mimeType: string;
  fileHash: string;
  widthPx: number;
  heightPx: number;
  fileSize: number;
  isDefault: boolean;
  status: SignatureStatus;
  metadata?: Record<string, any>;
  createdBy?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  admin?: IAdminUser;
  adminId: string;
  applicant?: IApplicantUser;
  applicantId: string;
}