import { UserType } from '@isyss-cdm/enum';
import { Document, Schema } from 'mongoose';

export interface RefreshTokenDocument extends Document {
  token: string;
  rsaPublicKey: string;
  rsaPrivateKey: string;
  expiration: string;
  userType: UserType;
  userId: string;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RefreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    token: { type: String, required: true },
    rsaPublicKey: { type: String, required: true },
    rsaPrivateKey: { type: String, required: true },
    expiration: { type: String, default: '' },
    userType: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
    userId: { type: String, required: true },
    deviceId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'refresh_token',
  },
);
