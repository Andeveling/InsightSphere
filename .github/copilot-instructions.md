---
applyTo: "**"
---
# Copilot Instructions for InsightSphere

## Project Overview
InsightSphere is a Next.js 15 team activity platform for exploring HIGH5 strengths methodology. The application helps teams discover their collective strengths through individual assessments and team analytics.

**Key Architecture**: Next.js App Router + NextAuth.js v5 + Prisma ORM + SQLite + shadcn/ui components

## Essential Commands
```bash
# Development workflow
pnpm dev                    # Start dev server with Turbopack
pnpm db:push               # Push schema changes to database
pnpm db:seed               # Seed with HIGH5 data + test users
pnpm db:studio             # Open Prisma Studio for data inspection
pnpm db:reset              # Reset and reseed database

# VS Code tasks available via Ctrl+Shift+P → "Tasks: Run Task"
# Pre-configured for all database operations and dev workflows
```

## Data Architecture

### Core Domain Model (HIGH5 System)
- **4 Domains**: Doing, Feeling, Motivating, Thinking
- **20 Strengths**: 5 per domain (e.g., Deliverer, Coach, Commander, Brainstormer)
- **Assessment Results**: UserStrength many-to-many relationship
- **Team Organization**: Users belong to teams, with strength composition analysis

### Database Schema Patterns
```typescript
// Always include related data for user queries
const user = await prisma.user.findUnique({
  include: {
    team: true,
    userStrengths: {
      include: {
        strength: { include: { domain: true } }
      }
    }
  }
})
```

## Authentication Architecture

### NextAuth.js v5 Configuration
- **File Split**: `auth.config.ts` (main config) → `src/auth.ts` (exports)
- **Strategy**: JWT sessions with credentials provider
- **Route Protection**: Middleware-based via `middleware.ts`
- **Protected Routes**: `/dashboard`, `/profile`, `/team`, `/game`

### Authentication Patterns
```typescript
// Always validate credentials with Zod schema
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// JWT/Session callbacks required for proper user data flow
callbacks: {
  jwt({ token, user }) { /* populate token */ },
  session({ session, token }) { /* populate session */ }
}
```

## Component Architecture

### UI Component System
- **Base**: shadcn/ui components in `src/components/ui/`
- **Providers**: Auth + Theme providers wrap the app
- **Layout**: App Router with protected dashboard layout
- **Forms**: React Hook Form + Zod validation

### Authentication Components
- Login form handles credentials with server actions
- Auth provider wraps entire app for session access
- Route protection via middleware, not component-level guards

## Development Workflows

### Database Operations
1. Schema changes → `pnpm db:push` (development)
2. Always reseed after schema changes → `pnpm db:seed`
3. Use Prisma Studio for data inspection and debugging
4. Test users available: john.doe@example.com / password123 (+ 5 others)

### HIGH5 Data Integration
- Seed contains official HIGH5 methodology (4 domains, 20 strengths)
- Spanish descriptions and official categorization
- User assessments link to predefined strengths, not custom input

### VS Code Integration
- Pre-configured tasks for all common operations
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Problem matchers for build errors

## Critical Patterns

### Prisma Relations
Always include nested relations for complete user data:
```typescript
// User queries need full strength context
include: {
  userStrengths: {
    include: { strength: { include: { domain: true } } }
  }
}
```

### Session Management
- JWT strategy required for credentials provider
- Custom session/JWT callbacks mandatory for user data persistence
- Type augmentation in `types/next-auth.d.ts` for TypeScript support

### Environment Configuration
- `AUTH_SECRET` required (generate with `npx auth secret`)
- SQLite database file-based (`file:./dev.db`)
- Development uses `.env.local` for secrets

### Common Pitfalls
- NextAuth v5 beta requires explicit JWT strategy declaration
- Credentials provider needs both `credentials` config and `authorize` function
- Database seed data is in Spanish - maintain language consistency
- Always include domain relations when querying strengths

### Change logging
- Each time you generate code, note the changes in the `CHANGELOG.md` file.
- Follow semantic versioning guidelines.
- Include date and description of changes.
- Follow instructions in `.github/instructions/changelog.instructions.md` for consistency.