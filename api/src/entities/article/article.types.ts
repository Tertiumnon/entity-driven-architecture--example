/**
 * Article Entity Types
 */

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: number;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ArticlePublic extends Omit<Article, 'content'> {
  excerpt: string;
}

export interface ArticleDetail extends Article {
  // Full article with all details for single-article view
}

export interface ArticleCreateDto {
  title: string;
  content: string;
  excerpt?: string;
  status?: ArticleStatus;
}

export interface ArticleUpdateDto {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: ArticleStatus;
}

export interface ArticlePublishDto {
  status: 'published';
}

export interface ArticleResponseDto {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  authorId: number;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
