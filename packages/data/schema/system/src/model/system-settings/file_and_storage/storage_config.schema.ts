import mongoose, { Schema, Document } from 'mongoose';
import { ICreatedByAdmin } from '@isyss-cdm/interface';
import { randomUUID } from 'crypto';

export interface IStorageConfig extends Document {
    id: string;
    provider?: string;
    bucket?: string;
    defaultPath?: string;
    region?: string;
    uploadLimitMB?: number;
    expirationDays?: number;
    publicAccess?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: ICreatedByAdmin;
    // additional free-form JSON for provider specific config
    config?: Record<string, unknown>;
}

const StorageConfigSchema = new Schema<IStorageConfig>(
    {
        id: { type: String, required: true, unique: true, default: () => randomUUID() },
        provider: { type: String, trim: true },
        bucket: { type: String, trim: true },
        defaultPath: { type: String, trim: true },
        region: { type: String, trim: true },
        uploadLimitMB: { type: Number },
        expirationDays: { type: Number },
        publicAccess: { type: Boolean, default: false },
        createdBy: { type: Schema.Types.Mixed, default: {} },
        config: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        collection: 'storageConfig',
    }
);

StorageConfigSchema.index({ id: 1 }, { unique: true });
StorageConfigSchema.index({ provider: 1 });
StorageConfigSchema.index({ bucket: 1 });
StorageConfigSchema.index({ region: 1 });
StorageConfigSchema.index({ publicAccess: 1 });
StorageConfigSchema.index({ provider: 1, bucket: 1 });
StorageConfigSchema.index({ createdAt: 1 });

export const StorageConfigModel =
    (mongoose.models.StorageConfig as mongoose.Model<IStorageConfig>) ||
    mongoose.model<IStorageConfig>('StorageConfig', StorageConfigSchema);

export default StorageConfigModel;
