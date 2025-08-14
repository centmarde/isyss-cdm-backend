import { DocumentStatus } from './enums.interface';
import { 
  IApplicantData, 
  IApplicationData,
  IApplicationDocumentData 
} from './common.interface';

// Document Entity Interface
export interface IDocument {
  id: string;
  name: string;
  folderName?: string;
  fileName?: string;
  fileSize?: number;      // Decimal from Prisma
  fileType?: string;
  filePath?: string;
  driveUrl?: string;
  createDate: Date;
  updateDate: Date;
  applicantData?: IApplicantData;
  
  // Relationships
  applicationDocuments?: IApplicationDocument[];
}

// Application Document Entity Interface
export interface IApplicationDocument {
  id: string;
  status: DocumentStatus;
  remarks?: string;
  createDate: Date;
  updateDate: Date;
  applicationId: string;
  documentId: string;
  
  // Relationships
  application?: any; // IApplication - avoiding circular dependency
  document?: IDocument;
  reviewLogs?: IDocumentReviewLog[];
}

// Document Review Log Entity Interface
export interface IDocumentReviewLog {
  id: string;
  reviewedBy: string;
  result: string;
  comments: string;
  createDate: Date;
  applicationDocumentData?: IApplicationDocumentData;
  applicationDocumentId: string;
  
  // Relationships
  applicationDocument?: IApplicationDocument;
}

// Approved Document Entity Interface
export interface IApprovedDocument {
  id: string;
  name: string;
  folderName: string;
  fileName: string;
  fileType: string;
  filePath: string;
  fileSize: number;       // Decimal from Prisma
  driveUrl: string;
  createDate: Date;
  updateDate: Date;
  applicationData?: IApplicationData;
  applicationId?: string;
  
  // Relationships
  application?: any; // IApplication - avoiding circular dependency
}
