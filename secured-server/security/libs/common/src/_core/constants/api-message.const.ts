import { ICustomApiError } from '@isyss-cdm/interface';

export const apiMessage: Record<string, ICustomApiError> = {
  // * Success 200
  '000000': {
    code: '000000',
    statusCode: 200,
    message: 'Ok',
  },

  // * BadRequestException 400
  SEC4000001: {
    code: 'SEC4000001',
    statusCode: 400,
    message: 'User is forbidden to access this resource.',
  },
  SEC4000002: {
    code: 'SEC4000002',
    statusCode: 400,
    message: 'Invalid current user password.',
  },
  SEC4000003: {
    code: 'SEC4000003',
    statusCode: 400,
    message: 'New password and old password should not match.',
  },
  SEC4000004: {
    code: 'SEC4000004',
    statusCode: 400,
    message: 'Password is too weak.',
  },
  SEC4000005: {
    code: 'SEC4000005',
    statusCode: 400,
    message: 'Data already exists.',
  },
  SEC4000006: {
    code: 'SEC4000006',
    statusCode: 400,
    message: '', // for validation pipes
  },

  // * NotFoundException 404
  SEC4040001: {
    code: 'SEC4040001',
    statusCode: 404,
    message: 'Data not found.',
  },
  SEC4040002: {
    code: 'SEC4040002',
    statusCode: 404,
    message: 'User not found.',
  },

  // * UnauthorizedException 401
  SEC4010001: {
    code: 'SEC4010001',
    statusCode: 401,
    message: 'User not authenticated.',
  },
  SEC4010002: {
    code: 'SEC4010002',
    statusCode: 401,
    message: 'Invalid credentials.',
  },

  // * ForbiddenException 403
  SEC4030001: {
    code: 'SEC4030001',
    statusCode: 403,
    message: 'Your account does not have a permission to do this action.',
  },
  SEC4030002: {
    code: 'SEC4030002',
    statusCode: 403,
    message: 'Invalid environment.',
  },
  SEC4030003: {
    code: 'SEC4030003',
    statusCode: 403,
    message:
      'You have been logged out due to your simultaneous activity on the other device.',
  },
  SEC4030004: {
    code: 'SEC4030004',
    statusCode: 403,
    message: 'Your session has expired.',
  },
  SEC4030005: {
    code: 'SEC4030005',
    statusCode: 403,
    message: 'The user has been deleted and cannot perform this action.',
  },
  SEC4030006: {
    code: 'SEC4030006',
    statusCode: 403,
    message: 'Access denied. Your IP address is not whitelisted.',
  },
  SEC4030007: {
    code: 'SEC4030007',
    statusCode: 403,
    message: 'Client IP address could not be determined.',
  },

  // * ConflictException 409
  SEC4090001: {
    code: 'SEC4090001',
    statusCode: 409,
    message: '',
  },

  // * UnprocessableEntityException 422
  SEC4220001: {
    code: 'SEC4220001',
    statusCode: 422,
    message: '',
  },

  // * InternalServerErrorException 500
  SEC5000001: {
    code: 'SEC5000001',
    statusCode: 500,
    message: 'Server encountered an error. Please contact the developer',
  },

  // * ServiceUnavailableException 503
  SEC5030001: {
    code: 'SEC5030001',
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
