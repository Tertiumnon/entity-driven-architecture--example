/**
 * Comment Entity Types (Frontend)
 */

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentPublic extends Comment {}

export interface CommentCreateDto {
  content: string;
}

export interface CommentUpdateDto {
  content: string;
}

export interface CommentResponseDto {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
  createdAt: Date;
  updatedAt: Date;
}
