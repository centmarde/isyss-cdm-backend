//@ts-ignore
import mongoose, { Document } from 'mongoose';

// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

export interface IPermission {
	uuid?: string;
	module?: string;
	baseUrl?: string;
	endpoint?: string;
	method?: string;
	permission?: string;
	description?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

export interface IRole {
	uuid?: string;
	code: string;
	displayName?: string;
	description?: string;
	createDate?: Date;
	updateDate?: Date;
	permissions?: mongoose.Types.ObjectId[]; // references to Permission docs
	permissionsMeta?: JSONObject; // jsonb-like metadata
	createdBy?: mongoose.Types.ObjectId;
}

export interface IWhitelist {
	uuid?: string;
	type?: string;
	value?: string;
	label?: string;
	env?: string;
	expiresAt?: Date;
	status?: string;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

export interface ISecurityConfig {
	uuid?: string;
	env?: string;
	rateLimiting?: JSONObject;
	mfa?: JSONObject;
	passwordPolicy?: JSONObject;
	rbac?: JSONObject;
	ipControls?: JSONObject;
	tokenPolicy?: JSONObject;
	auditLogging?: JSONObject;
	createDate?: Date;
	updateDate?: Date;
	createdBy?: mongoose.Types.ObjectId;
}

export type PermissionDocument = IPermission & Document;
export type RoleDocument = IRole & Document;
export type WhitelistDocument = IWhitelist & Document;
export type SecurityConfigDocument = ISecurityConfig & Document;