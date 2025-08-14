import { LoginSessionDocument } from '@isyss-cdm/cache-schema';
import {
  CreateLoginSessionPayloadDTO,
  GetLoginSessionByUserIdPayloadDTO,
} from '@isyss-cdm/dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encrypt } from '../_core/utils/encryption.util';

@Injectable()
export class LoginSessionService {
  constructor(
    @InjectModel('LoginSession')
    private readonly loginSessionModel: Model<LoginSessionDocument>,
  ) {
    //
  }

  async createLoginSession(
    data: CreateLoginSessionPayloadDTO,
  ): Promise<LoginSessionDocument> {
    const { deviceId, userId, userType } = data;

    const encryptedData = encrypt(deviceId);
    const sessionToken = `${encryptedData.iv}:${encryptedData.content}`;

    // Remove previous sessions for this user
    await this.loginSessionModel.deleteMany({ userId });

    const newSession = new this.loginSessionModel({
      sessionToken,
      userType,
      userId,
    });

    return newSession.save();
  }

  async getLoginSessionByUserId(
    data: GetLoginSessionByUserIdPayloadDTO,
  ): Promise<LoginSessionDocument | null> {
    return this.loginSessionModel.findOne({ userId: data.userId });
  }
}
