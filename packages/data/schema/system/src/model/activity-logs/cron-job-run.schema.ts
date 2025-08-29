//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

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
