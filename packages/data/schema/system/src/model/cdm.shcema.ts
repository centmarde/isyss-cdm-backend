//@ts-ignore
import mongoose, { Schema, Document, Types, Model } from 'mongoose';

// Reasonable assumptions made:


// Common toJSON transform to clean up output
// function applyDefaultToJSON(schema: Schema) {
// 	if (!schema.options.toJSON) schema.options.toJSON = {};
// 	schema.options.toJSON.transform = function (doc: any, ret: any) {
// 		ret.id = ret._id?.toString();
// 		delete ret._id;
// 		delete ret.__v;
// 		return ret;
// 	};
// }


/*  ControlledChemical */

export interface IControlledChemical extends Document {
	uuid?: string;
	name: string;
	casNumber?: string;
	classification?: string;
	hazardAttributes?: string;
	volumeLimit?: number;
	unit?: string;
	createdBy?: Types.ObjectId;
	meta?: any; // for any jsonb fields
	createDate?: Date;
	updateDate?: Date;
}

const ControlledChemicalSchema = new Schema<IControlledChemical>(
	{
		uuid: { type: String, index: true },
		name: { type: String, required: true, index: true },
		casNumber: { type: String },
		classification: { type: String },
		hazardAttributes: { type: String },
		volumeLimit: { type: Number },
		unit: { type: String },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		meta: { type: Schema.Types.Mixed },
	},
	{
		timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
	}
);
// applyDefaultToJSON(ControlledChemicalSchema);


//ApplicationLink

export interface IApplicationLink extends Document {
	uuid?: string;
	allowedVolume?: number;
	unit?: string;
	license?: any;
	controlledChemical?: Types.ObjectId;
	createdBy?: Types.ObjectId;
	createDate?: Date;
	updateDate?: Date;
}

const ApplicationLinkSchema = new Schema<IApplicationLink>(
	{
		uuid: { type: String, index: true },
		allowedVolume: { type: Number },
		unit: { type: String },
		license: { type: Schema.Types.Mixed },
		controlledChemical: { type: Schema.Types.ObjectId, ref: 'ControlledChemical' },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);
//applyDefaultToJSON(ApplicationLinkSchema);


// SolutionRecipe

export interface ISolutionRecipe extends Document {
	uuid?: string;
	name: string;
	component?: any; // array/object describing components
	proportion?: number;
	createdBy?: Types.ObjectId;
	controlledChemical?: Types.ObjectId;
	createDate?: Date;
	updateDate?: Date;
}

const SolutionRecipeSchema = new Schema<ISolutionRecipe>(
	{
		uuid: { type: String, index: true },
		name: { type: String, required: true },
		component: { type: Schema.Types.Mixed },
		proportion: { type: Number },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		controlledChemical: { type: Schema.Types.ObjectId, ref: 'ControlledChemical' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);
//applyDefaultToJSON(SolutionRecipeSchema);


//Warehouse

export interface IWarehouse extends Document {
	uuid?: string;
	name: string;
	capacityLimit?: number;
	unit?: string;
	compatibleTypes?: string;
	currentInventory?: any;
	quantity?: number;
	lastAuditDate?: Date;
	createdBy?: Types.ObjectId;
	controlledChemical?: Types.ObjectId;
	createDate?: Date;
	updateDate?: Date;
}

const WarehouseSchema = new Schema<IWarehouse>(
	{
		uuid: { type: String, index: true },
		name: { type: String, required: true },
		capacityLimit: { type: Number },
		unit: { type: String },
		compatibleTypes: { type: String },
		currentInventory: { type: Schema.Types.Mixed },
		quantity: { type: Number },
		lastAuditDate: { type: Date },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		controlledChemical: { type: Schema.Types.ObjectId, ref: 'ControlledChemical' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);
//applyDefaultToJSON(WarehouseSchema);

// Alert

export interface IAlert extends Document {
	uuid?: string;
	type?: string;
	severity?: string;
	triggeredAt?: Date;
	resolved?: boolean;
	details?: any;
	createdBy?: Types.ObjectId;
	controlledChemical?: Types.ObjectId;
	warehouse?: Types.ObjectId;
	createDate?: Date;
	updateDate?: Date;
}

const AlertSchema = new Schema<IAlert>(
	{
		uuid: { type: String, index: true },
		type: { type: String },
		severity: { type: String },
		triggeredAt: { type: Date },
		resolved: { type: Boolean, default: false },
		details: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		controlledChemical: { type: Schema.Types.ObjectId, ref: 'ControlledChemical' },
		warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);
//applyDefaultToJSON(AlertSchema);


// StorageRule
export interface IStorageRule extends Document {
	uuid?: string;
	attribute?: string;
	incompatibleWith?: string;
	requiresSegregation?: boolean;
	createdBy?: Types.ObjectId;
	createDate?: Date;
	updateDate?: Date;
}

const StorageRuleSchema = new Schema<IStorageRule>(
	{
		uuid: { type: String, index: true },
		attribute: { type: String },
		incompatibleWith: { type: String },
		requiresSegregation: { type: Boolean, default: false },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } }
);
//applyDefaultToJSON(StorageRuleSchema);


//Model exports
export const ControlledChemical: Model<IControlledChemical> =
	(mongoose.models.ControlledChemical as Model<IControlledChemical>) ||
	mongoose.model<IControlledChemical>('ControlledChemical', ControlledChemicalSchema);

export const ApplicationLink: Model<IApplicationLink> =
	(mongoose.models.ApplicationLink as Model<IApplicationLink>) ||
	mongoose.model<IApplicationLink>('ApplicationLink', ApplicationLinkSchema);

export const SolutionRecipe: Model<ISolutionRecipe> =
	(mongoose.models.SolutionRecipe as Model<ISolutionRecipe>) ||
	mongoose.model<ISolutionRecipe>('SolutionRecipe', SolutionRecipeSchema);

export const Warehouse: Model<IWarehouse> =
	(mongoose.models.Warehouse as Model<IWarehouse>) ||
	mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);

export const Alert: Model<IAlert> =
	(mongoose.models.Alert as Model<IAlert>) ||
	mongoose.model<IAlert>('Alert', AlertSchema);

export const StorageRule: Model<IStorageRule> =
	(mongoose.models.StorageRule as Model<IStorageRule>) ||
	mongoose.model<IStorageRule>('StorageRule', StorageRuleSchema);

export default {
	ControlledChemical,
	ApplicationLink,
	SolutionRecipe,
	Warehouse,
	Alert,
	StorageRule,
};
