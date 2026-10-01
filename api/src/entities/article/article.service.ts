/**
 * Article Service
 * Business logic layer - validation, transformation, authorization
 * Delegates all data access to repository
 */

import { ArticleRepository } from './article.repository';
import {
  ARTICLE_CONSTRAINTS,
  ARTICLE_VALIDATION_MESSAGES,
} from './article.constants';
import type {
  Article,
  ArticleCreateDto,
  ArticlePublic,
  ArticleUpdateDto,
} from './article.types';

export class ArticleService {
  private repository = new ArticleRepository();

  /**
   * Find articles with optional filters
   */
  async find(filters?: {
    authorId?: number;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<ArticlePublic[]> {
    let results = await this.repository.findAll();

    if (filters?.authorId) {
      results = results.filter((a) => a.authorId === filters.authorId);
    }

    if (filters?.status) {
      results = results.filter((a) => a.status === filters.status);
    }

    if (filters?.limit) {
      const offset = filters?.offset || 0;
      results = results.slice(offset, offset + filters.limit);
    }

    return results.map((a) => this._toPublic(a));
  }

  /**
   * Get article by ID
   */
  async get(id: number): Promise<Article> {
    const article = await this.repository.findById(id);
    if (!article) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.ARTICLE_NOT_FOUND);
    }
    return article;
  }

  /**
   * Get article by slug
   */
  async getBySlug(slug: string): Promise<Article> {
    const article = await this.repository.findBySlug(slug);
    if (!article) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.ARTICLE_NOT_FOUND_BY_SLUG);
    }
    return article;
  }

  /**
   * Get all published articles
   */
  async getPublished(limit = 10, offset = 0): Promise<ArticlePublic[]> {
    const articles = await this.repository.findPublished(limit, offset);
    return articles.map((a) => this._toPublic(a));
  }

  /**
   * Create new article
   */
  async create(dto: ArticleCreateDto, authorId: number): Promise<ArticlePublic> {
    this._validateCreateDto(dto);

    const slug = this._generateSlug(dto.title);
    const existing = await this.repository.findBySlug(slug);
    if (existing) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.SLUG_ALREADY_EXISTS);
    }

    const article: Article = {
      id: 0, // Repository will assign ID
      title: dto.title.trim(),
      slug,
      content: dto.content.trim(),
      excerpt: dto.excerpt ? dto.excerpt.trim() : this._generateExcerpt(dto.content),
      authorId,
      status: dto.status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt:
        (dto.status || 'draft') === 'published' ? new Date() : undefined,
    };

    const saved = await this.repository.save(article);
    return this._toPublic(saved);
  }

  /**
   * Update article
   */
  async update(
    id: number,
    dto: ArticleUpdateDto,
    authorId: number
  ): Promise<ArticlePublic> {
    const article = await this.get(id);

    if (article.authorId !== authorId) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.UNAUTHORIZED);
    }

    this._validateUpdateDto(dto);

    if (dto.title) {
      article.title = dto.title.trim();
    }

    if (dto.content) {
      article.content = dto.content.trim();
    }

    if (dto.excerpt) {
      article.excerpt = dto.excerpt.trim();
    }

    if (dto.status && dto.status !== article.status) {
      article.status = dto.status;
      if (dto.status === 'published' && !article.publishedAt) {
        article.publishedAt = new Date();
      }
    }

    article.updatedAt = new Date();

    const saved = await this.repository.save(article);
    return this._toPublic(saved);
  }

  /**
   * Delete article
   */
  async delete(id: number, authorId: number): Promise<boolean> {
    const article = await this.get(id);

    if (article.authorId !== authorId) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.UNAUTHORIZED);
    }

    return this.repository.delete(id);
  }

  /**
   * Get user's articles
   */
  async getUserArticles(
    authorId: number,
    limit = 10,
    offset = 0
  ): Promise<ArticlePublic[]> {
    const articles = await this.repository.findByAuthorId(authorId);
    return articles.slice(offset, offset + limit).map((a) => this._toPublic(a));
  }

  /**
   * Private helper: convert to public article (excludes full content)
   */
  private _toPublic(article: Article): ArticlePublic {
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      authorId: article.authorId,
      status: article.status,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      publishedAt: article.publishedAt,
    };
  }

  /**
   * Private helper: validate create DTO
   */
  private _validateCreateDto(dto: ArticleCreateDto): void {
    if (!dto.title || dto.title.trim().length === 0) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_REQUIRED);
    }

    if (dto.title.length < ARTICLE_CONSTRAINTS.MIN_TITLE_LENGTH) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_TOO_SHORT);
    }

    if (dto.title.length > ARTICLE_CONSTRAINTS.MAX_TITLE_LENGTH) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_TOO_LONG);
    }

    if (!dto.content || dto.content.trim().length === 0) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_REQUIRED);
    }

    if (dto.content.length < ARTICLE_CONSTRAINTS.MIN_CONTENT_LENGTH) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_TOO_SHORT);
    }

    if (dto.content.length > ARTICLE_CONSTRAINTS.MAX_CONTENT_LENGTH) {
      throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_TOO_LONG);
    }

    if (dto.excerpt && dto.excerpt.length > 0) {
      if (dto.excerpt.length < ARTICLE_CONSTRAINTS.MIN_EXCERPT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.EXCERPT_TOO_SHORT);
      }

      if (dto.excerpt.length > ARTICLE_CONSTRAINTS.MAX_EXCERPT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.EXCERPT_TOO_LONG);
      }
    }
  }

  /**
   * Private helper: validate update DTO
   */
  private _validateUpdateDto(dto: ArticleUpdateDto): void {
    if (dto.title !== undefined) {
      if (dto.title.trim().length === 0) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_REQUIRED);
      }

      if (dto.title.length < ARTICLE_CONSTRAINTS.MIN_TITLE_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_TOO_SHORT);
      }

      if (dto.title.length > ARTICLE_CONSTRAINTS.MAX_TITLE_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.TITLE_TOO_LONG);
      }
    }

    if (dto.content !== undefined) {
      if (dto.content.trim().length === 0) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_REQUIRED);
      }

      if (dto.content.length < ARTICLE_CONSTRAINTS.MIN_CONTENT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_TOO_SHORT);
      }

      if (dto.content.length > ARTICLE_CONSTRAINTS.MAX_CONTENT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.CONTENT_TOO_LONG);
      }
    }

    if (dto.excerpt !== undefined && dto.excerpt.length > 0) {
      if (dto.excerpt.length < ARTICLE_CONSTRAINTS.MIN_EXCERPT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.EXCERPT_TOO_SHORT);
      }

      if (dto.excerpt.length > ARTICLE_CONSTRAINTS.MAX_EXCERPT_LENGTH) {
        throw new Error(ARTICLE_VALIDATION_MESSAGES.EXCERPT_TOO_LONG);
      }
    }
  }

  /**
   * Private helper: generate slug from title
   */
  private _generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-')
      .slice(0, ARTICLE_CONSTRAINTS.MAX_SLUG_LENGTH);
  }

  /**
   * Private helper: generate excerpt from content
   */
  private _generateExcerpt(content: string): string {
    const words = content.split(/\s+/).slice(0, 20).join(' ');
    return words.slice(0, ARTICLE_CONSTRAINTS.MAX_EXCERPT_LENGTH - 3) + '...';
  }
}
