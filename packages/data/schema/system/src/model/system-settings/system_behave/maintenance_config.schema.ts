//@ts-ignore
import mongoose, { Schema } from 'mongoose';
import { IMaintenanceConfig } from './interfaces';

const baseFields = {
	uuid: { type: String, index: true },
	createDate: { type: Date, default: Date.now, index: true },
};

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

MaintenanceConfigSchema.index({ uuid: 1 });
MaintenanceConfigSchema.index({ createDate: 1 });
MaintenanceConfigSchema.index({ updateDate: 1 });

export const MaintenanceConfigModel =
	(mongoose.models.MaintenanceConfig as mongoose.Model<IMaintenanceConfig>) ||
	mongoose.model<IMaintenanceConfig>('MaintenanceConfig', MaintenanceConfigSchema);

export { IMaintenanceConfig };
export default MaintenanceConfigModel;
