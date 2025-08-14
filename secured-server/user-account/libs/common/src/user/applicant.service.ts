import { UserStatus } from '@isyss-cdm/user-account-schema';
import { Injectable } from '@nestjs/common';
import { ApplicantUser } from '@prisma/client';
import { CommonPrismaService } from '../prisma';

@Injectable()
export class ApplicantService {
  constructor(private readonly commonPrismaService: CommonPrismaService) {
    //
  }

  async getActiveApplicantByUserId(userId: string): Promise<ApplicantUser> {
    return await this.commonPrismaService.applicantUser.findFirst({
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
