import { IAdminUser } from './admin-user.interface';
import { IApplicantUser } from './applicant-user.interface';

/**
 * Union type representing either an AdminUser or an ApplicantUser
 */
export type User = IAdminUser | IApplicantUser;

/**
 * Type for creating a new AdminUser
 */
export type CreateAdminUserInput = Omit<IAdminUser, 'id' | 'createdAt' | 'updatedAt' | 'setting' | 'signature' | 'device'>;

/**
 * Type for creating a new ApplicantUser
 */
export type CreateApplicantUserInput = Omit<IApplicantUser, 'id' | 'createdAt' | 'updatedAt' | 'setting' | 'signature' | 'device'>;

/**
 * Type for updating an AdminUser
 */
export type UpdateAdminUserInput = Partial<Omit<IAdminUser, 'id' | 'createdAt' | 'updatedAt' | 'setting' | 'signature' | 'device'>>;

/**
 * Type for updating an ApplicantUser
 */
export type UpdateApplicantUserInput = Partial<Omit<IApplicantUser, 'id' | 'createdAt' | 'updatedAt' | 'setting' | 'signature' | 'device'>>;