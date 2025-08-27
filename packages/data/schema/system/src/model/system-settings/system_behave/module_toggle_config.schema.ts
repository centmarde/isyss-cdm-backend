//@ts-ignore
import mongoose, { Schema } from 'mongoose';
//import { IModuleToggleConfig } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IModuleToggleConfig extends Document {
	id: string;
	env: string;
	agencyCode: string;
	modules: Record<string, unknown>; // jsonb: list or map of module toggles
	createdAt: Date;
	updatedAt: Date;
	createdBy: ICreatedByAdmin;
}


const baseFields = {
	id: { type: String, index: true },
	createdAt: { type: Date, default: Date.now, index: true },
};

const ModuleToggleConfigSchema = new Schema<IModuleToggleConfig>(
	{
		...baseFields,
		env: { type: String },
		agencyCode: { type: String },
		modules: { type: Schema.Types.Mixed },
		updatedAt: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'moduleToggleConfig' },
);

ModuleToggleConfigSchema.index({ id: 1 });
ModuleToggleConfigSchema.index({ env: 1 });
ModuleToggleConfigSchema.index({ agencyCode: 1 });
ModuleToggleConfigSchema.index({ env: 1, agencyCode: 1 });
ModuleToggleConfigSchema.index({ createdAt: 1 });

export const ModuleToggleConfigModel =
	(mongoose.models.ModuleToggleConfig as mongoose.Model<IModuleToggleConfig>) ||
	mongoose.model<IModuleToggleConfig>('ModuleToggleConfig', ModuleToggleConfigSchema);

//export { IModuleToggleConfig };
export default ModuleToggleConfigModel;
