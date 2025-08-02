import { actionClient } from "./action-client.actions"
import { InferSafeActionFnResult } from "next-safe-action"
import { prisma } from "../../lib/prisma"
import { auth } from "../../auth.config"

export const getUserWithStrengths = actionClient.action(async () => {
  const session = await auth()
const user = await prisma.user.findUnique({
  where: { id: session?.user.id },
  include: {
    userStrengths: {
      include: {
        strength: true,
      },
      orderBy: { position: "asc" },
    },
  },
})

  return user
})

export type UserWithStrengthsResult = InferSafeActionFnResult<typeof getUserWithStrengths>
