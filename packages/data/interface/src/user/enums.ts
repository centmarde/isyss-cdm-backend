/**
 * User Account Schema Enums
 */

/**
 * Represents the status of a user device
 */
export enum DeviceStatus {
  ACTIVE = 'active',
  REMOVED = 'removed'
}

/**
 * Represents the status of a user
 */
export enum UserStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  VERIFIED = 'verified',
  DECLINED = 'declined',
  INACTIVE = 'inactive',
  DELETED = 'deleted'
}

/**
 * Represents the status of a signature
 */
export enum SignatureStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired'
}