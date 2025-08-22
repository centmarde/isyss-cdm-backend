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

export const FeesConfigModel = model<IFeesConfig>('FeesConfig', FeesConfigSchema);

export default FeesConfigModel;
