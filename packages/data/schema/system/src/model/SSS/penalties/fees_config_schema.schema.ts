//@ts-ignore
import { Schema, model } from 'mongoose';
import { IFeesConfig } from './interface';

const FeesConfigSchema = new Schema<IFeesConfig>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    licenseType: { type: String },
    baseFee: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Indexes
FeesConfigSchema.index({ uuid: 1 }, { unique: true });
FeesConfigSchema.index({ licenseType: 1 });
FeesConfigSchema.index({ baseFee: 1 });
FeesConfigSchema.index({ createdAt: 1 });
FeesConfigSchema.index({ licenseType: 1, baseFee: 1 });

export const FeesConfigModel = model<IFeesConfig>('FeesConfig', FeesConfigSchema);

export default FeesConfigModel;
