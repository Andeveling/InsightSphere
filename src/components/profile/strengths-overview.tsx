"use client"

import { StrengthsDisplay } from "./strengths-display"
import { StrengthsRadarChart } from "./strengths-radar-chart"
import { cn } from "@/lib/utils"
import type { User, UserStrength, Strength, Domain } from "@prisma/client"

interface StrengthsOverviewProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength & {
        domain: Domain
      }
    })[]
  }
  className?: string
  layout?: "stacked" | "side-by-side"
}

export function StrengthsOverview({ user, className, layout = "stacked" }: StrengthsOverviewProps) {
  if (layout === "side-by-side") {
    return (
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
        <StrengthsRadarChart user={user} />
        <StrengthsDisplay user={user} />
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <StrengthsRadarChart user={user} />
      <StrengthsDisplay user={user} />
    </div>
  )
}
