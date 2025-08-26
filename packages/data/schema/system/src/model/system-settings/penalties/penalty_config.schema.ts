//@ts-ignore
import { Schema, model } from 'mongoose';
// import { IPenaltyConfig } from './interface';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

// Interfaces
export interface IPenaltyConfig extends Document {
  id: string;
  licenseType?: string;
  tiers?: Record<string, unknown>;
  lockThreshold?: number;
  createdBy?: ICreatedByAdmin;
  createdAt?: Date;
  updatedAt?: Date;
}

const PenaltyConfigSchema = new Schema<IPenaltyConfig>(
  {
    id: { type: String, required: true, unique: true, index: true },
    licenseType: { type: String },
    tiers: { type: Schema.Types.Mixed },
    lockThreshold: { type: Number },
    createdBy: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Indexes
PenaltyConfigSchema.index({ id: 1 }, { unique: true });
PenaltyConfigSchema.index({ licenseType: 1 });
PenaltyConfigSchema.index({ lockThreshold: 1 });
PenaltyConfigSchema.index({ createdAt: 1 });
PenaltyConfigSchema.index({ licenseType: 1, lockThreshold: 1 });

export const PenaltyConfigModel = model<IPenaltyConfig>('PenaltyConfig', PenaltyConfigSchema);

export default PenaltyConfigModel;
