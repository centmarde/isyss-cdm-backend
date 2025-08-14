import { UserType } from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { IAuthenticatedRequest } from '@isyss-cdm/interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommonMicroService } from 'libs/common/src/microservice';
import { apiMessage } from '../../swagger/api-message.const';

@Injectable()
export class IsUserNotInactiveGuard implements CanActivate {
  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }

  async isAdminExistByUserId(userId: string): Promise<boolean> {
    const data = await this.commonMicroService.userAccountService(
      'user.get.admin.by.user.id',
      { userId },
    );
    return !!data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const user = request.user;

    let isExist = false;

    if (user.type === UserType.ADMIN) {
      isExist = await this.isAdminExistByUserId(user.id);
    }

    if (!isExist) {
      throw new CustomApiResponse(apiMessage['GATEWAY4030001']);
    }

    return true;
  }
}
