
import { Document, Types } from 'mongoose';


// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue;
}
// Interfaces
export interface IPenaltyConfig extends Document {
  uuid: string;
  licenseType?: string;
  tiers?: JSONObject; // JSON/B structure
  lockThreshold?: number;
  createdBy?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFeesConfig extends Document {
  uuid: string;
  licenseType?: string;
  baseFee?: number;
  createdBy?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPenaltyComputationConfig extends Document {
  uuid: string;
  env?: string;
  rounding?: JSONObject;
  validation?: JSONObject;
  defaultStatus?: JSONObject;
  lockThresholdDays?: number;
  allowGracePeriod?: boolean;
  gracePeriodDays?: number;
  fallbackPenaltyRate?: number;
  auditTrailEnabled?: boolean;
  logComputationDetails?: boolean;
  feesConfigId?: Types.ObjectId | string; // reference to FeesConfig
  penaltyConfigId?: Types.ObjectId | string; // reference to PenaltyConfig
  feesConfig?: JSONObject; // embedded snapshot (jsonb)
  penaltyConfig?: JSONObject; // embedded snapshot (jsonb)
  createdBy?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}