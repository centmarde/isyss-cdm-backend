import { Document } from 'mongoose';

// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

export interface IFileConfig extends Document {
    uuid: string;
    templateKey?: string;
    name?: string;
    description?: string;
    templateType?: string;
    templateEngine?: string;
    templateSource?: boolean;
    placeholders?: JSONObject;
    outputConfig?: JSONObject;
    accessControl?: JSONObject;
    checklist?: JSONArray;
    approvers?: JSONArray;
    status?: string;
    details?: JSONObject;
    createDate?: Date;
    updateDate?: Date;
    createdBy?: JSONObject;
    
}

export interface IStorageConfig extends Document {
    uuid: string;
    provider?: string;
    bucket?: string;
    defaultPath?: string;
    region?: string;
    uploadLimitMB?: number;
    expirationDays?: number;
    publicAccess?: boolean;
    createDate?: Date;
    updateDate?: Date;
    createdBy?: JSONObject;
    // additional free-form JSON for provider specific config
    config?: JSONObject;
}

