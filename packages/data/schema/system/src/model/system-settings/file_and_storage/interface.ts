import { Document } from 'mongoose';

// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)


interface ICreatedByAdmin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
   
}

export interface IFileConfig extends Document {
    id: string;
    templateKey: string;
    name: string;
    description: string;
    templateType: string;
    templateEngine: string;
    templateSource: boolean;
    placeholders?: Record<string, unknown>;
    outputConfig?: Record<string, unknown>;
    accessControl?: Record<string, unknown>;
    checklist?: Array<Record<string, unknown>>;
    approvers?: Array<Record<string, unknown>>;
    status?: string;
    details?: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: ICreatedByAdmin;
    
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
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: ICreatedByAdmin;
    // additional free-form JSON for provider specific config
    //config?: JSONObject;
}

