import { LicenseStatus } from './enums.interface';
import { 
  ILicenseApplicationData, 
  IIssuedByData, 
  IControlledChemicalData 
} from './common.interface';

// License Application Entity Interface
export interface ILicenseApplication {
  id: string;
  type: string;
  sector: string;
  createDate: Date;
  updateDate: Date;
  applicationData?: ILicenseApplicationData;
  applicationId: string;
  
  // Relationships
  application?: any; // IApplication - avoiding circular dependency
  requestChemicalLicenses?: IRequestChemicalLicense[];
  license?: ILicense;
}

// Request Chemical License Entity Interface
export interface IRequestChemicalLicense {
  id: string;
  chemicalName: string;
  quantityApplied: string;
  quantityRecommended: string;
  remarks: string;
  createDate: Date;
  updateDate: Date;
  controlledChemicalData?: IControlledChemicalData;
  licenseApplicationData?: ILicenseApplicationData;
  licenseApplicationId: string;
  
  // Relationships
  licenseApplication?: ILicenseApplication;
}

// License Entity Interface
export interface ILicense {
  id: string;
  licenseNo: string;
  issuedDate: Date;
  expiryDate: Date;
  status: LicenseStatus;
  createDate: Date;
  issuedBy?: IIssuedByData;
  licenseApplicationData?: ILicenseApplicationData;
  issuedByData?: IIssuedByData;
  licenseApplicationId: string;
  
  // Relationships
  licenseApplication?: ILicenseApplication;
}
