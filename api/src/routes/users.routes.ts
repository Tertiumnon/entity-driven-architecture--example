/**
 * User Routes
 * GET /api/users/:username - Get user profile
 * GET /api/users/:id/articles - Get user's articles
 * PATCH /api/users/:id - Update user profile
 */

import type { Elysia } from 'elysia';
import { UserService } from '../entities/user/user.service';
import type { UserUpdateDto } from '../entities/user/user.types';
import { ArticleService } from '../entities/article/article.service';

export const registerUserRoutes = (app: Elysia) => {
  const userService = new UserService();
  const articleService = new ArticleService();

  return app
    .get('/users/:username', async ({ params }) => {
      try {
        const user = await userService.getByUsername(params.username);
        return {
          status: 'success',
          data: user,
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'User not found',
        };
      }
    })
    .get('/users/:id/articles', async ({ params, query }) => {
      try {
        const limit = query?.limit ? parseInt(query.limit as string) : 10;
        const offset = query?.offset ? parseInt(query.offset as string) : 0;

        const articles = await articleService.getUserArticles(
          parseInt(params.id),
          limit,
          offset
        );

        return {
          status: 'success',
          data: articles,
          pagination: {
            limit,
            offset,
          },
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to fetch articles',
        };
      }
    })
    .patch('/users/:id', async ({ params, body }) => {
      try {
        // TODO: Add authentication middleware to verify user owns this profile
        const dto = body as UserUpdateDto;
        const user = await userService.update(parseInt(params.id), dto);

        return {
          status: 'success',
          data: user,
          message: 'Profile updated successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Update failed',
        };
      }
    });
};
