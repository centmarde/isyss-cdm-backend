//@ts-ignore
import { Schema, model } from 'mongoose';
import { IPenaltyConfig } from './interface';

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

export const PenaltyConfigModel = model<IPenaltyConfig>('PenaltyConfig', PenaltyConfigSchema);

export default PenaltyConfigModel;
