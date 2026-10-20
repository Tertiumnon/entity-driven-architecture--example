# Install

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
