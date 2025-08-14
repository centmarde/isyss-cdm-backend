import { Request } from 'express';
import { ICurrentUser } from '../user/current-user.interface';

export interface IAuthenticatedRequest extends Request {
  user: ICurrentUser;
}

export interface IJwtRequest extends Request {
  user?: ICurrentUser;
  cookies: Record<string, string>;
}

export interface IDecodedRefreshToken {
  exp?: number;
  [key: string]: unknown;
}
