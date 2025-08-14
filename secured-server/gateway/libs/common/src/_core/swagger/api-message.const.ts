import { ICustomApiError } from '@isyss-cdm/interface';

export const apiMessage: Record<string, ICustomApiError> = {
  // * Success 200
  '000000': {
    code: '000000',
    statusCode: 200,
    message: 'Ok',
  },

  // * BadRequestException 400
  GATEWAY4000001: {
    code: 'GATEWAY4000001',
    statusCode: 400,
    message: 'User is forbidden to access this resource.',
  },
  GATEWAY4000002: {
    code: 'GATEWAY4000002',
    statusCode: 400,
    message: 'Invalid current user password.',
  },
  GATEWAY4000003: {
    code: 'GATEWAY4000003',
    statusCode: 400,
    message: 'New password and old password should not match.',
  },
  GATEWAY4000004: {
    code: 'GATEWAY4000004',
    statusCode: 400,
    message: 'Password is too weak.',
  },
  GATEWAY4000005: {
    code: 'GATEWAY4000005',
    statusCode: 400,
    message: 'Data already exists.',
  },
  GATEWAY4000006: {
    code: 'GATEWAY4000006',
    statusCode: 400,
    message: '', // for validation pipes
  },

  // * NotFoundException 404
  GATEWAY4040001: {
    code: 'GATEWAY4040001',
    statusCode: 404,
    message: 'Data not found.',
  },
  GATEWAY4040002: {
    code: 'GATEWAY4040002',
    statusCode: 404,
    message: 'User not found.',
  },

  // * UnauthorizedException 401
  GATEWAY4010001: {
    code: 'GATEWAY4010001',
    statusCode: 401,
    message: 'User not authenticated.',
  },
  GATEWAY4010002: {
    code: 'GATEWAY4010002',
    statusCode: 401,
    message: 'Invalid credentials.',
  },

  // * ForbiddenException 403
  GATEWAY4030001: {
    code: 'GATEWAY4030001',
    statusCode: 403,
    message: 'Your account does not have a permission to do this action.',
  },
  GATEWAY4030002: {
    code: 'GATEWAY4030002',
    statusCode: 403,
    message: 'Invalid environment.',
  },
  GATEWAY4030003: {
    code: 'GATEWAY4030003',
    statusCode: 403,
    message:
      'You have been logged out due to your simultaneous activity on the other device.',
  },
  GATEWAY4030004: {
    code: 'GATEWAY4030004',
    statusCode: 403,
    message: 'Your session has expired.',
  },
  GATEWAY4030005: {
    code: 'GATEWAY4030005',
    statusCode: 403,
    message: 'The user has been deleted and cannot perform this action.',
  },
  GATEWAY4030006: {
    code: 'GATEWAY4030006',
    statusCode: 403,
    message: 'Access denied. Your IP address is not whitelisted.',
  },
  GATEWAY4030007: {
    code: 'GATEWAY4030007',
    statusCode: 403,
    message: 'Client IP address could not be determined.',
  },

  // * ConflictException 409
  GATEWAY4090001: {
    code: 'GATEWAY4090001',
    statusCode: 409,
    message: '',
  },

  // * UnprocessableEntityException 422
  GATEWAY4220001: {
    code: 'GATEWAY4220001',
    statusCode: 422,
    message: '',
  },

  // * InternalServerErrorException 500
  GATEWAY5000001: {
    code: 'GATEWAY5000001',
    statusCode: 500,
    message: 'Server encountered an error. Please contact the developer',
  },

  // * ServiceUnavailableException 503
  GATEWAY5030001: {
    code: 'GATEWAY5030001',
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
