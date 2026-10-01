/**
 * Mock Article Data
 */

import type { Article, ArticlePublic } from './article.types';

const now = new Date();

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Getting Started with Entity-Driven Architecture',
    slug: 'getting-started-entity-driven-architecture',
    content:
      'Entity-Driven Architecture is a powerful approach to organizing your codebase around domain entities. This article explores the core principles and benefits.\n\nIn this comprehensive guide, we will cover:\n1. What is Entity-Driven Architecture\n2. Core Principles and Patterns\n3. Implementing in Real Projects\n4. Common Pitfalls and Solutions',
    excerpt:
      'Learn the fundamentals of Entity-Driven Architecture and how to organize your codebase around domain entities.',
    authorId: 1,
    status: 'published',
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    publishedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
  },
  {
    id: 2,
    title: 'TypeScript Best Practices for Large Projects',
    slug: 'typescript-best-practices-large-projects',
    content:
      'When working with TypeScript in large-scale projects, it\'s crucial to follow best practices for maintainability and type safety.\n\nKey topics:\n- Strict mode configuration\n- Type definitions organization\n- Module structure\n- Error handling patterns',
    excerpt:
      'Discover essential TypeScript practices that will help you maintain large codebases with confidence.',
    authorId: 2,
    status: 'published',
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publishedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 3,
    title: 'Building Real-time Applications with Bun',
    slug: 'building-realtime-applications-bun',
    content:
      'Bun is a modern JavaScript runtime that makes building real-time applications a breeze. Learn how to leverage its powerful features.',
    excerpt: 'Explore how to build performant real-time applications using Bun and its ecosystem.',
    authorId: 1,
    status: 'draft',
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
];

export const mockArticle: Article = mockArticles[0];

export const mockArticlePublic: ArticlePublic = {
  id: mockArticle.id,
  title: mockArticle.title,
  slug: mockArticle.slug,
  excerpt: mockArticle.excerpt,
  authorId: mockArticle.authorId,
  status: mockArticle.status,
  createdAt: mockArticle.createdAt,
  updatedAt: mockArticle.updatedAt,
  publishedAt: mockArticle.publishedAt,
};
