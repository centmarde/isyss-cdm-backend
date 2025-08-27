//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
//import { IWhitelist, WhitelistDocument } from './interfaces';
import { ICreatedByAdmin } from '@isyss-cdm/interface';

export interface IWhitelist {
	id?: string;
	type?: string;
	value?: string;
	label?: string;
	env?: string;
	expiresAt?: Date;
	status?: string;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}

const whitelistSchema = new Schema(
	{
		id: { type: String, index: true },
		type: { type: String },
		value: { type: String },
		label: { type: String },
		env: { type: String },
		expiresAt: { type: Date },
		status: { type: String },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

whitelistSchema.index({ type: 1, value: 1 });
whitelistSchema.index({ env: 1 });
whitelistSchema.index({ status: 1 });
whitelistSchema.index({ expiresAt: 1 });
whitelistSchema.index({ type: 1, env: 1 });

export const Whitelist: Model<WhitelistDocument> =
	(mongoose.models.Whitelist as Model<WhitelistDocument>) ||
	mongoose.model<WhitelistDocument>('Whitelist', whitelistSchema);
export type WhitelistDocument = IWhitelist & Document;
//export { IWhitelist, WhitelistDocument };
export default Whitelist;
