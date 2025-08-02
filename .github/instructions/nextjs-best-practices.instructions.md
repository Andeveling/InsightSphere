---
applyTo: '**'
---

# Next.js 15 Best Practices for InsightSphere (2025)

_Last updated: August 2025_

This document summarizes the latest, authoritative best practices for building, structuring, and maintaining Next.js applications in the InsightSphere project. It is intended for use by LLMs and developers to ensure code quality, maintainability, and scalability.

---

## 1. Project Structure & Organization

- **Use the `app/` directory** (App Router) for all new projects. Prefer it over the legacy `pages/` directory.
- **Top-level folders:**
  - `app/` — Routing, layouts, pages, and route handlers
  - `public/` — Static assets (images, fonts, etc.)
  - `lib/` — Shared utilities, API clients, and logic
  - `components/` — Reusable UI components (see below)
  - `contexts/` — React context providers
  - `styles/` — Global and modular stylesheets
  - `hooks/` — Custom React hooks
  - `types/` — TypeScript type definitions
  - `actions/` — All server actions (next-safe-action)
- **Colocation:** Place files (components, styles, tests) near where they are used, but avoid deeply nested structures.
- **Route Groups:** Use parentheses (e.g., `(admin)`) to group routes without affecting the URL path.
- **Private Folders:** Prefix with `_` (e.g., `_internal`) to opt out of routing and signal implementation details.
- **Feature Folders:** For large apps, group by feature (e.g., `app/dashboard/`, `app/auth/`).
- **Use `src/`**: Place all source code in `src/` to separate from config files.

## 2. UI Component Architecture

- **UI components (`components/ui/`)** must be shadcn/ui only. No business logic, no direct data fetching, no Prisma queries.
- **Feature components** (e.g., `components/profile/`) handle business logic, but must fetch data via server actions, never Prisma directly.
- **Providers** (e.g., `components/providers/`) are for context/state only.
- **Layout components** (e.g., `components/layout/`) are for page structure and navigation.
- **All UI must be built with shadcn/ui, Tailwind CSS, and Lucide icons.**
- **Never mix business logic and UI in the same file.**
- **Use TypeScript strict mode and explicit prop interfaces.**

## 3. Server and Client Component Integration (App Router)

- **Default to Server Components.** Use Client Components only for interactivity, hooks, or browser APIs.
- **Never use `next/dynamic` with `{ ssr: false }` inside a Server Component.**
- **Move all client-only logic/UI into a dedicated Client Component (`'use client'`).**
- **Import and use Client Components directly in Server Components.**

## 4. Data Layer & Actions

- **All data fetching and mutations must go through server actions in `src/actions/` using next-safe-action.**
- **Never query Prisma directly in UI components or hooks.**
- **Validate all inputs with Zod in actions.**
- **Infer types from actions using `InferSafeActionFnResult`.**
- **Consume actions in the client using hooks like `useAction` or `useOptimisticAction`.**
- **Migration:** Gradually refactor legacy code to use server actions and remove direct Prisma usage from UI.

## 5. Naming Conventions

- **Folders:** `kebab-case` (e.g., `user-profile/`)
- **Files:** `PascalCase` for components, `kebab-case` for utilities/hooks, `kebab-case` for static assets
- **Components in file:** `PascalCase` (e.g., ` export const UserProfile = () => { ... }` and  file `kebab-case` like `user-profile.tsx`)
- **Variables/Functions:** `camelCase`
- **Types/Interfaces:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

## 6. Styling & Theming

- **Use Tailwind CSS for all styling.**
- **Use the `cn()` utility for conditional classes.**
- **Use CSS variables for theme consistency.**
- **Do not use global styles except for resets and base theme.**

## 7. Forms & Validation

- **Use React Hook Form + Zod for all forms.**
- **Validate on both client and server.**
- **Submit forms via server actions, not direct API calls.**

## 8. Testing & Documentation

- **Co-locate tests with components.**
- **Use Jest, React Testing Library, or Playwright.**
- **Write clear README and code comments.**
- **Document public APIs and components.**

## 9. Security & Performance

- **Sanitize all user input.**
- **Use HTTPS in production.**
- **Set secure HTTP headers.**
- **Use Suspense and loading states for async data.**
- **Avoid large client bundles; keep most logic in Server Components.**

## 10. Migration Guidelines

- **Move business logic to server actions.**
- **Extract complex state to custom hooks.**
- **Replace direct Prisma queries with actions.**
- **Ensure proper Server/Client component boundaries.**
- **Update to use proper TypeScript inference from actions.**

## 11. Example: Well-structured Component

```tsx
// components/profile/ProfileCard.tsx
import { getUserProfile } from "@/actions/user.actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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

> **Note:** This architecture follows Next.js 15 App Router patterns, leverages React Server Components by default, and uses Client Components only when necessary for interactivity. All UI is built with shadcn/ui and Tailwind CSS. Data is always fetched via server actions, never directly from Prisma in the UI.

