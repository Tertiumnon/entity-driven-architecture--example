/**
 * Mock User Data
 */

import { User, UserPublic } from './user.types';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'alice@example.com',
    username: 'alice',
    displayName: 'Alice Johnson',
    passwordHash: '$2b$10$mock_hash_1',
    bio: 'Tech enthusiast and writer',
    avatar: 'https://api.example.com/avatars/alice.jpg',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    email: 'bob@example.com',
    username: 'bob_smith',
    displayName: 'Bob Smith',
    passwordHash: '$2b$10$mock_hash_2',
    bio: 'Software developer',
    avatar: 'https://api.example.com/avatars/bob.jpg',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
];

export const mockUser: User = mockUsers[0];

export const mockUserPublic: UserPublic = {
  id: mockUser.id,
  email: mockUser.email,
  username: mockUser.username,
  displayName: mockUser.displayName,
  bio: mockUser.bio,
  avatar: mockUser.avatar,
  createdAt: mockUser.createdAt,
  updatedAt: mockUser.updatedAt,
};
