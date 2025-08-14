import { IAddress } from './address.interface';
import { ICreatedByData, ICompanyData } from './common.interface';

// Company Entity Interface
export interface ICompany {
  id: string;
  officeAddress?: IAddress;
  storageFacilityAddress?: IAddress;
  storageFacilityContact?: string;
  warehouseAddress?: IAddress;
  contactPerson?: string;
  createDate: Date;
  updateDate: Date;
  createdByData?: ICreatedByData;
  
  // Relationships
  contacts?: ICompanyContact[];
}

// Company Contact Entity Interface
export interface ICompanyContact {
  id: string;
  type: string;
  lastName: string;
  firstName: string;
  middleInitial?: string;
  nameExtension?: string;
  designation?: string;
  homeAddress?: IAddress;
  contactNumber?: string;
  email?: string;
  createDate: Date;
  updateDate: Date;
  createdByData?: ICreatedByData;
  companyData?: ICompanyData;
  companyId: string;
  applicationId?: string;
  
  // Relationships
  company?: ICompany;
  application?: any; // Import IApplication to avoid circular dependency
}
