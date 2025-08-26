import { Document, Types } from 'mongoose';
import { ICreatedByAdmin } from '../file_and_storage/interface';

// Interfaces
export interface IPenaltyConfig extends Document {
  id: string;
  licenseType?: string;
  tiers?: Record<string, unknown>; // JSON/B structure
  lockThreshold?: number;
  createdBy?: ICreatedByAdmin;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFeesConfig extends Document {
  id: string;
  licenseType?: string;
  baseFee?: number;
  createdBy?: ICreatedByAdmin;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPenaltyComputationConfig extends Document {
  id: string;
  env?: string;
  rounding?: Record<string, unknown>;
  validation?: Record<string, unknown>;
  defaultStatus?: Record<string, unknown>;
  lockThresholdDays?: number;
  allowGracePeriod?: boolean;
  gracePeriodDays?: number;
  fallbackPenaltyRate?: number;
  auditTrailEnabled?: boolean;
  logComputationDetails?: boolean;
  feesConfigId?: Types.ObjectId | string; // reference to FeesConfig
  penaltyConfigId?: Types.ObjectId | string; // reference to PenaltyConfig
  feesConfig?: Record<string, unknown>; // embedded snapshot (jsonb)
  penaltyConfig?: Record<string, unknown>; // embedded snapshot (jsonb)
  createdBy?: ICreatedByAdmin;
  createdAt?: Date;
  updatedAt?: Date;
}
