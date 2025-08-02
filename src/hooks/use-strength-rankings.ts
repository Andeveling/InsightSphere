import { useState, useMemo } from "react"
import type { UserWithStrengthsResult } from "@/actions/user.actions"

type StrengthRanking = { strengthId: string; position: number | null }

export function useStrengthRankings(user: UserWithStrengthsResult["data"]) {
  // Initialize strength rankings from user data
  const initialRankings = useMemo(() => {
    if (!user?.userStrengths?.length) return []
    
    return user.userStrengths
      .map((us) => ({
        strengthId: us.strengthId,
        position: us.position ?? null,
      }))
      .sort((a, b) => {
        if (a.position == null && b.position != null) return 1
        if (a.position != null && b.position == null) return -1
        if (a.position == null && b.position == null) return 0
        return (a.position as number) - (b.position as number)
      })
  }, [user?.userStrengths])

  const [strengthRankings, setStrengthRankings] = useState<StrengthRanking[]>(initialRankings)

  // Get only valid rankings (with position 1-5) for the selector component
  const validRankings = useMemo(() => {
    return strengthRankings.filter((r): r is { strengthId: string; position: number } =>
      typeof r.position === 'number' && r.position >= 1 && r.position <= 5
    )
  }, [strengthRankings])

  // Check if exactly 5 strengths are selected
  const isComplete = validRankings.length === 5

  return {
    strengthRankings,
    setStrengthRankings,
    validRankings,
    isComplete,
  }
}
