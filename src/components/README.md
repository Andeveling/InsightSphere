# Components: Architecture and Best Practices

## Overview

This folder contains all UI components for InsightSphere, structured following Next.js 15 App Router best practices with shadcn/ui as the design system foundation. The architecture prioritizes component reusability, type safety, and clear separation of concerns.

## Technology Stack

- **Next.js 15.4.4** with App Router and React 19
- **shadcn/ui** with Radix UI primitives
- **Tailwind CSS v4** for styling
- **TypeScript 5.8** with strict mode
- **Lucide React** for icons
- **next-safe-action** for server interactions
- **React Hook Form + Zod** for form handling

## Folder Structure

```
components/
├── ui/                    # shadcn/ui components only
├── layout/               # Layout-specific components
├── profile/              # Feature-specific components
├── providers/            # Context providers
├── app-sidebar.tsx       # Global components
└── README.md            # This file
```

## Component Types & Guidelines

### 1. UI Components (`/ui/`)

**Purpose**: Only shadcn/ui components and their variants live here.

**Rules**:
- ✅ **DO**: Install shadcn components here via CLI (`npx shadcn add button`)
- ✅ **DO**: Extend shadcn components with variants using `class-variance-authority`
- ❌ **DON'T**: Create custom business logic components here
- ❌ **DON'T**: Add application-specific components

**Example**:
```tsx
// ✅ Good: ui/button.tsx (shadcn component)
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

// ❌ Bad: ui/profile-form.tsx (business logic component)
```

### 2. Feature Components (`/profile/`, `/dashboard/`, etc.)

**Purpose**: Business logic components grouped by feature/domain.

**Guidelines**:
- Use Server Components by default
- Add `"use client"` only when necessary (hooks, events, browser APIs)
- Import UI components from `@/components/ui`
- Use typed props with TypeScript interfaces
- Handle data through actions, not direct Prisma queries

**Example**:
```tsx
// ✅ Good: Server Component with proper data handling
import { getUserWithStrengths } from "@/actions/user.actions"
import { Card } from "@/components/ui/card"

interface ProfileCardProps {
  userId: string
}

export async function ProfileCard({ userId }: ProfileCardProps) {
  const user = await getUserWithStrengths({ userId })
  
  return (
    <Card>
      {/* UI content */}
    </Card>
  )
}
```

### 3. Layout Components (`/layout/`)

**Purpose**: Reusable layout patterns and page structure components.

**Examples**: Headers, sidebars, breadcrumbs, page containers

### 4. Provider Components (`/providers/`)

**Purpose**: React Context providers for global state management.

**Current providers**:
- `AuthProvider`: NextAuth.js session management
- `ThemeProvider`: next-themes integration

## Best Practices

### Component Creation Rules

1. **Create a component when**:
   - UI pattern is reused 2+ times
   - Section is complex or self-contained
   - Improves readability or testability

2. **Component boundaries**:
   - Keep components focused on single responsibility
   - Prefer composition over large monolithic components
   - Extract complex logic to custom hooks

### Naming Conventions

- **Components**: `PascalCase` (e.g., `UserProfileCard.tsx`)
- **Hooks**: `camelCase` with `use` prefix (e.g., `useStrengthRankings.ts`)
- **Props interfaces**: `ComponentNameProps` (e.g., `UserProfileCardProps`)
- **Files**: Match component name exactly

### Type Safety

```tsx
// ✅ Prefer explicit prop interfaces
interface ButtonProps {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

// ✅ Use InferSafeActionFnResult for action data
import type { InferSafeActionFnResult } from "next-safe-action"
import { getUserWithStrengths } from "@/actions/user.actions"

type UserResult = InferSafeActionFnResult<typeof getUserWithStrengths>

interface ProfileProps {
  user: UserResult["data"]
}
```

### Server vs Client Components

**Server Components (Default)**:
- Data fetching
- Static UI rendering
- SEO-friendly content
- Performance-critical sections

**Client Components (`"use client"`)**:
- Interactive elements (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Third-party client libraries

### Data Handling

```tsx
// ❌ Never query Prisma directly in components
import { prisma } from "@/lib/prisma"

// ✅ Always use server actions
import { getUserWithStrengths } from "@/actions/user.actions"

// ✅ For client-side interactions, use hooks
import { useAction } from "next-safe-action/hooks"
```

### Styling Guidelines

```tsx
// ✅ Use Tailwind classes with cn() utility
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  variant === "primary" && "primary-styles",
  className
)} />

// ✅ Use CSS variables for theme consistency
<Card className="bg-card border-border text-card-foreground" />
```

### Form Handling

```tsx
// ✅ Use React Hook Form + Zod + Server Actions
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { submitProfile } from "@/actions/profile.actions"

const form = useForm({
  resolver: zodResolver(profileSchema),
})

const { execute } = useAction(submitProfile)
```

## File Organization

### Co-location Strategy
- Keep related files close to where they're used
- Use index files for clean imports
- Group by feature when components grow large

### Import Organization
```tsx
// 1. React and Next.js imports
import { useState } from "react"
import { useRouter } from "next/navigation"

// 2. Third-party libraries
import { toast } from "sonner"

// 3. Internal imports (actions, components, utils)
import { submitProfile } from "@/actions/profile.actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 4. Types
import type { UserProfileProps } from "./types"
```

## Migration Guidelines

When refactoring existing components:

1. **Move business logic to server actions**
2. **Extract complex state to custom hooks**
3. **Replace direct Prisma queries with actions**
4. **Ensure proper Server/Client component boundaries**
5. **Update to use proper TypeScript inference from actions**

## Examples

### ✅ Well-structured component
```tsx
// components/profile/profile-card.tsx
import { getUserProfile } from "@/actions/user.actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfileCardProps {
  userId: string
  className?: string
}

export async function ProfileCard({ userId, className }: ProfileCardProps) {
  const profile = await getUserProfile({ userId })
  
  if (!profile.data) return null
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{profile.data.name}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {profile.data.strengths.map((strength) => (
            <Badge key={strength.id} variant="secondary">
              {strength.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

> **Note**: This architecture follows Next.js 15 App Router patterns, leveraging React Server Components by default and using Client Components only when necessary for interactivity.
