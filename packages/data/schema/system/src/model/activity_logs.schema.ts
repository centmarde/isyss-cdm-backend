//@ts-ignore

import { Document, Schema } from 'mongoose';

// Reuse project's pattern: crypto.randomUUID()

type Mixed = any;


  //Common base fields
 
const base = {
  id: { type: String, default: () => crypto.randomUUID() },
  uuid: { type: String, default: () => crypto.randomUUID(), index: true },
  createDate: { type: Date, default: Date.now, index: true },
  actor: { type: Schema.Types.Mixed }, // can reference user-account or embed snapshot
};

export interface SystemAuditTrailDocument extends Document {
  id: string;
  uuid: string;
  service?: string;
  entityType?: string;
  entityId?: string;
  action?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
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

export interface RiskAlertLogDocument extends Document {
  id: string;
  uuid: string;
  alertType?: string;
  severity?: string;
  sourceModule?: string;
  location?: string;
  description?: string;
  confirmedBy?: string;
  confirmedDate?: Date;
  createDate?: Date;
  warehouse?: Mixed;
  actor?: any;
}

export const RiskAlertLogSchema = new Schema<RiskAlertLogDocument>(
  {
    ...base,
    alertType: { type: String },
    severity: { type: String },
    sourceModule: { type: String },
    location: { type: String },
    description: { type: String },
    confirmedBy: { type: String },
    confirmedDate: { type: Date },
    warehouse: { type: Schema.Types.Mixed },
  },
  { timestamps: false, collection: 'riskAlertLog' },
);

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

export interface CronJobRunDocument extends Document {
  id: string;
  uuid: string;
  jobName?: string;
  status?: string;
  durationMs?: number;
  records?: number;
  error?: string;
  createDate?: Date;
  actor?: any;
}

export const CronJobRunSchema = new Schema<CronJobRunDocument>(
  {
    ...base,
    jobName: { type: String },
    status: { type: String },
    durationMs: { type: Number },
    records: { type: Number },
    error: { type: String },
  },
  { timestamps: false, collection: 'cronJobRun' },
);

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

export const schemas = {
  SystemAuditTrailSchema,
  RiskAlertLogSchema,
  IntegrationAuditLogSchema,
  UserLoginHistorySchema,
  CronJobRunSchema,
  NotificationLogSchema,
  NetworkAccessLogSchema,
};
