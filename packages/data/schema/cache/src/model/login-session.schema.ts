import { UserType } from '@isyss-cdm/enum';
import { Document, Schema } from 'mongoose';

export interface LoginSessionDocument extends Document {
  sessionToken: string;
  userType: UserType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const LoginSessionSchema = new Schema<LoginSessionDocument>(
  {
    sessionToken: { type: String, required: true },
    userType: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
    userId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'login_session',
  },
);
