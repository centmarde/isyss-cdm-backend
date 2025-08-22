//@ts-ignore
import mongoose, { Document, Schema } from 'mongoose';


// to createDate / updateDate.

const { randomUUID } = require('crypto');

//  Interfaces
export interface IFileConfig extends Document {
	uuid: string;
	templateKey?: string;
	name?: string;
	description?: string;
	templateType?: string;
	templateEngine?: string;
	templateSource?: boolean;
	placeholders?: Record<string, any>;
	outputConfig?: Record<string, any>;
	accessControl?: Record<string, any>;
	checklist?: any[];
	approvers?: any[];
	status?: string;
	details?: Record<string, any>;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: Record<string, any>;
}

export interface IStorageConfig extends Document {
	uuid: string;
	provider?: string;
	bucket?: string;
	defaultPath?: string;
	region?: string;
	uploadLimitMB?: number;
	expirationDays?: number;
	publicAccess?: boolean;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: Record<string, any>;
	// additional free-form JSON for provider specific config
	config?: Record<string, any>;
}

// Schemas
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
		// createDate and updateDate are handled by timestamps option
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
		collection: 'fileConfig',
	}
);

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
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
		collection: 'storageConfig',
	}
);

// Indexes
FileConfigSchema.index({ uuid: 1 }, { unique: true });
StorageConfigSchema.index({ uuid: 1 }, { unique: true });

// Models
export const FileConfigModel =
	(mongoose.models.FileConfig as mongoose.Model<IFileConfig>) ||
	mongoose.model<IFileConfig>('FileConfig', FileConfigSchema);

export const StorageConfigModel =
	(mongoose.models.StorageConfig as mongoose.Model<IStorageConfig>) ||
	mongoose.model<IStorageConfig>('StorageConfig', StorageConfigSchema);

// Convenience default export (optional)
export default {
	FileConfigModel,
	StorageConfigModel,
};
