// Acciones y utilidades de análisis y métricas de equipos HIGH5
import { z } from "zod"
import { actionClient } from "./action-client.actions"
import { getTeamMembers, getTeamStrengths } from "./teams.actions"
import { TeamId, TeamComposition, TeamDomainAnalysis, TeamComplementarity, TeamInsights } from "@/schemas/teams.schema"
import { analyzeTeamComposition, analyzeTeamDomains, analyzeComplementarity, generateTeamInsights } from "../lib/team-analysis"

const teamIdSchema = z.object({ teamId: z.string() })

export const getTeamComposition = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const members = await getTeamMembers({ teamId: parsedInput.teamId })
    const strengths = await getTeamStrengths({ teamId: parsedInput.teamId })
    return analyzeTeamComposition(members.data ?? [], strengths.data ?? [])
  })

export const getTeamDomainAnalysis = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const members = await getTeamMembers({ teamId: parsedInput.teamId })
    return analyzeTeamDomains(members.data ?? [])
  })

export const getTeamComplementarity = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const members = await getTeamMembers({ teamId: parsedInput.teamId })
    return analyzeComplementarity(members.data ?? [])
  })

export const getTeamInsights = actionClient
  .inputSchema(teamIdSchema)
  .action(async ({ parsedInput }) => {
    const members = await getTeamMembers({ teamId: parsedInput.teamId })
    return generateTeamInsights(members.data ?? [])
  })
