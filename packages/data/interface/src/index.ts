/**
 * @file Main index file for @isyss-cdm/interface package
 */

// User interfaces
export * from './user/created-by-admin.interface';
export * from './user/admin-user.interface';
export * from './user/applicant-user.interface';
export * from './user/current-user.interface';
export * from './user/user-device.interface';
export * from './user/user-setting.interface';
export * from './user/user-signature.interface';
export * from './user/enums';
export * from './user/types';

// Activity interfaces
export * from './activity/activity-log-event.interface';

// Auth interfaces
export * from './auth/refresh-token.interface';

// Licensing interfaces
export * from './licensing/index';

// Other interfaces
export * from './other/api-doc.interface';
export * from './other/auth-request.interface';
export * from './other/custom-api.interface';
export * from './other/env.interface';
export * from './other/error-handler.interface';
