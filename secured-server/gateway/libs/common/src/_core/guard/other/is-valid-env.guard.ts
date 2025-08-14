import { envConfig } from '@isyss-cdm/constants';
import { CustomApiResponse } from '@isyss-cdm/exception';
import { IAuthenticatedRequest } from '@isyss-cdm/interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { apiMessage } from '../../swagger/api-message.const';

@Injectable()
export class IsValidEnvGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { env } = envConfig();
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const user = request.user;

    if (user.env && user.env.toLowerCase() !== env.toLowerCase()) {
      throw new CustomApiResponse(apiMessage['GATEWAY4030002']);
    }

    return true;
  }
}
