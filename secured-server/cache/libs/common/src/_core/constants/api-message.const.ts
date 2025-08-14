import { ICustomApiError } from '@isyss-cdm/interface';

export const apiMessage: Record<string, ICustomApiError> = {
  // * Success 200
  '000000': {
    code: '000000',
    statusCode: 200,
    message: 'Ok',
  },

  // * BadRequestException 400
  CACHE4000001: {
    code: 'CACHE4000001',
    statusCode: 400,
    message: 'User is forbidden to access this resource.',
  },
  CACHE4000002: {
    code: 'CACHE4000002',
    statusCode: 400,
    message: 'Invalid current user password.',
  },
  CACHE4000003: {
    code: 'CACHE4000003',
    statusCode: 400,
    message: 'New password and old password should not match.',
  },
  CACHE4000004: {
    code: 'CACHE4000004',
    statusCode: 400,
    message: 'Password is too weak.',
  },
  CACHE4000005: {
    code: 'CACHE4000005',
    statusCode: 400,
    message: 'Data already exists.',
  },
  CACHE4000006: {
    code: 'CACHE4000006',
    statusCode: 400,
    message: '', // for validation pipes
  },

  // * NotFoundException 404
  CACHE4040001: {
    code: 'CACHE4040001',
    statusCode: 404,
    message: 'Data not found.',
  },
  CACHE4040002: {
    code: 'CACHE4040002',
    statusCode: 404,
    message: 'User not found.',
  },

  // * UnauthorizedException 401
  CACHE4010001: {
    code: 'CACHE4010001',
    statusCode: 401,
    message: 'User not authenticated.',
  },
  CACHE4010002: {
    code: 'CACHE4010002',
    statusCode: 401,
    message: 'Invalid credentials.',
  },

  // * ForbiddenException 403
  CACHE4030001: {
    code: 'CACHE4030001',
    statusCode: 403,
    message: 'Your account does not have a permission to do this action.',
  },
  CACHE4030002: {
    code: 'CACHE4030002',
    statusCode: 403,
    message: 'Invalid environment.',
  },
  CACHE4030003: {
    code: 'CACHE4030003',
    statusCode: 403,
    message:
      'You have been logged out due to your simultaneous activity on the other device.',
  },
  CACHE4030004: {
    code: 'CACHE4030004',
    statusCode: 403,
    message: 'Your session has expired.',
  },
  CACHE4030005: {
    code: 'CACHE4030005',
    statusCode: 403,
    message: 'The user has been deleted and cannot perform this action.',
  },
  CACHE4030006: {
    code: 'CACHE4030006',
    statusCode: 403,
    message: 'Access denied. Your IP address is not whitelisted.',
  },
  CACHE4030007: {
    code: 'CACHE4030007',
    statusCode: 403,
    message: 'Client IP address could not be determined.',
  },

  // * ConflictException 409
  CACHE4090001: {
    code: 'CACHE4090001',
    statusCode: 409,
    message: '',
  },

  // * UnprocessableEntityException 422
  CACHE4220001: {
    code: 'CACHE4220001',
    statusCode: 422,
    message: '',
  },

  // * InternalServerErrorException 500
  CACHE5000001: {
    code: 'CACHE5000001',
    statusCode: 500,
    message: 'Server encountered an error. Please contact the developer',
  },

  // * ServiceUnavailableException 503
  CACHE5030001: {
    code: 'CACHE5030001',
    statusCode: 503,
    message: 'Service unavailable.',
  },

  // * Unknown
  xxxx: {
    code: 'xxxx',
    statusCode: 404,
    message: 'No code found.',
  },
};
