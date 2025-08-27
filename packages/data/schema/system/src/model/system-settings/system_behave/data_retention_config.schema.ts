//@ts-ignore
import mongoose, { Schema } from 'mongoose';
//import { IDataRetentionConfig } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IDataRetentionConfig extends Document {
	id: string;
	logRetentionDays: Record<string, unknown>;
	autoArchiveEnabled: boolean;
	archiveStoragePath: string;
	notificationsEnabled: boolean;
	createdAt: Date;
	updatedAt: Date;
	createdBy: ICreatedByAdmin;
}


const baseFields = {
	id: { type: String, index: true },
	createdAt: { type: Date, default: Date.now, index: true },
};

const DataRetentionConfigSchema = new Schema<IDataRetentionConfig>(
	{
		...baseFields,
		logRetentionDays: { type: Schema.Types.Mixed },
		autoArchiveEnabled: { type: Boolean },
		archiveStoragePath: { type: String },
		notificationsEnabled: { type: Boolean },
		updatedAt: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'dataRetentionConfig' },
);

DataRetentionConfigSchema.index({ id: 1 });
DataRetentionConfigSchema.index({ autoArchiveEnabled: 1 });
DataRetentionConfigSchema.index({ notificationsEnabled: 1 });
DataRetentionConfigSchema.index({ logRetentionDays: 1 });
DataRetentionConfigSchema.index({ createdAt: 1 });

export const DataRetentionConfigModel =
	(mongoose.models.DataRetentionConfig as mongoose.Model<IDataRetentionConfig>) ||
	mongoose.model<IDataRetentionConfig>('DataRetentionConfig', DataRetentionConfigSchema);

//export { IDataRetentionConfig };
export default DataRetentionConfigModel;
