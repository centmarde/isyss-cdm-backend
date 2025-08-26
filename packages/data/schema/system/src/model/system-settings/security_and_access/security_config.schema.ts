//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
import { ISecurityConfig, SecurityConfigDocument } from './interfaces';

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
securityConfigSchema.index({ env: 1 }, { unique: true });

export const SecurityConfig: Model<SecurityConfigDocument> =
	(mongoose.models.SecurityConfig as Model<SecurityConfigDocument>) ||
	mongoose.model<SecurityConfigDocument>('SecurityConfig', securityConfigSchema);

export { ISecurityConfig, SecurityConfigDocument };
export default SecurityConfig;