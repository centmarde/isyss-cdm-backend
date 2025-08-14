import { ICustomApiError } from '@isyss-cdm/interface';

export const apiMessage: Record<string, ICustomApiError> = {
  // * Success 200
  '000000': {
    code: '000000',
    statusCode: 200,
    message: 'Ok',
  },

  // * BadRequestException 400
  ACTLOG4000001: {
    code: 'ACTLOG4000001',
    statusCode: 400,
    message: 'User is forbidden to access this resource.',
  },
  ACTLOG4000002: {
    code: 'ACTLOG4000002',
    statusCode: 400,
    message: 'Invalid current user password.',
  },
  ACTLOG4000003: {
    code: 'ACTLOG4000003',
    statusCode: 400,
    message: 'New password and old password should not match.',
  },
  ACTLOG4000004: {
    code: 'ACTLOG4000004',
    statusCode: 400,
    message: 'Password is too weak.',
  },
  ACTLOG4000005: {
    code: 'ACTLOG4000005',
    statusCode: 400,
    message: 'Data already exists.',
  },
  ACTLOG4000006: {
    code: 'ACTLOG4000006',
    statusCode: 400,
    message: '', // for validation pipes
  },

  // * NotFoundException 404
  ACTLOG4040001: {
    code: 'ACTLOG4040001',
    statusCode: 404,
    message: 'Data not found.',
  },
  ACTLOG4040002: {
    code: 'ACTLOG4040002',
    statusCode: 404,
    message: 'User not found.',
  },

  // * UnauthorizedException 401
  ACTLOG4010001: {
    code: 'ACTLOG4010001',
    statusCode: 401,
    message: 'User not authenticated.',
  },
  ACTLOG4010002: {
    code: 'ACTLOG4010002',
    statusCode: 401,
    message: 'Invalid credentials.',
  },

  // * ForbiddenException 403
  ACTLOG4030001: {
    code: 'ACTLOG4030001',
    statusCode: 403,
    message: 'Your account does not have a permission to do this action.',
  },
  ACTLOG4030002: {
    code: 'ACTLOG4030002',
    statusCode: 403,
    message: 'Invalid environment.',
  },
  ACTLOG4030003: {
    code: 'ACTLOG4030003',
    statusCode: 403,
    message:
      'You have been logged out due to your simultaneous activity on the other device.',
  },
  ACTLOG4030004: {
    code: 'ACTLOG4030004',
    statusCode: 403,
    message: 'Your session has expired.',
  },
  ACTLOG4030005: {
    code: 'ACTLOG4030005',
    statusCode: 403,
    message: 'The user has been deleted and cannot perform this action.',
  },
  ACTLOG4030006: {
    code: 'ACTLOG4030006',
    statusCode: 403,
    message: 'Access denied. Your IP address is not whitelisted.',
  },
  ACTLOG4030007: {
    code: 'ACTLOG4030007',
    statusCode: 403,
    message: 'Client IP address could not be determined.',
  },

  // * ConflictException 409
  ACTLOG4090001: {
    code: 'ACTLOG4090001',
    statusCode: 409,
    message: '',
  },

  // * UnprocessableEntityException 422
  ACTLOG4220001: {
    code: 'ACTLOG4220001',
    statusCode: 422,
    message: '',
  },

  // * InternalServerErrorException 500
  ACTLOG5000001: {
    code: 'ACTLOG5000001',
    statusCode: 500,
    message: 'Server encountered an error. Please contact the developer',
  },

  // * ServiceUnavailableException 503
  ACTLOG5030001: {
    code: 'ACTLOG5030001',
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
