/**
 * Mock Comment Data
 */

import type { Comment } from './comment.types';

const now = new Date();

export const mockComments: Comment[] = [
  {
    id: 1,
    content: 'This is a great article! Really helped me understand the architecture better.',
    authorId: 2,
    articleId: 1,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    content: 'Thanks for sharing these insights. Looking forward to more articles on this topic.',
    authorId: 1,
    articleId: 1,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    content:
      'The examples provided were very practical. I am already using this approach in my projects.',
    authorId: 2,
    articleId: 2,
    createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
  },
];

export const mockComment: Comment = mockComments[0];
