//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { INotificationConfig } from './interfaces';

// Schema
export const NotificationConfigSchema = new Schema<INotificationConfig>(
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

// Indexes
NotificationConfigSchema.index({ uuid: 1 }, { unique: true });
NotificationConfigSchema.index({ templateKey: 1 });
NotificationConfigSchema.index({ status: 1 });
NotificationConfigSchema.index({ createDate: 1 });
NotificationConfigSchema.index({ templateKey: 1, status: 1 });

// Hooks
NotificationConfigSchema.pre('save', function (this: INotificationConfig, next: (err?: any) => void) {
  this.updateDate = new Date();
  next();
});

// Model
export const NotificationConfigModel =
  (mongoose.models.NotificationConfig as mongoose.Model<INotificationConfig>) ||
  mongoose.model<INotificationConfig>('NotificationConfig', NotificationConfigSchema);

export default NotificationConfigModel;
