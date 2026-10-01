/**
 * Authentication Routes
 * POST /api/auth/register - Register new user
 * POST /api/auth/login - Login user
 * POST /api/auth/logout - Logout user
 */

import type { Elysia } from 'elysia';
import { UserService } from '../entities/user/user.service';
import type { UserLoginDto, UserCreateDto } from '../entities/user/user.types';

export const registerAuthRoutes = (app: Elysia) => {
  const userService = new UserService();

  return app
    .post('/auth/register', async ({ body }) => {
      try {
        const dto = body as UserCreateDto;
        const user = await userService.create(dto);
        return {
          status: 'success',
          data: user,
          message: 'User registered successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Registration failed',
        };
      }
    })
    .post('/auth/login', async ({ body }) => {
      try {
        const dto = body as UserLoginDto;
        const user = await userService.authenticate(dto);
        return {
          status: 'success',
          data: {
            user,
            token: `jwt_token_${user.id}`, // TODO: Implement proper JWT
          },
          message: 'Logged in successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Login failed',
        };
      }
    })
    .post('/auth/logout', async () => {
      return {
        status: 'success',
        message: 'Logged out successfully',
      };
    });
};
