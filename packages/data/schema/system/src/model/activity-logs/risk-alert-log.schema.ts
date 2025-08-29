//@ts-ignore

import { Document, Schema } from 'mongoose';
import { base } from './base.schema';

type Mixed = any;

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
