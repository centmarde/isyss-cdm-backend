//@ts-ignore
import { Document } from 'mongoose';
import { ICreatedByAdmin } from '../file_and_storage/interface';

export interface IModuleToggleConfig extends Document {
	id?: string;
	env?: string;
	agencyCode?: string;
	modules?: Record<string, unknown>; // jsonb: list or map of module toggles
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}

export interface IDataRetentionConfig extends Document {
	id?: string;
	logRetentionDays?: number;
	autoArchiveEnabled?: boolean;
	archiveStoragePath?: string;
	notificationsEnabled?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}

export interface IMaintenanceConfig extends Document {
	id?: string;
	maintenanceMode?: Record<string, unknown>; // could be boolean or object describing mode
	affectedModules?: Array<Record<string, unknown>>; // jsonb list
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}
