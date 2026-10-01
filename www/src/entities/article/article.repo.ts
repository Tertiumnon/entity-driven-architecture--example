/**
 * Article Repository (Frontend)
 * HTTP data access layer - communicates with backend Article API
 */

import { HttpService } from '../../core/http/http.client';
import type { Article, ArticleCreateDto, ArticlePublic, ArticleUpdateDto } from './article.types';

export class ArticleRepository {
  /**
   * Get published articles (list view)
   */
  static async getPublished(limit = 10, offset = 0): Promise<ArticlePublic[]> {
    return HttpService.get(`/articles?limit=${limit}&offset=${offset}`);
  }

  /**
   * Get article by slug (detail view)
   */
  static async getBySlug(slug: string): Promise<Article> {
    return HttpService.get<Article>(`/articles/${slug}`);
  }

  /**
   * Create new article
   */
  static async create(dto: ArticleCreateDto): Promise<ArticlePublic> {
    return HttpService.post<ArticlePublic>('/articles', dto);
  }

  /**
   * Update article
   */
  static async update(articleId: number, dto: ArticleUpdateDto): Promise<ArticlePublic> {
    return HttpService.patch<ArticlePublic>(`/articles/${articleId}`, dto);
  }

  /**
   * Delete article
   */
  static async delete(articleId: number): Promise<void> {
    return HttpService.delete(`/articles/${articleId}`);
  }

  /**
   * Get user's articles
   */
  static async getUserArticles(userId: number, limit = 10, offset = 0) {
    return HttpService.get(`/users/${userId}/articles?limit=${limit}&offset=${offset}`);
  }
}
