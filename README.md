# Blog Platform - Entity-Driven Architecture

Blog platform built with entity-driven architecture: Bun and Elysia backend, SolidJS frontend.

A complete, working implementation of entity-driven development principles. Users create and manage articles, readers browse and comment.

**Tech Stack**:
- Backend: Bun + Elysia (TypeScript server)
- Frontend: SolidJS + Vite (reactive UI)
- Structure: Monorepo with Bun workspaces

---

## Learn Entity-Driven Development

**New to entity-driven development?**

1. **[Entity-Driven Architecture](https://github.com/Tertiumnon/entity-driven-architecture)** — Complete documentation
2. **[What is an Entity?](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/01-introduction/what-is-entity.md)** — Foundational concepts
3. **This codebase** — Practical working examples

---

## Examples

### 01. Basic Structure

**What you'll learn**: Foundation of entity-driven architecture

**Demonstrates:**
- Basic entity definition (User interface)
- Service with CRUD operations (UserService)
- Component using entity (UserCard)
- Page that combines components (Users)
- Unit tests for service
- Mock data setup

**Related theory:**
- [What is an Entity?](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/01-introduction/what-is-entity.md)
- [Backend Patterns](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/04-backend-patterns/)

---

### 02. E-Commerce

**What you'll learn**: Real-world application with multiple entities, relationships, and complex logic

**Demonstrates:**
- Multiple entities (User, Product, Order, Cart)
- Entity relationships (Order has UserID, ProductID)
- DTOs separate from domain models
- Complex service operations
- Component composition and reusability
- State management across pages
- Error handling and validation
- Full CRUD for each entity

**Related theory:**
- [Flat Entities](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/03-entity-structure/flat-entities.md)
- [DTO vs Domain Model](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/03-entity-structure/dto-vs-domain.md)
- [Folder Structure](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/06-architecture/folder-structure.md)

---

### 03. Blog Platform

**What you'll learn**: Content management with complex relationships

**Entities:**
- User (author)
- Post (article)
- Comment (discussion)
- Tag (categorization)

**Related theory:**
- [Relationships & References](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/03-entity-structure/relationships.md)

---

### 04. Task Management

**What you'll learn**: Hierarchical entities with complex status workflows

**Entities:**
- Workspace (container)
- User (team member)
- Project (organization)
- Task (unit of work)
- Label (categorization)

---

## Key Architectural Patterns

### Folder Structure (4 Levels)

```
src/
├── core/          ← Level 1: Shared utilities
│   ├── http/
│   ├── router/
│   └── storage/
│
├── entities/      ← Level 2: Business logic
│   ├── user/
│   ├── product/
│   └── order/
│
├── components/    ← Level 3: Reusable UI
│   ├── user-card/
│   └── product-list/
│
└── pages/         ← Level 4: Full pages
    ├── products/
    └── checkout/
```

**Max 3 folder levels** — Prevents deep nesting and complexity

### Entity Collocation

All related files in one folder:

```
entities/user/
├── user.interface.ts      ← Entity definition
├── user.dto.ts            ← Transfer objects
├── user.service.ts        ← Business logic
├── user.service.spec.ts   ← Tests
├── user.mockup.ts         ← Test data
└── user.constant.ts       ← Constants
```

### Service Pattern

Every entity has a service with standard operations:

```typescript
class UserService {
  async find(filters?: Filter[]): Promise<User[]>
  async get(id: number): Promise<User>
  async create(dto: UserCreateDto): Promise<User>
  async update(id: number, dto: UserUpdateDto): Promise<User>
  async delete(id: number): Promise<boolean>
}
```

### Flat Entities

Domain models have no nested objects:

```typescript
// ✅ GOOD: Flat domain model
interface User {
  id: number;
  age: number;
  bio: string;
}

// ✅ OK in DTOs only (max 1-2 levels)
interface UserProfileResponseDto {
  user: { id: number; name: string };
  profile: { age: number; bio: string };
}
```

---

## Related Documentation

**Learn the theory:**
- [entity-driven-architecture](https://github.com/Tertiumnon/entity-driven-architecture) — Complete documentation
- [Naming Conventions](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/02-naming-conventions/)
- [Architecture Guide](https://github.com/Tertiumnon/entity-driven-architecture/blob/main/docs/06-architecture/)

---

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).
