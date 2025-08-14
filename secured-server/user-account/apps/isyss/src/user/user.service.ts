import {
  CommonAdminService,
  CommonApplicantService,
  CommonDeviceService,
  CommonUserService,
} from '@app/common';
import {
  GetDeviceBySourceAndUserIdDTO,
  GetUserByIdentifierDTO,
  GetUserByUserIdPayloadDTO,
  UpdateUserLoginStatusDTO,
  ValidateUserLoginPayloadDTO,
} from '@isyss-cdm/dto';
import { UserType } from '@isyss-cdm/enum';
import {
  AdminUser,
  ApplicantUser,
  Prisma,
  UserDevice,
  UserStatus,
} from '@isyss-cdm/user-account-schema';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private commonUserService: CommonUserService,
    private commonAdminService: CommonAdminService,
    private commonApplicantService: CommonApplicantService,
    private commonDeviceService: CommonDeviceService,
  ) {
    //
  }

  async getAdminUserByUserId(
    data: GetUserByUserIdPayloadDTO,
  ): Promise<AdminUser> {
    return await this.commonAdminService.getActiveAdminByUserId(data.userId);
  }

  async getApplicantUserByUserId(
    data: GetUserByUserIdPayloadDTO,
  ): Promise<ApplicantUser> {
    return await this.commonApplicantService.getActiveApplicantByUserId(
      data.userId,
    );
  }

  async validateUserLogin(data: ValidateUserLoginPayloadDTO) {
    const { userId, type } = data;

    let isActiveUser = false;
    let user: AdminUser | ApplicantUser = null;

    if (type === UserType.ADMIN) {
      user = await this.commonAdminService.getActiveAdminByUserId(userId);
    } else if (type === UserType.APPLICANT) {
      user =
        await this.commonApplicantService.getActiveApplicantByUserId(userId);
    }

    if (user) {
      const statusMap: Record<UserType, UserStatus[]> = {
        [UserType.ADMIN]: [
          UserStatus.pending,
          UserStatus.active,
          UserStatus.verified,
        ],
        [UserType.APPLICANT]: [
          UserStatus.pending,
          UserStatus.active,
          UserStatus.verified,
        ],
      };

      const validStatuses = statusMap[type];
      if (validStatuses.includes(user.status)) {
        isActiveUser = true;
      }
    }

    return {
      isActiveUser,
      message: isActiveUser
        ? 'Login allowed'
        : 'Invalid account. Kindly ask admin to check on your account',
    };
  }

  async getAdminUserByIdentifier(
    data: GetUserByIdentifierDTO,
  ): Promise<AdminUser | ApplicantUser | null> {
    return await this.commonUserService.getUserByIdentifier(data);
  }

  async updateUserLoginStatus(
    data: UpdateUserLoginStatusDTO,
  ): Promise<HttpStatus> {
    await this.commonUserService.updateUserLoginStatus(data);

    return HttpStatus.OK;
  }

  async getDeviceBySourceAndUserId(
    data: GetDeviceBySourceAndUserIdDTO,
  ): Promise<UserDevice> {
    return await this.commonDeviceService.getDeviceBySourceAndUserId(data);
  }

  async createUserDevice(
    data: Prisma.UserDeviceCreateInput,
  ): Promise<UserDevice> {
    return await this.commonDeviceService.createDevice(data);
  }
}
