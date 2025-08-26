//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
import { IPermission, PermissionDocument } from './interfaces';

const permissionSchema = new Schema(
	{
		id: { type: String, index: true },
		module: { type: String },
		baseUrl: { type: String },
		endpoint: { type: String },
		method: { type: String },
		permission: { type: String, index: true },
		description: { type: String },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

permissionSchema.index({ module: 1, endpoint: 1, method: 1 });

export const Permission: Model<PermissionDocument> =
	(mongoose.models.Permission as Model<PermissionDocument>) ||
	mongoose.model<PermissionDocument>('Permission', permissionSchema);

export { IPermission, PermissionDocument };
export default Permission;
