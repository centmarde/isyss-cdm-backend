import { IAuthenticatedRequest, ICurrentUser } from '@isyss-cdm/interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest<IAuthenticatedRequest>();
    return request.user;
  },
);
