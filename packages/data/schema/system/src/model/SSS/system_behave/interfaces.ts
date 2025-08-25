//@ts-ignore
import { Document } from 'mongoose';

// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

export interface IModuleToggleConfig extends Document {
	uuid?: string;
	env?: string;
	agencyCode?: string;
	modules?: JSONObject; // jsonb: list or map of module toggles
	createDate?: Date;
	updateDate?: Date;
	createdBy?: JSONObject;
}

export interface IDataRetentionConfig extends Document {
	uuid?: string;
	logRetentionDays?: number;
	autoArchiveEnabled?: boolean;
	archiveStoragePath?: string;
	notificationsEnabled?: boolean;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: JSONObject;
}

export interface IMaintenanceConfig extends Document {
	uuid?: string;
	maintenanceMode?: JSONValue; // could be boolean or object describing mode
	affectedModules?: JSONArray; // jsonb list
	createDate?: Date;
	updateDate?: Date;
	createdBy?: JSONObject;
}
