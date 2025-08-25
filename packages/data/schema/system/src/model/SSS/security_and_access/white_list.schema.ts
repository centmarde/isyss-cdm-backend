//@ts-ignore
import mongoose, { Model, Schema } from 'mongoose';
import { IWhitelist, WhitelistDocument } from './interfaces';

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
whitelistSchema.index({ env: 1 });
whitelistSchema.index({ status: 1 });
whitelistSchema.index({ expiresAt: 1 });
whitelistSchema.index({ type: 1, env: 1 });

export const Whitelist: Model<WhitelistDocument> =
	(mongoose.models.Whitelist as Model<WhitelistDocument>) ||
	mongoose.model<WhitelistDocument>('Whitelist', whitelistSchema);

export { IWhitelist, WhitelistDocument };
export default Whitelist;