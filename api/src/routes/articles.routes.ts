/**
 * Article Routes
 * GET /api/articles - List all published articles
 * POST /api/articles - Create new article (auth required)
 * GET /api/articles/:slug - Get article by slug
 * PATCH /api/articles/:id - Update article (owner only)
 * DELETE /api/articles/:id - Delete article (owner only)
 */

import type { Elysia } from 'elysia';
import { ArticleService } from '../entities/article/article.service';
import type { ArticleCreateDto, ArticleUpdateDto } from '../entities/article/article.types';

export const registerArticleRoutes = (app: Elysia) => {
  const articleService = new ArticleService();

  return app
    .get('/articles', async ({ query }) => {
      try {
        const limit = query?.limit ? parseInt(query.limit as string) : 10;
        const offset = query?.offset ? parseInt(query.offset as string) : 0;

        const articles = await articleService.getPublished(limit, offset);

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
    .post('/articles', async ({ body }) => {
      try {
        // TODO: Add authentication middleware to extract authorId from JWT token
        const dto = body as ArticleCreateDto & { authorId: number };
        const authorId = dto.authorId; // This would come from auth middleware

        const article = await articleService.create(dto, authorId);

        return {
          status: 'success',
          data: article,
          message: 'Article created successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to create article',
        };
      }
    })
    .get('/articles/:slug', async ({ params }) => {
      try {
        const article = await articleService.getBySlug(params.slug);

        return {
          status: 'success',
          data: article,
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Article not found',
        };
      }
    })
    .patch('/articles/:id', async ({ params, body }) => {
      try {
        // TODO: Add authentication middleware to extract userId and verify ownership
        const dto = body as ArticleUpdateDto & { userId: number };
        const userId = dto.userId; // This would come from auth middleware

        const article = await articleService.update(parseInt(params.id), dto, userId);

        return {
          status: 'success',
          data: article,
          message: 'Article updated successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to update article',
        };
      }
    })
    .delete('/articles/:id', async ({ params }) => {
      try {
        // TODO: Add authentication middleware to extract userId and verify ownership
        const userId = 1; // This would come from auth middleware
        const success = await articleService.delete(parseInt(params.id), userId);

        if (!success) {
          return {
            status: 'error',
            message: 'Failed to delete article',
          };
        }

        return {
          status: 'success',
          message: 'Article deleted successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to delete article',
        };
      }
    });
};
