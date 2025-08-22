//@ts-ignore
import { Schema, model, Document } from 'mongoose';

export interface IInteragencyConfig extends Document {
	id?: number; // optional numeric id if your system keeps one outside of _id
	uuid: string;
	agencyCode?: string;
	agencyName?: string;
	description?: string;
	integrationSettings?: any;
	accessControl?: any;
	workflowParticipation?: any;
	logging?: any;
	status?: string;
	lastSynced?: Date;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: any;
}

const InteragencySchema = new Schema<IInteragencyConfig>(
	{
		id: { type: Number, required: false, sparse: true, index: true },
		uuid: { type: String, required: true, unique: true, index: true },
		agencyCode: { type: String, trim: true, index: true },
		agencyName: { type: String, trim: true },
		description: { type: String },
		integrationSettings: { type: Schema.Types.Mixed, default: {} },
		accessControl: { type: Schema.Types.Mixed, default: {} },
		workflowParticipation: { type: Schema.Types.Mixed, default: {} },
		logging: { type: Schema.Types.Mixed, default: {} },
		status: { type: String, default: 'inactive' },
		lastSynced: { type: Date },
		createdBy: { type: Schema.Types.Mixed },
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
		collection: 'interagencyConfig',
	}
);

// unique index on agencyCode where present (sparse) to avoid collisions for documents without the field
InteragencySchema.index({ agencyCode: 1 }, { unique: true, sparse: true });

export const InteragencyModel = model<IInteragencyConfig>('InteragencyConfig', InteragencySchema);

export default InteragencyModel;
