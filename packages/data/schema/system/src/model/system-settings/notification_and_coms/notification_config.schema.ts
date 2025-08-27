//@ts-ignore
import mongoose, { Schema } from 'mongoose';
//import { INotificationConfig } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface INotificationConfig extends Document {
  id: string;
  templateKey: string;
  title: string;
  description: string;
  channelSettings: Record<string, unknown>;
  trigger: Record<string, unknown>;
  userPreferenceOverride: boolean;
  placeholders: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: ICreatedByAdmin;
}
// Schema
export const NotificationConfigSchema = new Schema<INotificationConfig>(
  {
    id: { type: String, required: true, unique: true },
    templateKey: { type: String },
    title: { type: String },
    description: { type: String },
    channelSettings: { type: Schema.Types.Mixed },
    trigger: { type: Schema.Types.Mixed },
    userPreferenceOverride: { type: Boolean, default: false },
    placeholders: { type: String },
    status: { type: String },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
    createdBy: { type: Schema.Types.Mixed },
  },
  { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'notificationConfig' 
  }
);

// Indexes
NotificationConfigSchema.index({ id: 1 }, { unique: true });
NotificationConfigSchema.index({ templateKey: 1 });
NotificationConfigSchema.index({ status: 1 });
NotificationConfigSchema.index({ createdAt: 1 });
NotificationConfigSchema.index({ templateKey: 1, status: 1 });

// Hooks
NotificationConfigSchema.pre('save', function (this: INotificationConfig, next: (err?: any) => void) {
  this.updatedAt = new Date();
  next();
});

// Model
export const NotificationConfigModel =
  (mongoose.models.NotificationConfig as mongoose.Model<INotificationConfig>) ||
  mongoose.model<INotificationConfig>('NotificationConfig', NotificationConfigSchema);

export default NotificationConfigModel;
export const INotificationConfigStub = null as unknown as INotificationConfig;