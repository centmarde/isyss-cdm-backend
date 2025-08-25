//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { IGatewayConfig } from './interfaces';

// Schema
export const GatewayConfigSchema = new Schema<IGatewayConfig>(
  {
    uuid: { type: String, required: true, unique: true },
    type: { type: String },
    provider: { type: String },
    credentials: { type: Schema.Types.Mixed },
    rateLimit: { type: Schema.Types.Mixed },
    failoverEnabled: { type: Boolean, default: false },
    fallbackProvider: { type: String },
    senderName: { type: String },
    status: { type: String },
    createDate: { type: Date, default: () => new Date() },
    updateDate: { type: Date, default: () => new Date() },
    createdBy: { type: Schema.Types.Mixed },
  },
  { collection: 'gatewayConfig' }
);

// Indexes
GatewayConfigSchema.index({ uuid: 1 }, { unique: true });
GatewayConfigSchema.index({ type: 1 });
GatewayConfigSchema.index({ provider: 1 });
GatewayConfigSchema.index({ status: 1 });
GatewayConfigSchema.index({ createDate: 1 });
GatewayConfigSchema.index({ type: 1, provider: 1 });
GatewayConfigSchema.index({ provider: 1, status: 1 });

// Hooks
GatewayConfigSchema.pre('save', function (this: IGatewayConfig, next: (err?: any) => void) {
  this.updateDate = new Date();
  next();
});

// Model
export const GatewayConfigModel =
  (mongoose.models.GatewayConfig as mongoose.Model<IGatewayConfig>) ||
  mongoose.model<IGatewayConfig>('GatewayConfig', GatewayConfigSchema);

export default GatewayConfigModel;
