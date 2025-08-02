import { getTeamComposition, getTeamDomainAnalysis, getTeamComplementarity, getTeamInsights } from "@/actions/team-analytics.actions"
import { describe, it, expect } from "vitest"


describe("Server Actions: Análisis de Equipos", () => {
  it("debe retornar composición de fortalezas", async () => {
    const result = await getTeamComposition({ teamId: "test-team" })
    expect(result.data).toBeDefined()
  })
  it("debe retornar análisis de dominios", async () => {
    const result = await getTeamDomainAnalysis({ teamId: "test-team" })
    expect(result.data).toBeDefined()
  })
  it("debe retornar complementariedad", async () => {
    const result = await getTeamComplementarity({ teamId: "test-team" })
    expect(result.data).toBeDefined()
  })
  it("debe retornar insights automáticos", async () => {
    const result = await getTeamInsights({ teamId: "test-team" })
    expect(result.data).toBeDefined()
  })
})
