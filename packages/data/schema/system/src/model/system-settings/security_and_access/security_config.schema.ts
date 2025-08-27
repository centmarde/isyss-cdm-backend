//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
//import { ISecurityConfig, SecurityConfigDocument } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface ISecurityConfig {
	id?: string;
	env?: string;
	rateLimiting?: Record<string, unknown>;
	mfa?: Record<string, unknown>;
	passwordPolicy?: Record<string, unknown>;
	rbac?: Record<string, unknown>;
	ipControls?: Record<string, unknown>;
	tokenPolicy?: Record<string, unknown>;
	auditLogging?: Record<string, unknown>;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}


const securityConfigSchema = new Schema(
	{
		id: { type: String, index: true },
		env: { type: String },
		rateLimiting: { type: Schema.Types.Mixed },
		mfa: { type: Schema.Types.Mixed },
		passwordPolicy: { type: Schema.Types.Mixed },
		rbac: { type: Schema.Types.Mixed },
		ipControls: { type: Schema.Types.Mixed },
		tokenPolicy: { type: Schema.Types.Mixed },
		auditLogging: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

securityConfigSchema.index({ env: 1 });
securityConfigSchema.index({ env: 1 }, { unique: true });
export type SecurityConfigDocument = ISecurityConfig & Document;
export const SecurityConfig: Model<SecurityConfigDocument> =
	(mongoose.models.SecurityConfig as Model<SecurityConfigDocument>) ||
	mongoose.model<SecurityConfigDocument>('SecurityConfig', securityConfigSchema);

//export { ISecurityConfig, SecurityConfigDocument };
export default SecurityConfig;
