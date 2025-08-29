//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

type Mixed = any;

export interface UserLoginHistoryDocument extends Document {
  id: string;
  uuid: string;
  username?: string;
  ip?: string;
  userAgent?: string;
  device?: Mixed;
  method?: string;
  status?: string;
  remarks?: string;
  geo?: string;
  createDate?: Date;
  actor?: any;
}

export const UserLoginHistorySchema = new Schema<UserLoginHistoryDocument>(
  {
    ...base,
    username: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    device: { type: Schema.Types.Mixed },
    method: { type: String },
    status: { type: String },
    remarks: { type: String },
    geo: { type: String },
  },
  { timestamps: false, collection: 'userLoginHistory' },
);
