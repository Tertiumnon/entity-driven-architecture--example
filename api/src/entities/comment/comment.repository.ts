/**
 * Comment Repository
 * Data access layer - handles all comment storage/retrieval
 */

import { mockComments } from './comment.mock';
import type { Comment } from './comment.types';

export interface ICommentRepository {
  findById(id: number): Promise<Comment | null>;
  findByArticleId(articleId: number): Promise<Comment[]>;
  findByAuthorId(authorId: number): Promise<Comment[]>;
  save(comment: Comment): Promise<Comment>;
  delete(id: number): Promise<boolean>;
}

export class CommentRepository implements ICommentRepository {
  private comments: Comment[] = JSON.parse(JSON.stringify(mockComments));
  private nextId = Math.max(...this.comments.map((c) => c.id)) + 1;

  async findById(id: number): Promise<Comment | null> {
    return this.comments.find((c) => c.id === id) || null;
  }

  async findByArticleId(articleId: number): Promise<Comment[]> {
    return this.comments.filter((c) => c.articleId === articleId);
  }

  async findByAuthorId(authorId: number): Promise<Comment[]> {
    return this.comments.filter((c) => c.authorId === authorId);
  }

  async save(comment: Comment): Promise<Comment> {
    const index = this.comments.findIndex((c) => c.id === comment.id);

    if (index !== -1) {
      this.comments[index] = comment;
    } else {
      comment.id = this.nextId++;
      this.comments.push(comment);
    }

    return comment;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.comments.splice(index, 1);
      return true;
    }
    return false;
  }
}
