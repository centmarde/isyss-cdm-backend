import { 
  ICreatedByData, 
  IFileConfigData, 
  IApplicantData, 
  ICompanyData,
  IApplicationData 
} from './common.interface';

// Application Entity Interface
export interface IApplication {
  id: string;
  type: string;
  applicantType: string;
  dateOfApplication: Date;
  businessNature: string;
  createDate: Date;
  updateDate: Date;
  fileConfigData?: IFileConfigData;
  createdByData?: ICreatedByData;
  applicantData?: IApplicantData;
  companyContactData?: ICompanyData;
  
  // Relationships
  companyContacts?: any[]; // ICompanyContact[] - avoiding circular dependency
  applicationActions?: IApplicationActionLog[];
  applicationDocuments?: any[]; // IApplicationDocument[]
  approvedDocuments?: any[]; // IApprovedDocument[]
  permitApplications?: any[]; // IPermitApplication[]
  licenseApplications?: any[]; // ILicenseApplication[]
}

// Application Action Log Entity Interface
export interface IApplicationActionLog {
  id: string;
  type: string;
  action: string;
  stageFrom?: string;
  stageTo?: string;
  status: string;
  remarks?: string;
  createDate: Date;
  createdByData?: ICreatedByData;
  applicationData?: IApplicationData;
  applicationId: string;
  
  // Relationships
  application?: IApplication;
}
