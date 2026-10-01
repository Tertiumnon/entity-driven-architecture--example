/**
 * User Repository
 * Data access layer - handles all user storage/retrieval
 */

import { mockUsers } from './user.mock';
import type { User } from './user.types';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  private users: User[] = JSON.parse(JSON.stringify(mockUsers));
  private nextId = Math.max(...this.users.map((u) => u.id)) + 1;

  async findById(id: number): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async save(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    } else {
      user.id = this.nextId++;
      this.users.push(user);
    }

    return user;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
