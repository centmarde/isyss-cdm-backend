import { GetDeviceBySourceAndUserIdDTO } from '@isyss-cdm/dto';
import { UserType } from '@isyss-cdm/enum';
import { Prisma, UserDevice } from '@isyss-cdm/user-account-schema';
import { Injectable } from '@nestjs/common';
import { CommonPrismaService } from '../prisma';

@Injectable()
export class DeviceService {
  constructor(private readonly commonPrismaService: CommonPrismaService) {
    //
  }

  async getDeviceBySourceAndUserId(
    data: GetDeviceBySourceAndUserIdDTO,
  ): Promise<UserDevice> {
    const { userId, source, userType } = data;
    return await this.commonPrismaService.userDevice.findFirst({
      where: {
        source,
        ...(userType === UserType.ADMIN
          ? { admin: { id: userId } }
          : userType === UserType.APPLICANT
            ? { applicant: { id: userId } }
            : {}),
      },
    });
  }

  async createDevice(data: Prisma.UserDeviceCreateInput): Promise<UserDevice> {
    return await this.commonPrismaService.userDevice.create({ data });
  }
}
