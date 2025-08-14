import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};
