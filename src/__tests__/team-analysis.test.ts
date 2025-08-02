import { analyzeTeamComposition, analyzeTeamDomains } from "@/lib/team-analysis"
import { describe, it, expect } from "vitest"


describe("Utilidades de análisis HIGH5", () => {
  it("calcula la composición de fortalezas", () => {
    const members = [
      { id: "1", name: "Juan", strengths: ["Coach"], domain: "Motivating" }
    ]
    const strengths = ["Coach"]
    const result = analyzeTeamComposition(members, strengths)
    expect(result).toBeDefined()
  })
  it("calcula el balance de dominios", () => {
    const members = [
      { id: "1", name: "Juan", strengths: ["Coach"], domain: "Motivating" }
    ]
    const result = analyzeTeamDomains(members)
    expect(result).toBeDefined()
  })
})
