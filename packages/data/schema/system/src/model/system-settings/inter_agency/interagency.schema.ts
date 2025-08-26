// @ts-ignore
import { Schema, model } from 'mongoose';
import { IInteragencyConfig } from './interface';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IInteragencyConfig extends Document {
    id: string;
    agencyCode?: string;
    agencyName?: string;
    description?: string;
    integrationSettings?: Record<string, unknown>;
    accessControl?: Record<string, unknown>;
    workflowParticipation?: Record<string, unknown>;
    logging?: Record<string, unknown>;
    status?: string;
    lastSynced?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: ICreatedByAdmin;
}

const InteragencySchema = new Schema<IInteragencyConfig>(
    {
        id: { type: String, required: true, unique: true, index: true },
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
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        collection: 'interagencyConfig',
    }
);

// unique index on agencyCode where present (sparse) to avoid collisions for documents without the field
InteragencySchema.index({ agencyCode: 1 }, { unique: true, sparse: true });
InteragencySchema.index({ status: 1 });
InteragencySchema.index({ lastSynced: 1 });
InteragencySchema.index({ createdAt: 1 });
InteragencySchema.index({ agencyName: 1 });
InteragencySchema.index({ status: 1, agencyCode: 1 });

export const InteragencyModel = model<IInteragencyConfig>('InteragencyConfig', InteragencySchema);

export default InteragencyModel;
