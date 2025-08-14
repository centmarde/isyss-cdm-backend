import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface CookieRequest extends Request {
  cookies: Record<string, string>;
}

export const Cookies = createParamDecorator(
  (
    data: string,
    ctx: ExecutionContext,
  ): string | Record<string, string> | undefined => {
    const request = ctx.switchToHttp().getRequest<CookieRequest>();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
