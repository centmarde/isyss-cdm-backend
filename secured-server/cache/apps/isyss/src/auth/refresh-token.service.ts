import { CommonMicroService, CommonRefreshTokenService } from '@app/common';
import { RefreshTokenDocument } from '@isyss-cdm/cache-schema';
import {
  DeleteRefreshTokenPayloadDTO,
  GetRefreshTokenPayloadDTO,
} from '@isyss-cdm/dto';
import { UserType } from '@isyss-cdm/enum';
import { AdminUser, ApplicantUser } from '@isyss-cdm/user-account-schema';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    private readonly commonRefreshTokenService: CommonRefreshTokenService,
    private readonly commonMicroService: CommonMicroService,
  ) {
    //
  }

  async createRefreshToken(
    entity: Partial<RefreshTokenDocument>,
  ): Promise<HttpStatus> {
    await this.commonRefreshTokenService.save(entity);

    return HttpStatus.CREATED;
  }

  async getRefreshToken(data: GetRefreshTokenPayloadDTO): Promise<{
    refreshToken: RefreshTokenDocument;
    user: AdminUser | ApplicantUser;
  }> {
    let user: AdminUser | ApplicantUser;
    const tokenData =
      await this.commonRefreshTokenService.getRefreshToken(data);

    if (tokenData.userType === UserType.ADMIN) {
      user = await this.commonMicroService.userAccountService(
        'user.get.admin.by.user.id',
        { userId: tokenData.userId },
      );
    } else {
      user = await this.commonMicroService.userAccountService(
        'user.get.applicant.by.user.id',
        { userId: tokenData.userId },
      );
    }

    return { refreshToken: tokenData, user };
  }

  async deleteRefreshToken(
    data: DeleteRefreshTokenPayloadDTO,
  ): Promise<HttpStatus> {
    await this.commonRefreshTokenService.deleteRefreshToken(data);

    return HttpStatus.OK;
  }
}
