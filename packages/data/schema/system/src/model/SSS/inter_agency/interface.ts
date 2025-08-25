// Interface for InteragencyConfig
import { Document } from 'mongoose';

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export interface JSONObject {
    [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

export interface IInteragencyConfig extends Document {
    id?: number; // optional numeric id if your system keeps one outside of _id
    uuid: string;
    agencyCode?: string;
    agencyName?: string;
    description?: string;
    integrationSettings?: JSONObject;
    accessControl?: JSONObject;
    workflowParticipation?: JSONObject;
    logging?: JSONObject;
    status?: string;
    lastSynced?: Date;
    createDate?: Date;
    updateDate?: Date;
    createdBy?: JSONObject;
}
