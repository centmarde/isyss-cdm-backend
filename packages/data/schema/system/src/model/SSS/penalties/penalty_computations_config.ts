//@ts-ignore
import { Schema, model } from 'mongoose';
import { IPenaltyComputationConfig } from './interface';

const PenaltyComputationConfigSchema = new Schema<IPenaltyComputationConfig>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    env: { type: String },
    rounding: { type: Schema.Types.Mixed },
    validation: { type: Schema.Types.Mixed },
    defaultStatus: { type: Schema.Types.Mixed },
    lockThresholdDays: { type: Number },
    allowGracePeriod: { type: Boolean, default: false },
    gracePeriodDays: { type: Number },
    fallbackPenaltyRate: { type: Number },
    auditTrailEnabled: { type: Boolean, default: false },
    logComputationDetails: { type: Boolean, default: false },

    // Relations (store ObjectId references and optional embedded snapshot)
    feesConfigId: { type: Schema.Types.ObjectId, ref: 'FeesConfig' },
    penaltyConfigId: { type: Schema.Types.ObjectId, ref: 'PenaltyConfig' },
    feesConfig: { type: Schema.Types.Mixed },
    penaltyConfig: { type: Schema.Types.Mixed },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Indexes
PenaltyComputationConfigSchema.index({ uuid: 1 }, { unique: true });
PenaltyComputationConfigSchema.index({ env: 1 });
PenaltyComputationConfigSchema.index({ lockThresholdDays: 1 });
PenaltyComputationConfigSchema.index({ allowGracePeriod: 1 });
PenaltyComputationConfigSchema.index({ auditTrailEnabled: 1 });
PenaltyComputationConfigSchema.index({ feesConfigId: 1 });
PenaltyComputationConfigSchema.index({ penaltyConfigId: 1 });
PenaltyComputationConfigSchema.index({ createdAt: 1 });
PenaltyComputationConfigSchema.index({ env: 1, allowGracePeriod: 1 });

export const PenaltyComputationConfigModel = model<IPenaltyComputationConfig>(
  'PenaltyComputationConfig',
  PenaltyComputationConfigSchema
);

export default PenaltyComputationConfigModel;
