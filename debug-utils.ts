// Temporary debug utilities for investigating the position #5 bug

export function debugUserStrengths(userStrengths: any[], location: string) {
  console.group(`🔍 Debug UserStrengths at ${location}`)
  console.log('Total userStrengths:', userStrengths.length)
  
  userStrengths.forEach((us, index) => {
    console.log(`UserStrength[${index}]:`, {
      id: us.id,
      strengthId: us.strengthId,
      position: us.position,
      positionType: typeof us.position,
      strengthName: us.strength?.nameEs || us.strength?.name
    })
  })
  
  const positionsFound = userStrengths
    .filter(us => us.position !== null && us.position !== undefined)
    .map(us => us.position)
    .sort((a, b) => a - b)
  
  console.log('Positions found:', positionsFound)
  console.log('Missing positions:', [1,2,3,4,5].filter(p => !positionsFound.includes(p)))
  console.groupEnd()
}

export function debugRankings(rankings: any[], location: string) {
  console.group(`🔍 Debug Rankings at ${location}`)
  console.log('Total rankings:', rankings.length)
  
  rankings.forEach((ranking, index) => {
    console.log(`Ranking[${index}]:`, {
      strengthId: ranking.strengthId,
      position: ranking.position,
      positionType: typeof ranking.position
    })
  })
  
  const positions = rankings.map(r => r.position).sort((a, b) => a - b)
  console.log('Positions in rankings:', positions)
  console.groupEnd()
}
