//@ts-ignore
import mongoose, { Document } from 'mongoose';
import { ICreatedByAdmin } from '../file_and_storage/interface';

export interface IPermission {
	id?: string;
	module?: string;
	baseUrl?: string;
	endpoint?: string;
	method?: string;
	permission?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: ICreatedByAdmin;
}

export interface IRole {
	id?: string;
	code: string;
	displayName?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	permissions?: mongoose.Types.ObjectId[]; // references to Permission docs
	permissionsMeta?: Record<string, unknown>; // jsonb-like metadata
	createdBy?: ICreatedByAdmin;
}

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

export type PermissionDocument = IPermission & Document;
export type RoleDocument = IRole & Document;
export type WhitelistDocument = IWhitelist & Document;
export type SecurityConfigDocument = ISecurityConfig & Document;
