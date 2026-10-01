/**
 * Comment Repository (Frontend)
 * HTTP data access layer - communicates with backend Comment API
 */

import { HttpService } from '../../core/http/http.client';
import type { Comment, CommentCreateDto, CommentPublic, CommentUpdateDto } from './comment.types';

export class CommentRepository {
  /**
   * Get comments for an article
   */
  static async getByArticleId(
    articleId: number,
    limit = 20,
    offset = 0
  ): Promise<CommentPublic[]> {
    return HttpService.get(
      `/articles/${articleId}/comments?limit=${limit}&offset=${offset}`
    );
  }

  /**
   * Add comment to article
   */
  static async create(articleId: number, dto: CommentCreateDto): Promise<CommentPublic> {
    return HttpService.post<CommentPublic>(
      `/articles/${articleId}/comments`,
      dto
    );
  }

  /**
   * Update comment
   */
  static async update(commentId: number, dto: CommentUpdateDto): Promise<CommentPublic> {
    return HttpService.patch<CommentPublic>(`/comments/${commentId}`, dto);
  }

  /**
   * Delete comment
   */
  static async delete(commentId: number): Promise<void> {
    return HttpService.delete(`/comments/${commentId}`);
  }
}
