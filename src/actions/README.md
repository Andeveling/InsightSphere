# Actions: Usage and Best Practices with next-safe-action

## Purpose

Centralize all data access and mutation logic in **Server Actions** using [next-safe-action](https://next-safe-action.dev/), fully decoupling the UI from direct database queries (Prisma) and ensuring strict validation and typing with Zod.

## Rules and Best Practices

- **Do not query Prisma directly in UI components or hooks.**
- All data mutations and queries must be performed via Server Actions defined in this folder.
- Use the next-safe-action client (`createSafeActionClient`) to define your actions.
- Validate all inputs with Zod before executing any business logic.
- Input and output types are automatically inferred, ensuring safety and maintainability.
- Action results should be consumed in the client using hooks like `useAction` or `useOptimisticAction`.
- Migration should be progressive: prioritize moving data logic and validation to safe actions, gradually eliminating direct Prisma usage in the UI.

## Example: Defining a Safe Action

```ts
// actions/user.actions.ts
"use server";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";

const getUserSchema = z.object({
  userId: z.string().uuid(),
});

export const getUserWithStrengths = actionClient
  .inputSchema(getUserSchema)
  .action(async ({ parsedInput }) => {
    // Prisma query goes here
    // return { ... }
  });
```

## Example: Using an Action in the Client

```tsx
"use client";
import { getUserWithStrengths } from "@/actions/user.actions";
import { useAction } from "next-safe-action/hooks";

const { execute, result } = useAction(getUserWithStrengths);

useEffect(() => {
  execute({ userId: "..." });
}, []);
```

## Benefits

- **Security:** Strict validation with Zod.
- **Automatic typing:** Fewer errors and greater maintainability.
- **Decoupling:** UI does not depend on internal database structure.
- **Scalability:** Easy to migrate and maintain as the project grows.

## Migration

- Prioritize migrating queries and mutations to safe actions.
- Remove direct Prisma usage from UI components and hooks.
- Refactor hooks to consume only data from actions.

---

> **Reference:** [next-safe-action: Getting Started](https://next-safe-action.dev/docs/getting-started)
