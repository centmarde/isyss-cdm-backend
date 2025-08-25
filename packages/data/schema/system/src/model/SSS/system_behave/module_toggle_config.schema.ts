//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { IModuleToggleConfig } from './interfaces';

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

ModuleToggleConfigSchema.index({ uuid: 1 });
ModuleToggleConfigSchema.index({ env: 1 });
ModuleToggleConfigSchema.index({ agencyCode: 1 });
ModuleToggleConfigSchema.index({ env: 1, agencyCode: 1 });
ModuleToggleConfigSchema.index({ createDate: 1 });

export const ModuleToggleConfigModel =
	(mongoose.models.ModuleToggleConfig as mongoose.Model<IModuleToggleConfig>) ||
	mongoose.model<IModuleToggleConfig>('ModuleToggleConfig', ModuleToggleConfigSchema);

export { IModuleToggleConfig };
export default ModuleToggleConfigModel;
