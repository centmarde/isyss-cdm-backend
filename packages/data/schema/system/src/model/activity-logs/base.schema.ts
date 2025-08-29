import { Schema } from 'mongoose';

// Common base fields
export const base = {
  id: { type: String, default: () => crypto.randomUUID() },
  uuid: { type: String, default: () => crypto.randomUUID(), index: true },
  createDate: { type: Date, default: Date.now, index: true },
  actor: { type: Schema.Types.Mixed }, // can reference user-account or embed snapshot
};
