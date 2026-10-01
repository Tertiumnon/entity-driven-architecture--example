/**
 * User Repository (Frontend)
 * HTTP data access layer - communicates with backend User API
 */

import { HttpService } from '../../core/http/http.client';
import type { User, UserCreateDto, UserLoginDto, UserPublic, UserUpdateDto } from './user.types';

export class UserRepository {
  /**
   * Get user by username
   */
  static async getByUsername(username: string): Promise<UserPublic> {
    return HttpService.get<UserPublic>(`/users/${username}`);
  }

  /**
   * Get user's articles
   */
  static async getUserArticles(userId: number, limit = 10, offset = 0) {
    return HttpService.get(`/users/${userId}/articles?limit=${limit}&offset=${offset}`);
  }

  /**
   * Register new user
   */
  static async register(dto: UserCreateDto): Promise<UserPublic> {
    return HttpService.post<UserPublic>('/auth/register', dto);
  }

  /**
   * Login user
   */
  static async login(dto: UserLoginDto): Promise<{
    user: User;
    token: string;
  }> {
    return HttpService.post('/auth/login', dto);
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    return HttpService.post('/auth/logout', {});
  }

  /**
   * Update user profile
   */
  static async update(userId: number, dto: UserUpdateDto): Promise<UserPublic> {
    return HttpService.patch<UserPublic>(`/users/${userId}`, dto);
  }
}
