import mongoose, { Schema, Document } from 'mongoose';
import { ICreatedByAdmin } from '@isyss-cdm/interface';
import { randomUUID } from 'crypto';

export interface IFileConfig extends Document {
    id: string;
    templateKey: string;
    name: string;
    description: string;
    templateType: string;
    templateEngine: string;
    templateSource: boolean;
    placeholders?: Record<string, unknown>;
    outputConfig?: Record<string, unknown>;
    accessControl?: Record<string, unknown>;
    checklist?: Array<Record<string, unknown>>;
    approvers?: Array<Record<string, unknown>>;
    status?: string;
    details?: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: ICreatedByAdmin;
    
}

const FileConfigSchema = new Schema<IFileConfig>(
    {
        id: { type: String, required: true, unique: true, default: () => randomUUID() },
        templateKey: { type: String, trim: true },
        name: { type: String, trim: true },
        description: { type: String },
        templateType: { type: String, trim: true },
        templateEngine: { type: String, trim: true },
        templateSource: { type: Boolean, default: false },
        placeholders: { type: Schema.Types.Mixed, default: {} },
        outputConfig: { type: Schema.Types.Mixed, default: {} },
        accessControl: { type: Schema.Types.Mixed, default: {} },
        checklist: { type: [Schema.Types.Mixed], default: [] },
        approvers: { type: [Schema.Types.Mixed], default: [] },
        status: { type: String, trim: true },
        details: { type: Schema.Types.Mixed, default: {} },
        createdBy: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        collection: 'fileConfig',
    }
);

FileConfigSchema.index({ id: 1 }, { unique: true });
FileConfigSchema.index({ templateKey: 1 });
FileConfigSchema.index({ templateType: 1 });
FileConfigSchema.index({ status: 1 });
FileConfigSchema.index({ name: 1 });
FileConfigSchema.index({ templateEngine: 1 });
FileConfigSchema.index({ createdAt: 1 });
FileConfigSchema.index({ templateType: 1, status: 1 });

export const FileConfigModel =
    (mongoose.models.FileConfig as mongoose.Model<IFileConfig>) ||
    mongoose.model<IFileConfig>('FileConfig', FileConfigSchema);

export default FileConfigModel;
