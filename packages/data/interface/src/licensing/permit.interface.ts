import { PermitStatus } from './enums.interface';
import { 
  IApplicationData,
  IIssuedByData,
  IPermitApplicationData,
  IControlledChemicalData
} from './common.interface';

// Permit Application Entity Interface
export interface IPermitApplication {
  id: string;
  chemicalPurpose: string;
  licenseData?: any; // Generic JSON for license reference data
  applicationData?: IApplicationData;
  applicationId?: string;
  licenseId?: string;
  
  // Relationships
  application?: any; // IApplication - avoiding circular dependency
  license?: any; // ILicense - avoiding circular dependency
  reqChemicalAuthorities?: IReqChemicalAuthority[];
  permits?: IPermit[];
}

// Request Chemical Authority Entity Interface
export interface IReqChemicalAuthority {
  id: string;
  maxAllowedQuantity: number; // Decimal from Prisma
  quantityApplied: number;    // Decimal from Prisma
  createDate: Date;
  updateDate: Date;
  permitApplicationData?: IPermitApplicationData;
  controlledChemicalData?: IControlledChemicalData;
  permitApplicationId: string;
  
  // Relationships
  permitApplication?: IPermitApplication;
  feoEvaluations?: IFeoEvaluation[];
}

// FEO Evaluation Entity Interface
export interface IFeoEvaluation {
  id: string;
  quantityAuthorized: number;     
  acquisition: number;            
  disposition: number;            
  balanceAsOfDate: Date;
  quantityRecommended: number;    
  totalStockOnHand: number;       
  createDate: Date;
  updateDate: Date;
  reqChemaicalAuthorityData?: any; // Generic JSON for chemical authority data
  reqChemicalAuthorityId: string;
  
  // Relationships
  reqChemicalAuthority?: IReqChemicalAuthority;
}

// Permit Entity Interface
export interface IPermit {
  id: string;
  permitNo: string;
  issuedDate: Date;
  expiryDate: Date;
  status: PermitStatus;
  createDate: Date;
  updateDate: Date;
  permitApplicationData?: IPermitApplicationData;
  issuedByData?: IIssuedByData;
  permitApplicationId?: string;
  
  // Relationships
  permitApplication?: IPermitApplication;
}
