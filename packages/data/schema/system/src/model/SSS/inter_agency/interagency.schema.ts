// @ts-ignore
import { Schema, model } from 'mongoose';
import { IInteragencyConfig } from './interface';

const InteragencySchema = new Schema<IInteragencyConfig>(
    {
        id: { type: Number, required: false, sparse: true, index: true },
        uuid: { type: String, required: true, unique: true, index: true },
        agencyCode: { type: String, trim: true, index: true },
        agencyName: { type: String, trim: true },
        description: { type: String },
        integrationSettings: { type: Schema.Types.Mixed, default: {} },
        accessControl: { type: Schema.Types.Mixed, default: {} },
        workflowParticipation: { type: Schema.Types.Mixed, default: {} },
        logging: { type: Schema.Types.Mixed, default: {} },
        status: { type: String, default: 'inactive' },
        lastSynced: { type: Date },
        createdBy: { type: Schema.Types.Mixed },
    },
    {
        timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
        collection: 'interagencyConfig',
    }
);

// unique index on agencyCode where present (sparse) to avoid collisions for documents without the field
InteragencySchema.index({ agencyCode: 1 }, { unique: true, sparse: true });
InteragencySchema.index({ status: 1 });
InteragencySchema.index({ lastSynced: 1 });
InteragencySchema.index({ createDate: 1 });
InteragencySchema.index({ agencyName: 1 });
InteragencySchema.index({ status: 1, agencyCode: 1 });

export const InteragencyModel = model<IInteragencyConfig>('InteragencyConfig', InteragencySchema);

export default InteragencyModel;
