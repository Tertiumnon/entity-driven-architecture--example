/**
 * User Service
 * Business logic layer - validation, transformation, authentication
 * Delegates all data access to repository
 */

import { UserRepository } from './user.repository';
import type { User, UserCreateDto, UserUpdateDto, UserPublic, UserLoginDto } from './user.types';
import { USER_CONSTANTS, USER_ERROR_MESSAGES } from './user.constants';

export class UserService {
  private repository = new UserRepository();

  async find(filters?: { username?: string; email?: string }): Promise<UserPublic[]> {
    let results = await this.repository.findAll();

    if (filters?.username) {
      results = results.filter((u) =>
        u.username.toLowerCase().includes(filters.username!.toLowerCase())
      );
    }

    if (filters?.email) {
      results = results.filter((u) =>
        u.email.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }

    return results.map((u) => this._toPublic(u));
  }

  async get(id: number): Promise<UserPublic> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    return this._toPublic(user);
  }

  async getByUsername(username: string): Promise<UserPublic> {
    const user = await this.repository.findByUsername(username);
    if (!user) throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    return this._toPublic(user);
  }

  async create(dto: UserCreateDto): Promise<UserPublic> {
    if (!USER_CONSTANTS.EMAIL_REGEX.test(dto.email))
      throw new Error(USER_ERROR_MESSAGES.INVALID_EMAIL);
    if (!USER_CONSTANTS.USERNAME_REGEX.test(dto.username))
      throw new Error(USER_ERROR_MESSAGES.INVALID_USERNAME);
    if (dto.username.length < USER_CONSTANTS.MIN_USERNAME_LENGTH)
      throw new Error(USER_ERROR_MESSAGES.USERNAME_TOO_SHORT);
    if (dto.password.length < USER_CONSTANTS.MIN_PASSWORD_LENGTH)
      throw new Error(USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT);

    const existsByEmail = await this.repository.findByEmail(dto.email);
    const existsByUsername = await this.repository.findByUsername(dto.username);

    if (existsByEmail || existsByUsername)
      throw new Error(USER_ERROR_MESSAGES.ALREADY_EXISTS);

    const newUser: User = {
      id: 0, // Repository will assign ID
      email: dto.email,
      username: dto.username,
      displayName: dto.displayName,
      passwordHash: this._hashPassword(dto.password),
      bio: undefined,
      avatar: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const saved = await this.repository.save(newUser);
    return this._toPublic(saved);
  }

  async update(id: number, dto: UserUpdateDto): Promise<UserPublic> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);

    if (dto.displayName !== undefined) user.displayName = dto.displayName;
    if (dto.bio !== undefined) user.bio = dto.bio;
    if (dto.avatar !== undefined) user.avatar = dto.avatar;
    user.updatedAt = new Date();

    const saved = await this.repository.save(user);
    return this._toPublic(saved);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    return this.repository.delete(id);
  }

  async authenticate(
    dto: UserLoginDto
  ): Promise<UserPublic & { id: number; username: string; email: string }> {
    const user = await this.repository.findByEmail(dto.email);
    if (!user || !this._verifyPassword(dto.password, user.passwordHash)) {
      throw new Error(USER_ERROR_MESSAGES.INVALID_PASSWORD);
    }
    return {
      ...this._toPublic(user),
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  private _toPublic(user: User): UserPublic {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
  }

  private _hashPassword(password: string): string {
    return `$2b$10$${Buffer.from(password).toString('base64')}`;
  }

  private _verifyPassword(password: string, hash: string): boolean {
    return hash.includes(Buffer.from(password).toString('base64'));
  }
}
