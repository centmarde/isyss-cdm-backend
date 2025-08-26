//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
import { IRole, RoleDocument } from './interfaces';

const roleSchema = new Schema(
	{
		id: { type: String, index: true },
		code: { type: String, required: true, index: true },
		displayName: { type: String },
		description: { type: String },
		permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
		permissionsMeta: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

roleSchema.index({ code: 1 }, { unique: true });

export const Role: Model<RoleDocument> =
	(mongoose.models.Role as Model<RoleDocument>) || mongoose.model<RoleDocument>('Role', roleSchema);

export { IRole, RoleDocument };
export default Role;
