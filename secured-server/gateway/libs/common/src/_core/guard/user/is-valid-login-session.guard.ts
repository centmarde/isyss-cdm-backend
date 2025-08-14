import { CustomApiResponse } from '@isyss-cdm/exception';
import { IAuthenticatedRequest } from '@isyss-cdm/interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommonMicroService } from 'libs/common/src/microservice';
import { apiMessage } from '../../swagger/api-message.const';

@Injectable()
export class IsValidLoginSessionGuard implements CanActivate {
  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const user = request.user;
    const loginSession = await this.commonMicroService.cachingService(
      'auth.get.login.session.by.user.id',
      { userId: user.id },
    );

    if (!loginSession) {
      throw new CustomApiResponse(apiMessage['GATEWAY4030003']);
    }

    return true;
  }
}
