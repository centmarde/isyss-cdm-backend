//@ts-ignore
import mongoose, { Document, Schema } from 'mongoose';
// Interfaces
export interface IAgency extends Document {
	uuid?: string;
	code: string;
	name?: string;
	description?: string;
	email?: string;
	phone?: string;
	status?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId | string; // reference to user-account/admin
}

export interface IAgencyPermission extends Document {
	resource: string;
	permissionLevel?: any; // can be JSON / object describing levels
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId | string;
	agency: mongoose.Types.ObjectId | IAgency | string;
}

export interface IInteragencyWorkflow extends Document {
	uuid?: string;
	code: string;
	description?: string;
	status?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId | string;
	initiatingAgency: mongoose.Types.ObjectId | IAgency | string;
	participatingAgencies: Array<mongoose.Types.ObjectId | IAgency | string>;
}

export interface IInteragencyTransaction extends Document {
	uuid?: string;
	direction?: string;
	type?: string;
	payload?: any; // JSON payload
	status?: string;
	responseCode?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId | string;
	agency: mongoose.Types.ObjectId | IAgency | string;
	interagencyWorkflow: mongoose.Types.ObjectId | IInteragencyWorkflow | string;
}
// Schemas
const AgencySchema = new Schema<IAgency>(
	{
	uuid: { type: String, index: true },
	code: { type: String, required: true, unique: true, index: true },
	name: { type: String },
	description: { type: String },
	email: { type: String },
	phone: { type: String },
		status: { type: String, default: 'active' },
		createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
const AgencyPermissionSchema = new Schema<IAgencyPermission>(
	{
		resource: { type: String, required: true },
	permissionLevel: { type: Schema.Types.Mixed },
	createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
	}
);

const InteragencyWorkflowSchema = new Schema<IInteragencyWorkflow>(
	{
		uuid: { type: String, index: true },
		code: { type: String, required: true, unique: true },
	description: { type: String },
	status: { type: String, default: 'draft' },
	createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
		initiatingAgency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
		participatingAgencies: [{ type: Schema.Types.ObjectId, ref: 'Agency' }],
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
	}
);
const InteragencyTransactionSchema = new Schema<IInteragencyTransaction>(
	{
		uuid: { type: String, index: true },
	direction: { type: String },
	type: { type: String },
	payload: { type: Schema.Types.Mixed },
	status: { type: String, default: 'pending' },
	responseCode: { type: String },
	createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
		agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
		interagencyWorkflow: { type: Schema.Types.ObjectId, ref: 'InteragencyWorkflow' },
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
	}
);
// Model registrations (avoid overwriting existing models if file is reloaded)
export const Agency = (mongoose.models.Agency as mongoose.Model<IAgency>) || mongoose.model<IAgency>('Agency', AgencySchema);
export const AgencyPermission = (mongoose.models.AgencyPermission as mongoose.Model<IAgencyPermission>) || mongoose.model<IAgencyPermission>('AgencyPermission', AgencyPermissionSchema);
export const InteragencyWorkflow = (mongoose.models.InteragencyWorkflow as mongoose.Model<IInteragencyWorkflow>) || mongoose.model<IInteragencyWorkflow>('InteragencyWorkflow', InteragencyWorkflowSchema);
export const InteragencyTransaction = (mongoose.models.InteragencyTransaction as mongoose.Model<IInteragencyTransaction>) || mongoose.model<IInteragencyTransaction>('InteragencyTransaction', InteragencyTransactionSchema);

export default {
	Agency,
	AgencyPermission,
	InteragencyWorkflow,
	InteragencyTransaction,
};
