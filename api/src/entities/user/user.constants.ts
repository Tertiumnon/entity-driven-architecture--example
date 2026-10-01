/**
 * User Entity Constants
 */

export const USER_CONSTANTS = {
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_DISPLAY_NAME_LENGTH: 1,
  MAX_DISPLAY_NAME_LENGTH: 50,
  MAX_BIO_LENGTH: 500,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_REGEX: /^[a-zA-Z0-9_-]+$/,
} as const;

export const USER_ERROR_MESSAGES = {
  NOT_FOUND: 'User not found',
  ALREADY_EXISTS: 'User with this email or username already exists',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_USERNAME: 'Username can only contain letters, numbers, hyphens, and underscores',
  USERNAME_TOO_SHORT: `Username must be at least ${USER_CONSTANTS.MIN_USERNAME_LENGTH} characters`,
  USERNAME_TOO_LONG: `Username must be less than ${USER_CONSTANTS.MAX_USERNAME_LENGTH} characters`,
  PASSWORD_TOO_SHORT: `Password must be at least ${USER_CONSTANTS.MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_TOO_LONG: `Password must be less than ${USER_CONSTANTS.MAX_PASSWORD_LENGTH} characters`,
  DISPLAY_NAME_TOO_LONG: `Display name must be less than ${USER_CONSTANTS.MAX_DISPLAY_NAME_LENGTH} characters`,
  BIO_TOO_LONG: `Bio must be less than ${USER_CONSTANTS.MAX_BIO_LENGTH} characters`,
  UNAUTHORIZED: 'Unauthorized access',
} as const;

export const USER_DB_TABLE = 'users';
