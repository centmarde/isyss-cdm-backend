//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

type Mixed = any;

export interface NotificationLogDocument extends Document {
  id: string;
  uuid: string;
  channel?: string;
  templateKey?: string;
  recipient?: string;
  status?: string;
  attempts?: number;
  providerMsgId?: string;
  metadata?: Mixed;
  createDate?: Date;
  actor?: any;
}

export const NotificationLogSchema = new Schema<NotificationLogDocument>(
  {
    ...base,
    channel: { type: String },
    templateKey: { type: String },
    recipient: { type: String },
    status: { type: String },
    attempts: { type: Number },
    providerMsgId: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: false, collection: 'notificationLog' },
);
