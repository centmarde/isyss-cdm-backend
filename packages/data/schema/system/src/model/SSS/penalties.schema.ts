//@ts-ignore
import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
export interface IPenaltyConfig extends Document {
  uuid: string;
  licenseType?: string;
  tiers?: any; // JSON/B structure
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
  rounding?: any;
  validation?: any;
  defaultStatus?: any;
  lockThresholdDays?: number;
  allowGracePeriod?: boolean;
  gracePeriodDays?: number;
  fallbackPenaltyRate?: number;
  auditTrailEnabled?: boolean;
  logComputationDetails?: boolean;
  feesConfigId?: Types.ObjectId | string; // reference to FeesConfig
  penaltyConfigId?: Types.ObjectId | string; // reference to PenaltyConfig
  feesConfig?: any; // embedded snapshot (jsonb)
  penaltyConfig?: any; // embedded snapshot (jsonb)
  createdBy?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schemas
const PenaltyConfigSchema = new Schema<IPenaltyConfig>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    licenseType: { type: String },
    tiers: { type: Schema.Types.Mixed },
    lockThreshold: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const FeesConfigSchema = new Schema<IFeesConfig>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    licenseType: { type: String },
    baseFee: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const PenaltyComputationConfigSchema = new Schema<IPenaltyComputationConfig>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    env: { type: String },
    rounding: { type: Schema.Types.Mixed },
    validation: { type: Schema.Types.Mixed },
    defaultStatus: { type: Schema.Types.Mixed },
    lockThresholdDays: { type: Number },
    allowGracePeriod: { type: Boolean, default: false },
    gracePeriodDays: { type: Number },
    fallbackPenaltyRate: { type: Number },
    auditTrailEnabled: { type: Boolean, default: false },
    logComputationDetails: { type: Boolean, default: false },

    // Relations (store ObjectId references and optional embedded snapshot)
    feesConfigId: { type: Schema.Types.ObjectId, ref: 'FeesConfig' },
    penaltyConfigId: { type: Schema.Types.ObjectId, ref: 'PenaltyConfig' },
    feesConfig: { type: Schema.Types.Mixed },
    penaltyConfig: { type: Schema.Types.Mixed },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Models
export const PenaltyConfigModel = model<IPenaltyConfig>('PenaltyConfig', PenaltyConfigSchema);
export const FeesConfigModel = model<IFeesConfig>('FeesConfig', FeesConfigSchema);
export const PenaltyComputationConfigModel = model<IPenaltyComputationConfig>(
  'PenaltyComputationConfig',
  PenaltyComputationConfigSchema
);

export default {
  PenaltyConfigModel,
  FeesConfigModel,
  PenaltyComputationConfigModel,
};
