import { CommonLoginSessionService, CommonMicroService } from '@app/common';
import { LoginSessionDocument } from '@isyss-cdm/cache-schema';
import {
  CreateLoginSessionPayloadDTO,
  GetLoginSessionByUserIdPayloadDTO,
} from '@isyss-cdm/dto';
import { UserType } from '@isyss-cdm/enum';
import { AdminUser, ApplicantUser } from '@isyss-cdm/user-account-schema';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoginSessionService {
  private readonly logger = new Logger(LoginSessionService.name);

  constructor(
    private readonly commonLoginSessionService: CommonLoginSessionService,
    private readonly commonMicroService: CommonMicroService,
  ) {
    //
  }

  async createLoginSession(
    data: CreateLoginSessionPayloadDTO,
  ): Promise<HttpStatus> {
    await this.commonLoginSessionService.createLoginSession(data);

    return HttpStatus.CREATED;
  }

  async getLoginSessionByUserId(
    data: GetLoginSessionByUserIdPayloadDTO,
  ): Promise<{
    loginSession: LoginSessionDocument;
    user: AdminUser | ApplicantUser;
  }> {
    let user: AdminUser | ApplicantUser;

    const sessionData =
      await this.commonLoginSessionService.getLoginSessionByUserId(data);

    if (sessionData.userType === UserType.ADMIN) {
      user = await this.commonMicroService.userAccountService(
        'user.get.admin.by.user.id',
        { userId: sessionData.userId },
      );
    } else {
      user = await this.commonMicroService.userAccountService(
        'user.get.applicant.by.user.id',
        { userId: sessionData.userId },
      );
    }

    return { loginSession: sessionData, user };
  }
}
