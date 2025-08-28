//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

export interface SystemAuditTrailDocument extends Document {
  id: string;
  uuid: string;
  service?: string;
  entityType?: string;
  entityId?: string;
  action?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  remarks?: string;
  ip?: string;
  userAgent?: string;
  createDate?: Date;
  actor?: any;
}

export const SystemAuditTrailSchema = new Schema<SystemAuditTrailDocument>(
  {
    ...base,
    service: { type: String },
    entityType: { type: String },
    entityId: { type: String },
    action: { type: String },
    before: { type: Schema.Types.Mixed },
    after: { type: Schema.Types.Mixed },
    remarks: { type: String },
    ip: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: false,
    collection: 'systemAuditTrail',
  },
);
