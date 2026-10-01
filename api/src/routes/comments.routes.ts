/**
 * Comment Routes
 * GET /api/articles/:articleId/comments - Get article comments
 * POST /api/articles/:articleId/comments - Add comment (auth required)
 * PATCH /api/comments/:id - Update comment (owner only)
 * DELETE /api/comments/:id - Delete comment (owner only)
 */

import type { Elysia } from 'elysia';
import { CommentService } from '../entities/comment/comment.service';
import type { CommentCreateDto, CommentUpdateDto } from '../entities/comment/comment.types';

export const registerCommentRoutes = (app: Elysia) => {
  const commentService = new CommentService();

  return app
    .get('/articles/:articleId/comments', async ({ params, query }) => {
      try {
        const limit = query?.limit ? parseInt(query.limit as string) : 20;
        const offset = query?.offset ? parseInt(query.offset as string) : 0;

        const comments = await commentService.getByArticleId(
          parseInt(params.articleId),
          limit,
          offset
        );

        const count = await commentService.getCountByArticleId(parseInt(params.articleId));

        return {
          status: 'success',
          data: comments,
          pagination: {
            limit,
            offset,
            total: count,
          },
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to fetch comments',
        };
      }
    })
    .post('/articles/:articleId/comments', async ({ params, body }) => {
      try {
        // TODO: Add authentication middleware to extract userId
        const dto = body as CommentCreateDto & { userId: number };
        const userId = dto.userId; // This would come from auth middleware
        const articleId = parseInt(params.articleId);

        const comment = await commentService.create(dto, articleId, userId);

        return {
          status: 'success',
          data: comment,
          message: 'Comment added successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to add comment',
        };
      }
    })
    .patch('/comments/:id', async ({ params, body }) => {
      try {
        // TODO: Add authentication middleware to extract userId
        const dto = body as CommentUpdateDto & { userId: number };
        const userId = dto.userId; // This would come from auth middleware

        const comment = await commentService.update(parseInt(params.id), dto, userId);

        return {
          status: 'success',
          data: comment,
          message: 'Comment updated successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to update comment',
        };
      }
    })
    .delete('/comments/:id', async ({ params }) => {
      try {
        // TODO: Add authentication middleware to extract userId
        const userId = 1; // This would come from auth middleware
        const success = await commentService.delete(parseInt(params.id), userId);

        if (!success) {
          return {
            status: 'error',
            message: 'Failed to delete comment',
          };
        }

        return {
          status: 'success',
          message: 'Comment deleted successfully',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to delete comment',
        };
      }
    });
};
