//@ts-ignore
import { Document, Schema } from 'mongoose';
type Mixed = any;


//Common base fields used across these schemas

const base = {
	id: { type: String, default: () => crypto.randomUUID() },
	uuid: { type: String, default: () => crypto.randomUUID(), index: true },
	createDate: { type: Date, default: Date.now, index: true },
};


// GIS Facility Location

export interface GisFacilityLocationDocument extends Document {
	id: string;
	uuid: string;
	facilityType?: string;
	location?: any; // GeoJSON or descriptive location
	riskLevel?: string;
	status?: string;
	createDate?: Date;
	updateDate?: Date;
	warehouse?: any;
	createdBy?: any;
}

export const GisFacilityLocationSchema = new Schema<GisFacilityLocationDocument>(
	{
		...base,
		facilityType: { type: String },
		location: { type: Schema.Types.Mixed },
		riskLevel: { type: String },
		status: { type: String },
		updateDate: { type: Date, default: Date.now },
		warehouse: { type: Schema.Types.Mixed },
		createdBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'gisFacilityLocation' },
);


//Chemical Incident

export interface ChemicalIncidentDocument extends Document {
	id: string;
	uuid: string;
	incidentType?: string;
	proof?: any;
	severity?: string;
	location?: any;
	envConditions?: string;
	status?: string;
	resolutionNotes?: string;
	createDate?: Date;
	updateDate?: Date;
	warehouse?: any;
	reportedBy?: any;
	reviewedBy?: any;
}

export const ChemicalIncidentSchema = new Schema<ChemicalIncidentDocument>(
	{
		...base,
		incidentType: { type: String },
		proof: { type: Schema.Types.Mixed },
		severity: { type: String },
		location: { type: Schema.Types.Mixed },
		envConditions: { type: String },
		status: { type: String },
		resolutionNotes: { type: String },
		updateDate: { type: Date, default: Date.now },
		warehouse: { type: Schema.Types.Mixed },
		reportedBy: { type: Schema.Types.Mixed },
		reviewedBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'chemicalIncident' },
);


// Analytic Prediction

export interface AnalyticPredictionDocument extends Document {
	id: string;
	uuid: string;
	modelName?: string;
	predictionType?: string;
	inputFeatures?: any;
	predictionResult?: any;
	confidenceScore?: string;
	explanation?: string;
	validUntil?: Date;
	createDate?: Date;
	updateDate?: Date;
	warehouses?: any;
	generatedBy?: any;
}

export const AnalyticPredictionSchema = new Schema<AnalyticPredictionDocument>(
	{
		...base,
		modelName: { type: String },
		predictionType: { type: String },
		inputFeatures: { type: Schema.Types.Mixed },
		predictionResult: { type: Schema.Types.Mixed },
		confidenceScore: { type: String },
		explanation: { type: String },
		validUntil: { type: Date },
		updateDate: { type: Date, default: Date.now },
		warehouses: { type: Schema.Types.Mixed },
		generatedBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'analyticPrediction' },
);


 // Alert Notification

export interface AlertNotificationDocument extends Document {
	id: string;
	uuid: string;
	alertType?: string;
	message?: any;
	severity?: string;
	status?: string;
	acknowledgedDate?: Date;
	createDate?: Date;
	acknowledgedBy?: any;
	warehouse?: any;
}

export const AlertNotificationSchema = new Schema<AlertNotificationDocument>(
	{
		...base,
		alertType: { type: String },
		message: { type: Schema.Types.Mixed },
		severity: { type: String },
		status: { type: String },
		acknowledgedDate: { type: Date },
		acknowledgedBy: { type: Schema.Types.Mixed },
		warehouse: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'alertNotification' },
);


 // Heatmap Layer

export interface HeatmapLayerDocument extends Document {
	id: string;
	uuid: string;
	layerType?: string;
	geojsonData?: any;
	filterApplied?: string;
	timeRange?: string;
	createDate?: Date;
	updateDate?: Date;
	generatedBy?: any;
}

export const HeatmapLayerSchema = new Schema<HeatmapLayerDocument>(
	{
		...base,
		layerType: { type: String },
		geojsonData: { type: Schema.Types.Mixed },
		filterApplied: { type: String },
		timeRange: { type: String },
		updateDate: { type: Date, default: Date.now },
		generatedBy: { type: Schema.Types.Mixed },
	},
	{ timestamps: false, collection: 'heatmapLayer' },
);


  //Model Training Data

export interface ModelTrainingDataDocument extends Document {
	id: string;
	uuid: string;
	datasetName?: string;
	description?: string;
	source?: string;
	recordCount?: number;
	schemaVersion?: number;
	fileLocation?: string;
	createDate?: Date;
	updateDate?: Date;
}

export const ModelTrainingDataSchema = new Schema<ModelTrainingDataDocument>(
	{
		...base,
		datasetName: { type: String },
		description: { type: String },
		source: { type: String },
		recordCount: { type: Number },
		schemaVersion: { type: Number },
		fileLocation: { type: String },
		updateDate: { type: Date, default: Date.now },
	},
	{ timestamps: false, collection: 'modelTrainingData' },
);

export const schemas = {
	GisFacilityLocationSchema,
	ChemicalIncidentSchema,
	AnalyticPredictionSchema,
	AlertNotificationSchema,
	HeatmapLayerSchema,
	ModelTrainingDataSchema,
};

