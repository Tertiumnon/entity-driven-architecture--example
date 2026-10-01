/**
 * Comment Service
 * Business logic layer - validation, transformation, authorization
 * Delegates all data access to repository
 */

import { CommentRepository } from './comment.repository';
import { COMMENT_CONSTRAINTS, COMMENT_VALIDATION_MESSAGES } from './comment.constants';
import type { Comment, CommentCreateDto, CommentPublic, CommentUpdateDto } from './comment.types';

export class CommentService {
  private repository = new CommentRepository();

  /**
   * Get all comments for an article
   */
  async getByArticleId(
    articleId: number,
    limit = 20,
    offset = 0
  ): Promise<CommentPublic[]> {
    const comments = await this.repository.findByArticleId(articleId);
    return comments.slice(offset, offset + limit);
  }

  /**
   * Get comment by ID
   */
  async get(id: number): Promise<Comment> {
    const comment = await this.repository.findById(id);
    if (!comment) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.COMMENT_NOT_FOUND);
    }
    return comment;
  }

  /**
   * Create new comment
   */
  async create(
    dto: CommentCreateDto,
    articleId: number,
    authorId: number
  ): Promise<CommentPublic> {
    this._validateCreateDto(dto);

    const comment: Comment = {
      id: 0, // Repository will assign ID
      content: dto.content.trim(),
      authorId,
      articleId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const saved = await this.repository.save(comment);
    return saved;
  }

  /**
   * Update comment
   */
  async update(
    id: number,
    dto: CommentUpdateDto,
    authorId: number
  ): Promise<CommentPublic> {
    const comment = await this.get(id);

    if (comment.authorId !== authorId) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.UNAUTHORIZED);
    }

    this._validateUpdateDto(dto);

    comment.content = dto.content.trim();
    comment.updatedAt = new Date();

    const saved = await this.repository.save(comment);
    return saved;
  }

  /**
   * Delete comment
   */
  async delete(id: number, authorId: number): Promise<boolean> {
    const comment = await this.get(id);

    if (comment.authorId !== authorId) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.UNAUTHORIZED);
    }

    return this.repository.delete(id);
  }

  /**
   * Get comment count for article
   */
  async getCountByArticleId(articleId: number): Promise<number> {
    const comments = await this.repository.findByArticleId(articleId);
    return comments.length;
  }

  /**
   * Private helper: validate create DTO
   */
  private _validateCreateDto(dto: CommentCreateDto): void {
    if (!dto.content || dto.content.trim().length === 0) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.CONTENT_REQUIRED);
    }

    if (dto.content.length > COMMENT_CONSTRAINTS.MAX_CONTENT_LENGTH) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.CONTENT_TOO_LONG);
    }
  }

  /**
   * Private helper: validate update DTO
   */
  private _validateUpdateDto(dto: CommentUpdateDto): void {
    if (!dto.content || dto.content.trim().length === 0) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.CONTENT_REQUIRED);
    }

    if (dto.content.length > COMMENT_CONSTRAINTS.MAX_CONTENT_LENGTH) {
      throw new Error(COMMENT_VALIDATION_MESSAGES.CONTENT_TOO_LONG);
    }
  }
}
