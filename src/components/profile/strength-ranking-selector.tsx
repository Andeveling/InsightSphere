"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Target, Star, Brain, Heart, Zap, Cog, ChevronDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Domain, Strength } from "@prisma/client"
import { debugRankings } from "../../../debug-utils"

interface StrengthRankingSelectorProps {
  domains: (Domain & {
    strengths: Strength[]
  })[]
  selectedRankings: { strengthId: string; position: number }[]
  onChange: (rankings: { strengthId: string; position: number }[]) => void
  disabled?: boolean
  name: string
}

// Domain color mappings with icons using CSS variables
const domainConfig = {
  Doing: {
    color: "bg-chart-1",
    lightColor: "bg-chart-1/10",
    textColor: "text-chart-1",
    borderColor: "border-chart-1/30",
    icon: Cog,
  },
  Feeling: {
    color: "bg-chart-2",
    lightColor: "bg-chart-2/10",
    textColor: "text-chart-2",
    borderColor: "border-chart-2/30",
    icon: Heart,
  },
  Motivating: {
    color: "bg-chart-3",
    lightColor: "bg-chart-3/10",
    textColor: "text-chart-3",
    borderColor: "border-chart-3/30",
    icon: Zap,
  },
  Thinking: {
    color: "bg-chart-4",
    lightColor: "bg-chart-4/10",
    textColor: "text-chart-4",
    borderColor: "border-chart-4/30",
    icon: Brain,
  },
}

const rankIcons = [Trophy, Medal, Award, Target, Star]
const rankLabels = ["1ra", "2da", "3ra", "4ta", "5ta"]

