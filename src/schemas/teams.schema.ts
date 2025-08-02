import { z } from "zod"

export const TeamIdSchema = z.string().brand<"TeamId">()

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  strengths: z.array(z.string()),
  domain: z.string(),
})

export const TeamCompositionSchema = z.object({
  strengthsCount: z.record(z.string(), z.number()), // Ej: { "Coach": 2, "Deliverer": 1 }
  domainsCount: z.record(z.string(), z.number()),   // Ej: { "Motivating": 1, "Thinking": 1 }
})

export const TeamDomainAnalysisSchema = z.object({
  balance: z.record(z.string(), z.number()), // Ej: { "Motivating": 1, "Thinking": 2 }
  dominantDomain: z.string().optional(),
  gaps: z.array(z.string()),
})

export const TeamComplementaritySchema = z.object({
  pairs: z.array(z.tuple([TeamMemberSchema, TeamMemberSchema])),
  synergies: z.array(z.string()),
})

export const TeamInsightsSchema = z.object({
  recommendations: z.array(z.string()),
  alerts: z.array(z.string()),
  kaizenTips: z.array(z.string()),
})

export type TeamId = z.infer<typeof TeamIdSchema>
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamComposition = z.infer<typeof TeamCompositionSchema>
export type TeamDomainAnalysis = z.infer<typeof TeamDomainAnalysisSchema>
export type TeamComplementarity = z.infer<typeof TeamComplementaritySchema>
export type TeamInsights = z.infer<typeof TeamInsightsSchema>
