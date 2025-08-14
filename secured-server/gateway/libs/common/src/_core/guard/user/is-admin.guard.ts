import { UserType } from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { IAuthenticatedRequest } from '@isyss-cdm/interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { apiMessage } from '../../swagger/api-message.const';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const user = request.user;

    if (user.type !== UserType.ADMIN) {
      throw new CustomApiResponse(apiMessage['USERACC4000001']);
    }

    return true;
  }
}
