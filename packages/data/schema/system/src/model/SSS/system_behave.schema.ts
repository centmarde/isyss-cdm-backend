
//@ts-ignore
import mongoose, { Document, Schema } from 'mongoose';

export interface IModuleToggleConfig extends Document {
	uuid?: string;
	env?: string;
	agencyCode?: string;
	modules?: any; // jsonb: list or map of module toggles
	createDate?: Date;
	updateDate?: Date;
	createdBy?: any;
}

export interface IDataRetentionConfig extends Document {
	uuid?: string;
	logRetentionDays?: number;
	autoArchiveEnabled?: boolean;
	archiveStoragePath?: string;
	notificationsEnabled?: boolean;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: any;
}

export interface IMaintenanceConfig extends Document {
	uuid?: string;
	maintenanceMode?: any; // could be boolean or object describing mode
	affectedModules?: any; // jsonb list
	createDate?: Date;
	updateDate?: Date;
	createdBy?: any;
}

const baseFields = {
	uuid: { type: String, index: true },
	createDate: { type: Date, default: Date.now, index: true },
};

const ModuleToggleConfigSchema = new Schema<IModuleToggleConfig>(
	{
		...baseFields,
		env: { type: String },
		agencyCode: { type: String },
		modules: { type: Schema.Types.Mixed },
		updateDate: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'moduleToggleConfig' },
);

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

const MaintenanceConfigSchema = new Schema<IMaintenanceConfig>(
	{
		...baseFields,
		maintenanceMode: { type: Schema.Types.Mixed },
		affectedModules: { type: Schema.Types.Mixed },
		updateDate: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'maintenanceConfig' },
);

// indexes
ModuleToggleConfigSchema.index({ uuid: 1 });
DataRetentionConfigSchema.index({ uuid: 1 });
MaintenanceConfigSchema.index({ uuid: 1 });

export const ModuleToggleConfigModel =
	(mongoose.models.ModuleToggleConfig as mongoose.Model<IModuleToggleConfig>) ||
	mongoose.model<IModuleToggleConfig>('ModuleToggleConfig', ModuleToggleConfigSchema);

export const DataRetentionConfigModel =
	(mongoose.models.DataRetentionConfig as mongoose.Model<IDataRetentionConfig>) ||
	mongoose.model<IDataRetentionConfig>('DataRetentionConfig', DataRetentionConfigSchema);

export const MaintenanceConfigModel =
	(mongoose.models.MaintenanceConfig as mongoose.Model<IMaintenanceConfig>) ||
	mongoose.model<IMaintenanceConfig>('MaintenanceConfig', MaintenanceConfigSchema);

export default {
	ModuleToggleConfig: ModuleToggleConfigModel,
	DataRetentionConfig: DataRetentionConfigModel,
	MaintenanceConfig: MaintenanceConfigModel,
};

