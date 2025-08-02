import { getTeamMembers, getTeamStrengths } from "@/actions/teams.actions"
import { describe, it, expect } from "vitest"

describe("Server Actions: Equipos", () => {
  it("debe retornar miembros del equipo", async () => {
    const result = await getTeamMembers({ teamId: "test-team" })
    expect(Array.isArray(result.data)).toBe(true)
  })
  it("debe retornar fortalezas únicas del equipo", async () => {
    const result = await getTeamStrengths({ teamId: "test-team" })
    expect(Array.isArray(result.data)).toBe(true)
  })
})
