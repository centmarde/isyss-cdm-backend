import mongoose, { Schema } from 'mongoose';
import { IStorageConfig } from './interface';
import { randomUUID } from 'crypto';

const StorageConfigSchema = new Schema<IStorageConfig>(
    {
        uuid: { type: String, required: true, unique: true, default: () => randomUUID() },
        provider: { type: String, trim: true },
        bucket: { type: String, trim: true },
        defaultPath: { type: String, trim: true },
        region: { type: String, trim: true },
        uploadLimitMB: { type: Number },
        expirationDays: { type: Number },
        publicAccess: { type: Boolean, default: false },
        createdBy: { type: Schema.Types.Mixed, default: {} },
        config: { type: Schema.Types.Mixed, default: {} },
        createDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
        collection: 'storageConfig',
    }
);

StorageConfigSchema.index({ uuid: 1 }, { unique: true });
StorageConfigSchema.index({ provider: 1 });
StorageConfigSchema.index({ bucket: 1 });
StorageConfigSchema.index({ region: 1 });
StorageConfigSchema.index({ publicAccess: 1 });
StorageConfigSchema.index({ provider: 1, bucket: 1 });
StorageConfigSchema.index({ createDate: 1 });

export const StorageConfigModel =
    (mongoose.models.StorageConfig as mongoose.Model<IStorageConfig>) ||
    mongoose.model<IStorageConfig>('StorageConfig', StorageConfigSchema);

export default StorageConfigModel;

