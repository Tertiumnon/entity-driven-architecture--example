# Blog Platform - Entity-Driven Architecture

> **Real-world blog platform demonstrating entity-driven architecture with Bun + Elysia backend and SolidJS frontend.**

A complete, working implementation of entity-driven development principles. Users create and manage articles, readers browse and comment.

**Tech Stack**:
- Backend: Bun + Elysia (TypeScript server)
- Frontend: SolidJS + Vite (reactive UI)
- Structure: Monorepo with Bun workspaces

---

## Quick Start

### Prerequisites
- Bun (https://bun.sh)
- Node.js (for frontend tooling compatibility)

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Development Servers

```bash
# Terminal 1: Backend (runs on :3001)
bun backend:dev

# Terminal 2: Frontend (runs on :3000)
bun frontend:dev
```

### 3. Explore the Code

**Backend** (`packages/backend/src/`)
```
├── core/              ← Shared utilities (database, middleware, config)
├── entities/          ← Business logic (user, article, comment, tag)
│   └── user/
│       ├── user.types.ts       ← Interfaces and types
│       ├── user.constants.ts   ← Constants
│       ├── user.mock.ts        ← Mock data
│       ├── user.service.ts     ← Business logic
│       ├── user.repository.ts  ← Database access
│       └── user.test.ts        ← Tests
├── routes/            ← API endpoints (auth, users, articles, comments)
└── app.ts             ← Elysia app configuration
```

**Frontend** (`packages/frontend/src/`)
```
├── core/              ← Shared utilities (HTTP, state, router)
├── entities/          ← Business logic mirroring backend
├── components/        ← Reusable UI components
├── pages/             ← Full-page components
└── App.tsx            ← Root component
```

---

## Learn Entity-Driven Development

**New to entity-driven development?**

1. **[Know Your Entity](https://github.com/Tertium/know-your-entity)** — Complete documentation
2. **[What is an Entity?](https://github.com/Tertium/know-your-entity/blob/main/docs/01-introduction/what-is-entity.md)** — Foundational concepts
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
- [What is an Entity?](https://github.com/Tertium/know-your-entity/blob/main/docs/01-introduction/what-is-entity.md)
- [Service Layer Pattern](https://github.com/Tertium/know-your-entity/blob/main/docs/04-backend-patterns/service-layer.md)

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
- [Flat Entities](https://github.com/Tertium/know-your-entity/blob/main/docs/03-entity-structure/flat-entities.md)
- [DTO vs Domain Model](https://github.com/Tertium/know-your-entity/blob/main/docs/03-entity-structure/dto-vs-domain.md)
- [Folder Structure](https://github.com/Tertium/know-your-entity/blob/main/docs/06-architecture/folder-structure.md)

---

### 03. Blog Platform

**What you'll learn**: Content management with complex relationships

**Entities:**
- User (author)
- Post (article)
- Comment (discussion)
- Tag (categorization)

**Related theory:**
- [Relationships & References](https://github.com/Tertium/know-your-entity/blob/main/docs/03-entity-structure/relationships.md)

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

## Technology Stack

- **TypeScript** — Type safety and clarity
- **Vite** — Fast build and dev server
- **Vitest** — Fast unit testing
- **ESLint + Prettier** — Code quality and formatting
- **Vanilla HTML/CSS/JS** — No framework lock-in

---

## How to Run Examples

### Development

```bash
npm install
npm run dev
npm run test              # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
```

### Production Build

```bash
npm run build             # Compile and bundle
npm run preview           # Preview production build
```

### Code Quality

```bash
npm run type-check        # Check TypeScript types
npm run lint              # Check linting
npm run lint:fix          # Fix linting issues
```

---

## Related Documentation

**Learn the theory:**
- [know-your-entity](https://github.com/Tertium/know-your-entity) — Complete documentation
- [Naming Conventions](https://github.com/Tertium/know-your-entity/blob/main/docs/02-naming-conventions/)
- [Architecture Guide](https://github.com/Tertium/know-your-entity/blob/main/docs/06-architecture/)

---

## License

Internal use only — Tertium Development Team

**Last Updated**: 2026-06-29
