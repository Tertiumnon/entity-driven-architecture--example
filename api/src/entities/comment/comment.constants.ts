/**
 * Comment Constants
 */

export const COMMENT_CONSTRAINTS = {
  MIN_CONTENT_LENGTH: 1,
  MAX_CONTENT_LENGTH: 5000,
} as const;

export const COMMENT_VALIDATION_MESSAGES = {
  CONTENT_REQUIRED: 'Comment content is required',
  CONTENT_TOO_LONG: `Comment must be at most ${COMMENT_CONSTRAINTS.MAX_CONTENT_LENGTH} characters`,

  COMMENT_NOT_FOUND: 'Comment not found',
  ARTICLE_NOT_FOUND: 'Article not found',
  UNAUTHORIZED: 'You do not have permission to modify this comment',
} as const;

export const COMMENT_DB_TABLE = 'comments' as const;
