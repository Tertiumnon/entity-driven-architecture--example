/**
 * User Entity Types
 * Represents a user in the blog platform
 */

export interface User {
  id: number;
  email: string;
  username: string;
  displayName: string;
  passwordHash: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User without password (safe to return to client)
 */
export type UserPublic = Omit<User, 'passwordHash'>;

/**
 * User Create DTO - Required fields for registration
 */
export interface UserCreateDto {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

/**
 * User Update DTO - Optional fields for profile updates
 */
export interface UserUpdateDto {
  displayName?: string;
  bio?: string;
  avatar?: string;
}

/**
 * User Login DTO
 */
export interface UserLoginDto {
  email: string;
  password: string;
}

/**
 * User Response DTO - Safe to send to client
 */
export interface UserResponseDto {
  id: number;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * JWT Token Payload
 */
export interface JwtPayload {
  id: number;
  email: string;
  username: string;
}