export function StrengthRankingSelector({
  domains,
  selectedRankings,
  onChange,
  disabled,
  name,
}: StrengthRankingSelectorProps) {
  const [ showDomainInfo, setShowDomainInfo ] = useState(false)
  console.log("Selected Rankings:", selectedRankings)

  // Calcular el estado inicial usando useMemo para estabilizar
  const initialStrengths = useMemo(() => {
    debugRankings(selectedRankings, "StrengthRankingSelector - received props")
    
    if (selectedRankings.length === 0) {
      return [null, null, null, null, null] as (string | null)[]
    }

    const positions: (string | null)[] = [null, null, null, null, null]
    
    selectedRankings.forEach((ranking) => {
      console.log(`🔍 Processing ranking:`, ranking, `position type:`, typeof ranking.position)
      const position = Number(ranking.position)
      if (Number.isInteger(position) && position >= 1 && position <= 5) {
        console.log(`✅ Setting position ${position} (index ${position - 1}) to strengthId:`, ranking.strengthId)
        positions[position - 1] = ranking.strengthId
      } else {
        console.log(`❌ Position ${ranking.position} is out of range or invalid`)
      }
    })
    
    console.log("🔍 Final positions array:", positions)
    return positions
  }, [selectedRankings])

  // Estado con inicialización estable
  const [selectedStrengths, setSelectedStrengths] = useState<(string | null)[]>(initialStrengths)

  // Sincronizar cuando cambie el valor estable
  useEffect(() => {
    setSelectedStrengths(initialStrengths)
  }, [initialStrengths])

  const getDomainConfig = (domainName: string) => {
    return domainConfig[domainName as keyof typeof domainConfig] || domainConfig.Doing
  }

  const getStrengthById = (strengthId: string) => {
    for (const domain of domains) {
      const strength = domain.strengths.find((s) => s.id === strengthId)
      if (strength) {
        return { strength, domain }
      }
    }
    return null
  }

  const handleStrengthSelect = (position: number, strengthId: string) => {
    if (disabled) return

    const newSelected = [...selectedStrengths]
    const existingIndex = newSelected.indexOf(strengthId)
    if (existingIndex !== -1) {
      newSelected[existingIndex] = null
    }
    newSelected[position] = strengthId
    setSelectedStrengths(newSelected)

    const newRankings = newSelected
      .map((strengthId, index) => (strengthId ? { strengthId, position: index + 1 } : null))
      .filter(Boolean) as { strengthId: string; position: number }[]
    onChange(newRankings)
  }

  const getAvailableStrengths = (currentPosition: number) => {
    const currentSelection = selectedStrengths[currentPosition]
    const allStrengths: (Strength & { domain: Domain })[] = []

    domains.forEach((domain) => {
      domain.strengths.forEach((strength) => {
        allStrengths.push({ ...strength, domain })
      })
    })

    return allStrengths.filter(
      (strength) => !selectedStrengths.includes(strength.id) || strength.id === currentSelection,
    )
  }

  const selectedCount = selectedStrengths.filter((s) => s !== null).length

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <Card className="border-border bg-primary text-primary-foreground">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-lg font-bold">TOP 5 Fortalezas</h2>
          </div>
          <p className="text-sm text-primary-foreground/80 mb-3">Selecciona y ordena tus 5 fortalezas principales</p>
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-3 py-1 rounded-full">
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                selectedCount === 5 ? "bg-primary-foreground" : "bg-primary-foreground/40",
              )}
            />
            <span className="text-sm font-medium">{selectedCount}/5 seleccionadas</span>
          </div>
        </CardContent>
      </Card>

      {/* Compact Selection Grid */}
      <div className="space-y-3">
        {selectedStrengths.map((selectedStrengthId, index) => {
          const RankIcon = rankIcons[index]
          const availableStrengths = getAvailableStrengths(index)
          const strengthData = selectedStrengthId ? getStrengthById(selectedStrengthId) : null
          const domainInfo = strengthData ? getDomainConfig(strengthData.domain.name) : null

          return (
            <Card
              key={index}
              className={cn(
                "border-border bg-card transition-all duration-200",
                strengthData && "ring-1 ring-primary/20",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Compact Rank Section */}
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <RankIcon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">{rankLabels[index]}</div>
                  </div>

                  {/* Selection Area */}
                  <div className="flex-1 space-y-2">
                    <Select
                      value={selectedStrengthId || ""}
                      onValueChange={(value) => handleStrengthSelect(index, value)}
                      disabled={disabled}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Selecciona una fortaleza..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {availableStrengths.map((strength) => {
                          const domainConfig = getDomainConfig(strength.domain.name)
                          const DomainIcon = domainConfig.icon
                          return (
                            <SelectItem key={strength.id} value={strength.id} className="p-3 cursor-pointer">
                              <div className="flex items-center gap-2 w-full">
                                <div className={cn("p-1 rounded", domainConfig.color)}>
                                  <DomainIcon className="w-3 h-3 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{strength.nameEs || strength.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {strength.domain.nameEs || strength.domain.name}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {/* Compact Selected Strength Preview */}
                    {strengthData && domainInfo && (
                      <div className={cn("rounded-lg border p-3", domainInfo.lightColor, domainInfo.borderColor)}>
                        <div className="flex items-start gap-2">
                          <div className={cn("p-1 rounded", domainInfo.color)}>
                            <domainInfo.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm truncate">
                                {strengthData.strength.nameEs || strengthData.strength.name}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {strengthData.domain.nameEs || strengthData.domain.name}
                              </Badge>
                            </div>
                            {strengthData.strength.briefDefinition && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {strengthData.strength.briefDefinition}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Success Message */}
      {selectedCount === 5 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">¡Perfil completo!</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedStrengths.map((strengthId, index) => {
                if (!strengthId) return null
                const strengthData = getStrengthById(strengthId)
                if (!strengthData) return null
                return (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{index + 1} {strengthData.strength.nameEs || strengthData.strength.name}
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compact Domain Information */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Dominios de Fortalezas</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowDomainInfo(!showDomainInfo)} className="h-8 px-2">
              <ChevronDown className={cn("w-4 h-4 transition-transform", showDomainInfo && "rotate-180")} />
            </Button>
          </div>
        </CardHeader>
        {showDomainInfo && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              {domains.map((domain) => {
                const config = getDomainConfig(domain.name)
                const DomainIcon = config.icon
                const selectedFromDomain = selectedStrengths.filter((strengthId) => {
                  if (!strengthId) return false
                  const strengthData = getStrengthById(strengthId)
                  return strengthData?.domain.id === domain.id
                }).length

                return (
                  <div
                    key={domain.id}
                    className={cn(
                      "p-3 rounded-lg border transition-all",
                      config.lightColor,
                      config.borderColor,
                      selectedFromDomain > 0 && "ring-1 ring-primary/30",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn("p-1 rounded", config.color)}>
                        <DomainIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{domain.nameEs || domain.name}</h4>
                        {selectedFromDomain > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {selectedFromDomain}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{domain.summary || domain.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Hidden inputs for form submission */}
      {selectedStrengths.map((strengthId, index) => {
        if (!strengthId) return null
        return (
          <div key={strengthId}>
            <input type="hidden" name={`${name}[${index}].strengthId`} value={strengthId} />
            <input type="hidden" name={`${name}[${index}].position`} value={index + 1} />
          </div>
        )
      })}
    </div>
  )
}
