//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { IDataRetentionConfig } from './interfaces';

const baseFields = {
	uuid: { type: String, index: true },
	createDate: { type: Date, default: Date.now, index: true },
};

const DataRetentionConfigSchema = new Schema<IDataRetentionConfig>(
	{
		...baseFields,
		logRetentionDays: { type: Number },
		autoArchiveEnabled: { type: Boolean },
		archiveStoragePath: { type: String },
		notificationsEnabled: { type: Boolean },
		updateDate: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'dataRetentionConfig' },
);

DataRetentionConfigSchema.index({ uuid: 1 });
DataRetentionConfigSchema.index({ autoArchiveEnabled: 1 });
DataRetentionConfigSchema.index({ notificationsEnabled: 1 });
DataRetentionConfigSchema.index({ logRetentionDays: 1 });
DataRetentionConfigSchema.index({ createDate: 1 });

export const DataRetentionConfigModel =
	(mongoose.models.DataRetentionConfig as mongoose.Model<IDataRetentionConfig>) ||
	mongoose.model<IDataRetentionConfig>('DataRetentionConfig', DataRetentionConfigSchema);

export { IDataRetentionConfig };
export default DataRetentionConfigModel;
