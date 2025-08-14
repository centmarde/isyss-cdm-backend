import {
  CheckSessionResDTO,
  GenerateTokenResDTO,
  GetMyActivitiesResDTO,
  LoginResDTO,
  LogoutResDTO,
} from '@isyss-cdm/dto';
import { IApiDocConfig } from '@isyss-cdm/interface';
import { HttpStatus } from '@nestjs/common';

export const ApiDocMap: Record<string, IApiDocConfig> = {
  login: {
    summary: 'User Login',
    description: 'Authenticates a user and returns access tokens',
    statusCode: HttpStatus.OK,
    bearerAuth: false,
    type: LoginResDTO,
    responses: [
      {
        status: HttpStatus.OK,
        description: 'User logged in successfully',
      },
      {
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials',
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Validation failed',
      },
    ],
  },
  token: {
    summary: 'Generate Token',
    description: 'Returns a new access token using a valid refresh token',
    statusCode: HttpStatus.OK,
    bearerAuth: true,
    type: GenerateTokenResDTO,
    responses: [
      {
        status: 200,
        description: 'Access token successfully refreshed',
      },
      {
        status: 403,
        description: 'Invalid or expired refresh token',
      },
    ],
  },
  logout: {
    summary: 'Logout user',
    description:
      'Logs the user out by revoking refresh tokens, blacklisting the access token, and clearing authentication cookies.',
    statusCode: HttpStatus.OK,
    bearerAuth: true,
    type: LogoutResDTO,
    responses: [
      {
        status: HttpStatus.OK,
        description: 'User logged out successfully',
      },
      {
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid or expired token',
      },
    ],
  },
  verifySession: {
    summary: 'Verify active session',
    description: 'Verifies if the current user session is active and valid.',
    statusCode: HttpStatus.OK,
    bearerAuth: true,
    type: CheckSessionResDTO,
    responses: [
      {
        status: HttpStatus.OK,
        description: 'Session is valid',
      },
      {
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid or missing authentication token',
      },
      {
        status: HttpStatus.FORBIDDEN,
        description: 'Session is inactive or expired',
      },
    ],
  },
  getMyActivities: {
    summary: 'Get My Activities',
    description:
      'Returns a paginated list of activity logs with optional filters',
    statusCode: HttpStatus.OK,
    bearerAuth: true,
    type: GetMyActivitiesResDTO,
    responses: [
      {
        status: HttpStatus.OK,
        description: 'List of activities returned successfully',
      },
      {
        status: HttpStatus.UNAUTHORIZED,
        description: 'User not authenticated',
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid query parameters',
      },
    ],
  },
};
