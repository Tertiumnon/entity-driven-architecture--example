/**
 * User Entity Types (Frontend)
 */

export interface User {
  id: number;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic extends Omit<User, 'email'> {}

export interface UserCreateDto {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

export interface UserUpdateDto {
  displayName?: string;
  bio?: string;
  avatar?: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
