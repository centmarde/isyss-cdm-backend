//@ts-ignore
import mongoose, { Schema } from 'mongoose';
//import { IMaintenanceConfig } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';


export interface IMaintenanceConfig extends Document {
	id: string;
	maintenanceMode: Record<string, unknown>; // could be boolean or object describing mode
	affectedModules: Array<Record<string, unknown>>; // jsonb list
	createdAt: Date;
	updatedAt: Date;
	createdBy: ICreatedByAdmin;
}


const baseFields = {
	id: { type: String, index: true },
	createdAt: { type: Date, default: Date.now, index: true },
};

const MaintenanceConfigSchema = new Schema<IMaintenanceConfig>(
	{
		...baseFields,
		maintenanceMode: { type: Schema.Types.Mixed },
		affectedModules: { type: Schema.Types.Mixed },
		updatedAt: { type: Date, default: Date.now },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'maintenanceConfig' },
);

MaintenanceConfigSchema.index({ id: 1 });
MaintenanceConfigSchema.index({ createdAt: 1 });
MaintenanceConfigSchema.index({ updatedAt: 1 });

export const MaintenanceConfigModel =
	(mongoose.models.MaintenanceConfig as mongoose.Model<IMaintenanceConfig>) ||
	mongoose.model<IMaintenanceConfig>('MaintenanceConfig', MaintenanceConfigSchema);

//export { IMaintenanceConfig };
export default MaintenanceConfigModel;
