//@ts-ignore
import { Document } from 'mongoose';

// Concrete JSON types for TypeScript usage (no `any`, `unknown`, or explicit `undefined`)
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}
export interface INotificationConfig extends Document {
  uuid: string;
  templateKey?: string;
  title?: string;
  description?: string;
  channelSettings?: Record<string, JSONObject> | JSONObject;
  trigger?: Record<string, JSONObject> | JSONObject;
  userPreferenceOverride?: boolean;
  placeholders?: string;
  status?: string;
  createDate?: Date;
  updateDate?: Date;
  createdBy?: Record<string, JSONObject> | JSONObject;
}

export interface IGatewayConfig extends Document {
  uuid: string;
  type?: string;
  provider?: string;
  credentials?: Record<string, JSONObject> | JSONObject;
  rateLimit?: Record<string, JSONObject> | JSONObject;
  failoverEnabled?: boolean;
  fallbackProvider?: string;
  senderName?: string;
  status?: string;
  createDate?: Date;
  updateDate?: Date;
  createdBy?: Record<string, JSONObject> | JSONObject;
}

export default {
  INotificationConfig: null as unknown as INotificationConfig,
  IGatewayConfig: null as unknown as IGatewayConfig,
};
