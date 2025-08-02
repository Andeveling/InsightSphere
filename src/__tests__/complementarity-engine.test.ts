import { computeComplementarity } from "@/lib/complementarity-engine"
import { describe, it, expect } from "vitest"

describe("Motor de complementariedad", () => {
  it("identifica sinergias entre miembros", () => {
    const members = [
      { id: "1", name: "Juan", strengths: ["Coach"], domain: "Motivating" },
      { id: "2", name: "Ana", strengths: ["Commander"], domain: "Thinking" }
    ]
    const result = computeComplementarity(members)
    expect(result).toBeDefined()
  })
})
