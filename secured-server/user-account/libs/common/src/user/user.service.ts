import {
  GetUserByIdentifierDTO,
  UpdateUserLoginStatusDTO,
} from '@isyss-cdm/dto';
import { UserType } from '@isyss-cdm/enum';
import { AdminUser, ApplicantUser } from '@isyss-cdm/user-account-schema';
import { Injectable } from '@nestjs/common';
import { CommonPrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly commonPrismaService: CommonPrismaService) {
    //
  }

  async getUserByIdentifier(
    data: GetUserByIdentifierDTO,
  ): Promise<AdminUser | ApplicantUser | null> {
    const { identifier, isUsername } = data;
    const where = isUsername ? { username: identifier } : { email: identifier };

    const adminUser = await this.commonPrismaService.adminUser.findUnique({
      where,
    });
    if (adminUser) return adminUser;

    const applicantUser =
      await this.commonPrismaService.applicantUser.findUnique({ where });
    return applicantUser;
  }

  async updateUserLoginStatus(
    data: UpdateUserLoginStatusDTO,
  ): Promise<AdminUser | ApplicantUser> {
    const { userId, isLoggedIn, userType } = data;

    if (userType === UserType.ADMIN) {
      return this.commonPrismaService.adminUser.update({
        where: { id: userId },
        data: { isLoggedIn },
      });
    }

    if (userType === UserType.APPLICANT) {
      return await this.commonPrismaService.applicantUser.update({
        where: { id: userId },
        data: { isLoggedIn },
      });
    }

    throw new Error('Invalid user type');
  }
}
