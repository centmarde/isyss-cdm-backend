import mongoose, { Schema } from 'mongoose';
import { IFileConfig } from './file_and_storage.interfaces';
import { randomUUID } from 'crypto';

const FileConfigSchema = new Schema<IFileConfig>(
    {
        uuid: { type: String, required: true, unique: true, default: () => randomUUID() },
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
        createDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
        collection: 'fileConfig',
    }
);

FileConfigSchema.index({ uuid: 1 }, { unique: true });

export const FileConfigModel =
    (mongoose.models.FileConfig as mongoose.Model<IFileConfig>) ||
    mongoose.model<IFileConfig>('FileConfig', FileConfigSchema);

export default FileConfigModel;

