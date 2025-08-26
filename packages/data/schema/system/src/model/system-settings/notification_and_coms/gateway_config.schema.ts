//@ts-ignore
import mongoose, { Schema } from 'mongoose';
// import { IGatewayConfig } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IGatewayConfig extends Document {
  id: string;
  type?: string;
  provider?: string;
  credentials?: Record<string, unknown>;
  rateLimit?: Record<string, unknown>;
  failoverEnabled?: boolean;
  fallbackProvider?: string;
  senderName?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: ICreatedByAdmin;
}
// Schema
export const GatewayConfigSchema = new Schema<IGatewayConfig>(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String },
    provider: { type: String },
    credentials: { type: Schema.Types.Mixed },
    rateLimit: { type: Schema.Types.Mixed },
    failoverEnabled: { type: Boolean, default: false },
    fallbackProvider: { type: String },
    senderName: { type: String },
    status: { type: String },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
    createdBy: { type: Schema.Types.Mixed },
  },
  { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'gatewayConfig' 
  }
);

// Indexes
GatewayConfigSchema.index({ id: 1 }, { unique: true });
GatewayConfigSchema.index({ type: 1 });
GatewayConfigSchema.index({ provider: 1 });
GatewayConfigSchema.index({ status: 1 });
GatewayConfigSchema.index({ createdAt: 1 });
GatewayConfigSchema.index({ type: 1, provider: 1 });
GatewayConfigSchema.index({ provider: 1, status: 1 });

// Hooks
GatewayConfigSchema.pre('save', function (this: IGatewayConfig, next: (err?: any) => void) {
  this.updatedAt = new Date();
  next();
});

// Model
export const GatewayConfigModel =
  (mongoose.models.GatewayConfig as mongoose.Model<IGatewayConfig>) ||
  mongoose.model<IGatewayConfig>('GatewayConfig', GatewayConfigSchema);

export default GatewayConfigModel;
export const IGatewayConfigStub = null as unknown as IGatewayConfig;