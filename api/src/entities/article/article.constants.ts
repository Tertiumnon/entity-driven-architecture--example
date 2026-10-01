/**
 * Article Constants
 */

export const ARTICLE_CONSTRAINTS = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 200,
  MIN_CONTENT_LENGTH: 10,
  MAX_CONTENT_LENGTH: 50000,
  MIN_EXCERPT_LENGTH: 5,
  MAX_EXCERPT_LENGTH: 500,
  MIN_SLUG_LENGTH: 3,
  MAX_SLUG_LENGTH: 200,
} as const;

export const ARTICLE_REGEX = {
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const ARTICLE_VALIDATION_MESSAGES = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_TOO_SHORT: `Title must be at least ${ARTICLE_CONSTRAINTS.MIN_TITLE_LENGTH} characters`,
  TITLE_TOO_LONG: `Title must be at most ${ARTICLE_CONSTRAINTS.MAX_TITLE_LENGTH} characters`,

  CONTENT_REQUIRED: 'Content is required',
  CONTENT_TOO_SHORT: `Content must be at least ${ARTICLE_CONSTRAINTS.MIN_CONTENT_LENGTH} characters`,
  CONTENT_TOO_LONG: `Content must be at most ${ARTICLE_CONSTRAINTS.MAX_CONTENT_LENGTH} characters`,

  EXCERPT_TOO_SHORT: `Excerpt must be at least ${ARTICLE_CONSTRAINTS.MIN_EXCERPT_LENGTH} characters`,
  EXCERPT_TOO_LONG: `Excerpt must be at most ${ARTICLE_CONSTRAINTS.MAX_EXCERPT_LENGTH} characters`,

  SLUG_INVALID: 'Slug must contain only lowercase letters, numbers, and hyphens',
  SLUG_TOO_SHORT: `Slug must be at least ${ARTICLE_CONSTRAINTS.MIN_SLUG_LENGTH} characters`,
  SLUG_TOO_LONG: `Slug must be at most ${ARTICLE_CONSTRAINTS.MAX_SLUG_LENGTH} characters`,

  STATUS_INVALID: 'Status must be one of: draft, published, archived',

  ARTICLE_NOT_FOUND: 'Article not found',
  ARTICLE_NOT_FOUND_BY_SLUG: 'Article with this slug not found',
  SLUG_ALREADY_EXISTS: 'An article with this slug already exists',
  UNAUTHORIZED: 'You do not have permission to modify this article',
} as const;

export const ARTICLE_DB_TABLE = 'articles' as const;
