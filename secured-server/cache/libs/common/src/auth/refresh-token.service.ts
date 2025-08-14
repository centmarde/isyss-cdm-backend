import { RefreshTokenDocument } from '@isyss-cdm/cache-schema';
import {
  DeleteRefreshTokenPayloadDTO,
  GetRefreshTokenPayloadDTO,
} from '@isyss-cdm/dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateKeyPair } from '../_core/utils/encryption.util';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {
    //
  }

  async save(
    entity: Partial<RefreshTokenDocument>,
  ): Promise<RefreshTokenDocument> {
    const { publicKey, privateKey } = generateKeyPair();

    const doc = new this.refreshTokenModel({
      token: entity.token,
      expiration: entity.expiration || '',
      rsaPrivateKey: privateKey,
      rsaPublicKey: publicKey,
      userType: entity.userType,
      userId: entity.userId,
      deviceId: entity.deviceId || undefined,
    });

    return await doc.save();
  }

  async getRefreshToken(
    data: GetRefreshTokenPayloadDTO,
  ): Promise<RefreshTokenDocument | null> {
    return this.refreshTokenModel.findOne({ token: data.refreshToken });
  }

  async deleteRefreshToken(data: DeleteRefreshTokenPayloadDTO): Promise<void> {
    return await this.refreshTokenModel.findByIdAndDelete(data.id);
  }
}
