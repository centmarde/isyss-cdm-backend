//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
//import { IRole, RoleDocument } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IRole {
	id: string;
	code: string;
	displayName: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	//permissions?: mongoose.Types.ObjectId[]; // references to Permission docs
	permissions: Record<string, unknown>;
	permissionsMeta: Record<string, unknown>; // jsonb-like metadata
	createdBy: ICreatedByAdmin;
}

const roleSchema = new Schema(
	{
		id: { type: String, index: true },
		code: { type: String, required: true, index: true },
		displayName: { type: String },
		description: { type: String },
		//permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
		permissions: { type: Schema.Types.Mixed },
		permissionsMeta: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

roleSchema.index({ code: 1 }, { unique: true });

export type RoleDocument = IRole & Document;
export const Role: Model<RoleDocument> =
	(mongoose.models.Role as Model<RoleDocument>) || mongoose.model<RoleDocument>('Role', roleSchema);

//export { IRole, RoleDocument };
export default Role;
