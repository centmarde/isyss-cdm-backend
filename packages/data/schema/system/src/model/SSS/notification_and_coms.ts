//@ts-ignore
import mongoose, { Document, Schema } from 'mongoose';

// NotificationConfig interface
export interface INotificationConfig extends Document {
  uuid: string;
  templateKey?: string;
  title?: string;
  description?: string;
  channelSettings?: Record<string, any> | any;
  trigger?: Record<string, any> | any;
  userPreferenceOverride?: boolean;
  placeholders?: string;
  status?: string;
  createDate?: Date;
  updateDate?: Date;
  createdBy?: Record<string, any> | any;
}

// GatewayConfig interface
export interface IGatewayConfig extends Document {
  uuid: string;
  type?: string;
  provider?: string;
  credentials?: Record<string, any> | any;
  rateLimit?: Record<string, any> | any;
  failoverEnabled?: boolean;
  fallbackProvider?: string;
  senderName?: string;
  status?: string;
  createDate?: Date;
  updateDate?: Date;
  createdBy?: Record<string, any> | any;
}

// Schemas
const NotificationConfigSchema = new Schema<INotificationConfig>(
  {
    uuid: { type: String, required: true, unique: true },
    templateKey: { type: String },
    title: { type: String },
    description: { type: String },
    channelSettings: { type: Schema.Types.Mixed },
    trigger: { type: Schema.Types.Mixed },
    userPreferenceOverride: { type: Boolean, default: false },
    placeholders: { type: String },
    status: { type: String },
    createDate: { type: Date, default: () => new Date() },
    updateDate: { type: Date, default: () => new Date() },
    createdBy: { type: Schema.Types.Mixed },
  },
  { collection: 'notificationConfig' }
);

const GatewayConfigSchema = new Schema<IGatewayConfig>(
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

// Hooks
NotificationConfigSchema.pre('save', function (this: INotificationConfig, next: (err?: any) => void) {
  this.updateDate = new Date();
  next();
});

GatewayConfigSchema.pre('save', function (this: IGatewayConfig, next: (err?: any) => void) {
  this.updateDate = new Date();
  next();
});

// Models
export const NotificationConfigModel =
  (mongoose.models.NotificationConfig as mongoose.Model<INotificationConfig>) ||
  mongoose.model<INotificationConfig>('NotificationConfig', NotificationConfigSchema);

export const GatewayConfigModel =
  (mongoose.models.GatewayConfig as mongoose.Model<IGatewayConfig>) ||
  mongoose.model<IGatewayConfig>('GatewayConfig', GatewayConfigSchema);

export { NotificationConfigSchema, GatewayConfigSchema };

export default {
  NotificationConfig: NotificationConfigModel,
  GatewayConfig: GatewayConfigModel,
};