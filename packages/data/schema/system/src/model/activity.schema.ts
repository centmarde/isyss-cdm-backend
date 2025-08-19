//@ts-ignore

import { ActivityStatus, UserType } from '@isyss-cdm/enum';
import { Document, Schema } from 'mongoose';

export interface ActivityDocument extends Document {
  id: string;
  action: string;
  status: ActivityStatus;
  remarks?: string;
  affectedData?: Record<string, any>;
  actorType: UserType;
  actorId?: string;
  actorNameSnapshot?: string;
  subjectType?: UserType;
  subjectId?: string;
  subjectNameSnapshot?: string;
  module?: string;
  entity?: string;
  entityId?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export const ActivitySchema = new Schema<ActivityDocument>(
  {
    id: { type: String, default: () => crypto.randomUUID() },
    action: { type: String, trim: true, required: true },
    status: {
      type: String,
      required: true,
      enum: ActivityStatus,
      default: ActivityStatus.SUCCESS,
    },
    remarks: { type: String, trim: true, maxlength: 2000 },
    affectedData: { type: Schema.Types.Mixed },
    actorType: {
      type: String,
      required: true,
      enum: UserType,
    },
    actorId: { type: String },
    actorNameSnapshot: { type: String, trim: true },
    subjectType: {
      type: String,
      enum: UserType,
    },
    subjectId: { type: String },
    subjectNameSnapshot: { type: String, trim: true },
    module: { type: String, trim: true },
    entity: { type: String, trim: true },
    entityId: { type: String },
    before: { type: Schema.Types.Mixed },
    after: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'activity',
  },
);
