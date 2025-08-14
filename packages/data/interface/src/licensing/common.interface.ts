// Common interfaces for Json data structures used across the schema

export interface ICreatedByData {
  userId: string;
  userName?: string;
  userEmail?: string;
  timestamp?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface IIssuedByData {
  officerId: string;
  officerName: string;
  officerPosition?: string;
  department?: string;
  timestamp: Date;
  digitalSignature?: string;
}

export interface IFileConfigData {
  allowedFormats: string[];
  maxFileSize: number;
  uploadPath: string;
  encryptionEnabled?: boolean;
  compressionEnabled?: boolean;
}

export interface IApplicantData {
  id: string;
  type: 'individual' | 'company' | 'corporation' | 'partnership';
  name: string;
  email?: string;
  contactNumber?: string;
  tinNumber?: string;
  businessRegistrationNumber?: string;
  [key: string]: any; // Allow additional fields
}

export interface ICompanyData {
  id: string;
  name: string;
  registrationNumber?: string;
  businessType?: string;
  establishmentDate?: Date;
  contactPerson?: string;
  [key: string]: any; // Allow additional fields
}

export interface ILicenseApplicationData {
  id: string;
  type: string;
  sector: string;
  applicationDate: Date;
  status?: string;
  [key: string]: any; // Allow additional fields
}

export interface IApplicationData {
  id: string;
  type: string;
  applicantType: string;
  dateOfApplication: Date;
  businessNature: string;
  status?: string;
  [key: string]: any; // Allow additional fields
}

export interface IControlledChemicalData {
  id: string;
  chemicalName: string;
  casNumber?: string;
  molecularFormula?: string;
  classification?: string;
  hazardLevel?: number;
  restrictionLevel?: string;
  regulatoryCategory?: string;
  [key: string]: any; // Allow additional fields
}

export interface IPermitApplicationData {
  id: string;
  chemicalPurpose: string;
  applicationDate?: Date;
  status?: string;
  [key: string]: any; // Allow additional fields
}

export interface IApplicationDocumentData {
  id: string;
  documentType: string;
  fileName: string;
  uploadDate: Date;
  status: string;
  [key: string]: any; // Allow additional fields
}
