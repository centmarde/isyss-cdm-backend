//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

export interface NetworkAccessLogDocument extends Document {
  id: string;
  uuid: string;
  requestId?: string;
  service?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  latencyMs?: number;
  bytes?: number;
  protocol?: string;
  ip?: string;
  referrer?: string;
  userAgent?: string;
  createDate?: Date;
  actor?: any;
}

export const NetworkAccessLogSchema = new Schema<NetworkAccessLogDocument>(
  {
    ...base,
    requestId: { type: String },
    service: { type: String },
    path: { type: String },
    method: { type: String },
    statusCode: { type: Number },
    latencyMs: { type: Number },
    bytes: { type: Number },
    protocol: { type: String },
    ip: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
  },
  { timestamps: false, collection: 'networkAccessLog' },
);
