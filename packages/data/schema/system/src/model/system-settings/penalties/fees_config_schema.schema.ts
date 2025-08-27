//@ts-ignore
import { Schema, model } from 'mongoose';
//import { IFeesConfig } from './interface';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IFeesConfig extends Document {
  id: string;
  licenseType: string;
  baseFee: number;
  createdBy: ICreatedByAdmin;
  createdAt: Date;
  updatedAt: Date;
}

const FeesConfigSchema = new Schema<IFeesConfig>(
  {
    id: { type: String, required: true, unique: true, index: true },
    licenseType: { type: String },
    baseFee: { type: Number },
    createdBy: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Indexes
FeesConfigSchema.index({ id: 1 }, { unique: true });
FeesConfigSchema.index({ licenseType: 1 });
FeesConfigSchema.index({ baseFee: 1 });
FeesConfigSchema.index({ createdAt: 1 });
FeesConfigSchema.index({ licenseType: 1, baseFee: 1 });

export const FeesConfigModel = model<IFeesConfig>('FeesConfig', FeesConfigSchema);

export default FeesConfigModel;
