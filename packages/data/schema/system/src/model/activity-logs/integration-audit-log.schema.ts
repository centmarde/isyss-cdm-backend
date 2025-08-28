//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

export interface IntegrationAuditLogDocument extends Document {
  id: string;
  uuid: string;
  externalSystem?: string;
  direction?: string;
  requestId?: string;
  endpoint?: string;
  payloadDigest?: string;
  status?: number;
  latency_ms?: number;
  error?: string;
  createDate?: Date;
  actor?: any;
}

export const IntegrationAuditLogSchema = new Schema<IntegrationAuditLogDocument>(
  {
    ...base,
    externalSystem: { type: String },
    direction: { type: String },
    requestId: { type: String },
    endpoint: { type: String },
    payloadDigest: { type: String },
    status: { type: Number },
    latency_ms: { type: Number },
    error: { type: String },
  },
  { timestamps: false, collection: 'integrationAuditLog' },
);
