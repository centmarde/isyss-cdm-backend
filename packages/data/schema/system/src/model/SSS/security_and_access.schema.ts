//@ts-ignore
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPermission {
	uuid?: string;
	module?: string;
	baseUrl?: string;
	endpoint?: string;
	method?: string;
	permission?: string;
	description?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

export interface IRole {
	uuid?: string;
	code: string;
	displayName?: string;
	description?: string;
	createDate?: Date;
	updateDate?: Date;
	permissions?: mongoose.Types.ObjectId[]; // references to Permission docs
	permissionsMeta?: any; // jsonb-like metadata
	createdBy?: mongoose.Types.ObjectId;
}

export interface IWhitelist {
	uuid?: string;
	type?: string;
	value?: string;
	label?: string;
	env?: string;
	expiresAt?: Date;
	status?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

export interface ISecurityConfig {
	uuid?: string;
	env?: string;
	rateLimiting?: any;
	mfa?: any;
	passwordPolicy?: any;
	rbac?: any;
	ipControls?: any;
	tokenPolicy?: any;
	auditLogging?: any;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

// Mongoose Schemas & Models 
const permissionSchema = new Schema(
	{
		uuid: { type: String, index: true },
		module: { type: String },
		baseUrl: { type: String },
		endpoint: { type: String },
		method: { type: String },
		permission: { type: String, index: true },
		description: { type: String },
		createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);

permissionSchema.index({ module: 1, endpoint: 1, method: 1 });

const roleSchema = new Schema(
	{
		uuid: { type: String, index: true },
		code: { type: String, required: true, index: true },
		displayName: { type: String },
		description: { type: String },
		permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
		permissionsMeta: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);

roleSchema.index({ code: 1 }, { unique: true });

const whitelistSchema = new Schema(
	{
		uuid: { type: String, index: true },
		type: { type: String },
		value: { type: String },
		label: { type: String },
		env: { type: String },
		expiresAt: { type: Date },
		status: { type: String },
		createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);

whitelistSchema.index({ type: 1, value: 1 });

const securityConfigSchema = new Schema(
	{
		uuid: { type: String, index: true },
		env: { type: String },
		rateLimiting: { type: Schema.Types.Mixed },
		mfa: { type: Schema.Types.Mixed },
		passwordPolicy: { type: Schema.Types.Mixed },
		rbac: { type: Schema.Types.Mixed },
		ipControls: { type: Schema.Types.Mixed },
		tokenPolicy: { type: Schema.Types.Mixed },
		auditLogging: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);

securityConfigSchema.index({ env: 1 });


export type PermissionDocument = IPermission & Document;
export type RoleDocument = IRole & Document;
export type WhitelistDocument = IWhitelist & Document;
export type SecurityConfigDocument = ISecurityConfig & Document;

export const Permission: Model<PermissionDocument> =
	(mongoose.models.Permission as Model<PermissionDocument>) ||
	mongoose.model<PermissionDocument>('Permission', permissionSchema);

export const Role: Model<RoleDocument> =
	(mongoose.models.Role as Model<RoleDocument>) || mongoose.model<RoleDocument>('Role', roleSchema);

export const Whitelist: Model<WhitelistDocument> =
	(mongoose.models.Whitelist as Model<WhitelistDocument>) ||
	mongoose.model<WhitelistDocument>('Whitelist', whitelistSchema);

export const SecurityConfig: Model<SecurityConfigDocument> =
	(mongoose.models.SecurityConfig as Model<SecurityConfigDocument>) ||
	mongoose.model<SecurityConfigDocument>('SecurityConfig', securityConfigSchema);

export default {
	Permission,
	Role,
	Whitelist,
	SecurityConfig,
};
