//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { IMaintenanceConfig } from './interfaces';

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

export { IMaintenanceConfig };
export default MaintenanceConfigModel;
