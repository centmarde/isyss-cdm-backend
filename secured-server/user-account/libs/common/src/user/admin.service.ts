import { AdminUser, UserStatus } from '@isyss-cdm/user-account-schema';
import { Injectable } from '@nestjs/common';
import { CommonPrismaService } from '../prisma';

@Injectable()
export class AdminService {
  constructor(private readonly commonPrismaService: CommonPrismaService) {
    //
  }

  async getActiveAdminByUserId(userId: string): Promise<AdminUser> {
    return await this.commonPrismaService.adminUser.findFirst({
      where: {
        id: userId,
        verified: true,
        status: {
          in: [UserStatus.active, UserStatus.pending, UserStatus.verified],
        },
      },
    });
  }
}
