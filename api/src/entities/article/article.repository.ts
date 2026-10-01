/**
 * Article Repository
 * Data access layer - handles all article storage/retrieval
 */

import { mockArticles } from './article.mock';
import type { Article } from './article.types';

export interface IArticleRepository {
  findById(id: number): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  findAll(): Promise<Article[]>;
  findByAuthorId(authorId: number): Promise<Article[]>;
  findPublished(limit?: number, offset?: number): Promise<Article[]>;
  save(article: Article): Promise<Article>;
  delete(id: number): Promise<boolean>;
}

export class ArticleRepository implements IArticleRepository {
  private articles: Article[] = JSON.parse(JSON.stringify(mockArticles));
  private nextId = Math.max(...this.articles.map((a) => a.id)) + 1;

  /**
   * Find article by ID
   */
  async findById(id: number): Promise<Article | null> {
    return this.articles.find((a) => a.id === id) || null;
  }

  /**
   * Find article by slug
   */
  async findBySlug(slug: string): Promise<Article | null> {
    return this.articles.find((a) => a.slug === slug) || null;
  }

  /**
   * Find all articles
   */
  async findAll(): Promise<Article[]> {
    return [...this.articles];
  }

  /**
   * Find articles by author ID
   */
  async findByAuthorId(authorId: number): Promise<Article[]> {
    return this.articles.filter((a) => a.authorId === authorId);
  }

  /**
   * Find published articles with pagination
   */
  async findPublished(limit = 10, offset = 0): Promise<Article[]> {
    const published = this.articles.filter((a) => a.status === 'published');
    return published.slice(offset, offset + limit);
  }

  /**
   * Save article (insert or update)
   */
  async save(article: Article): Promise<Article> {
    const index = this.articles.findIndex((a) => a.id === article.id);

    if (index !== -1) {
      this.articles[index] = article;
    } else {
      article.id = this.nextId++;
      this.articles.push(article);
    }

    return article;
  }

  /**
   * Delete article by ID
   */
  async delete(id: number): Promise<boolean> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.articles.splice(index, 1);
      return true;
    }
    return false;
  }
}
