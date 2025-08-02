import { z } from "zod"
import { actionClient } from "./action-client.actions"
import { prisma } from "@/lib/db"
import { TeamMemberSchema } from "@/schemas/teams.schema"

const teamIdSchema = z.object({ teamId: z.string() })

export const getTeamMembers = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const team = await prisma.team.findUnique({
      where: { id: parsedInput.teamId },
      include: {
        users: {
          include: {
            userStrengths: {
              include: {
                strength: {
                  include: { domain: true }
                }
              }
            }
          }
        }
      }
    })
    if (!team) return []
    return team.users.map(user => ({
      id: user.id,
      name: user.name,
      strengths: user.userStrengths.map(us => us.strength.name),
      domain: user.userStrengths[0]?.strength.domain?.name ?? user.userStrengths[0]?.strength.domainId ?? ""
    }))
  })

export const getTeamStrengths = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const team = await prisma.team.findUnique({
      where: { id: parsedInput.teamId },
      include: {
        users: {
          include: {
            userStrengths: {
              include: { strength: true }
            }
          }
        }
      }
    })
    if (!team) return []
    const strengths = team.users.flatMap(user => user.userStrengths.map(us => us.strength.name))
    return Array.from(new Set(strengths))
  })

// Ejemplo de acción para obtener composición de equipo
export const getTeamCompositionAction = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    // Aquí se llamaría a la lógica de análisis
    // return getTeamComposition(parsedInput.teamId as TeamId)
    return {}
  })

// ...otras acciones se agregarán aquí...
