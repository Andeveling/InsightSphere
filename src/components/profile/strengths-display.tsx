"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Medal,
  Award,
  Target,
  Star,
  Brain,
  Heart,
  Zap,
  Cog,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { User, UserStrength, Strength, Domain } from "@prisma/client"

interface StrengthsDisplayProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength & {
        domain: Domain
      }
    })[]
  }
  className?: string
}

// Domain configuration using CSS variables
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

const positionIcons = [Trophy, Medal, Award, Target, Star]
const positionLabels = ["1ra Fortaleza", "2da Fortaleza", "3ra Fortaleza", "4ta Fortaleza", "5ta Fortaleza"]

export function StrengthsDisplay({ user, className }: StrengthsDisplayProps) {
  const [expandedStrengths, setExpandedStrengths] = useState<Set<string>>(new Set())
  const [showDomainSummary, setShowDomainSummary] = useState(false)

  // Sort strengths by position
  const sortedStrengths = [...user.userStrengths].sort((a, b) => {
    if (a.position !== null && b.position !== null) {
      return a.position - b.position
    }
    if (a.position !== null) return -1
    if (b.position !== null) return 1
    return a.strengthId.localeCompare(b.strengthId)
  })

  const toggleStrengthExpansion = (strengthId: string) => {
    const newExpanded = new Set(expandedStrengths)
    if (newExpanded.has(strengthId)) {
      newExpanded.delete(strengthId)
    } else {
      newExpanded.add(strengthId)
    }
    setExpandedStrengths(newExpanded)
  }

  const getDomainConfig = (domainName: string) => {
    return domainConfig[domainName as keyof typeof domainConfig] || domainConfig.Doing
  }

  if (sortedStrengths.length === 0) {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
            <Star className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Tus Fortalezas HIGH5</CardTitle>
          <CardDescription>Aún no has seleccionado tus fortalezas principales</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Completa tu perfil para descubrir y mostrar tus fortalezas únicas
          </p>
          <Button variant="outline" size="sm">
            Completar Perfil
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Calculate domain distribution
  const domainDistribution = sortedStrengths.reduce(
    (acc, userStrength) => {
      const domainName = userStrength.strength.domain.name
      acc[domainName] = (acc[domainName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Card className={cn("border-border bg-card", className)}>
      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">TOP 5 Fortalezas HIGH5</CardTitle>
              <CardDescription className="text-sm">Tus fortalezas principales ordenadas por prioridad</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{sortedStrengths.length}/5</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Strengths Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-5 gap-4">
          {sortedStrengths.map((userStrength, index) => {
            const { strength } = userStrength
            const position = userStrength.position || index + 1
            const PositionIcon = positionIcons[position - 1] || Star
            const domainInfo = getDomainConfig(strength.domain.name)
            const DomainIcon = domainInfo.icon
            const isExpanded = expandedStrengths.has(userStrength.id)

            return (
              <Card
                key={userStrength.id}
                className={cn(
                  "relative overflow-hidden border transition-all duration-200 hover:shadow-md group",
                  domainInfo.borderColor,
                  domainInfo.lightColor,
                )}
              >
                {/* Position Badge - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg",
                    domainInfo.color
                  )}>
                    <PositionIcon className="h-4 w-4" />
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Header Section */}
                  <div className="space-y-2 pr-10"> {/* Add right padding for position badge */}
                    <div className="flex items-center gap-2">
                      <div className={cn("w-6 h-6 rounded flex items-center justify-center", domainInfo.color)}>
                        <DomainIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <Badge variant="outline" className={cn("text-xs", domainInfo.textColor)}>
                        {strength.domain.nameEs || strength.domain.name}
                      </Badge>
                    </div>
                    
                    <h4 className="font-semibold text-base leading-tight text-foreground">
                      {strength.nameEs || strength.name}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className={cn(
                    "text-sm text-muted-foreground leading-relaxed transition-all duration-200",
                    isExpanded ? "line-clamp-none" : "line-clamp-3"
                  )}>
                    {strength.briefDefinition || strength.description}
                  </p>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-3 pt-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                      {strength.fullDefinition && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm text-foreground">Definición Completa:</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                            {strength.fullDefinition}
                          </p>
                        </div>
                      )}

                      {strength.strengthsDynamics && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm text-foreground">Dinámicas:</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                            {strength.strengthsDynamics}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-xs font-medium text-muted-foreground">
                      {positionLabels[position - 1] || `${position}ª Fortaleza`}
                    </span>
                    {(strength.fullDefinition || strength.strengthsDynamics) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStrengthExpansion(userStrength.id)}
                        className="h-8 px-3 text-xs opacity-70 hover:opacity-100 transition-opacity"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Menos
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Más detalles
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Domain Summary */}
        <Card className="border-border/50 bg-muted/30">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Distribución por Dominio
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDomainSummary(!showDomainSummary)}
                className="h-8 px-3 text-xs"
              >
                {showDomainSummary ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Mostrar detalles
                  </>
                )}
              </Button>
            </div>

            {/* Domain Summary Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(domainDistribution).map(([domainName, count]) => {
                const domainInfo = getDomainConfig(domainName)
                const DomainIcon = domainInfo.icon
                const domainNameEs = domainName === "Doing" ? "Hacer" :
                                  domainName === "Feeling" ? "Sentir" :
                                  domainName === "Motivating" ? "Motivar" : "Pensar"
                
                return (
                  <div
                    key={domainName}
                    className={cn(
                      "relative p-3 rounded-lg border text-center transition-all duration-200 hover:shadow-sm",
                      domainInfo.lightColor,
                      domainInfo.borderColor,
                    )}
                  >
                    <div className={cn("w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center", domainInfo.color)}>
                      <DomainIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className={cn("text-xl font-bold mb-1", domainInfo.textColor)}>
                      {count}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {domainNameEs}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Expanded Domain Details */}
            {showDomainSummary && (
              <div className="pt-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(domainDistribution).map((domainName) => {
                    const domainInfo = getDomainConfig(domainName)
                    const DomainIcon = domainInfo.icon
                    const count = domainDistribution[domainName]
                    const strengthsInDomain = sortedStrengths.filter((us) => us.strength.domain.name === domainName)
                    const domainNameEs = domainName === "Doing" ? "Hacer" :
                                      domainName === "Feeling" ? "Sentir" :
                                      domainName === "Motivating" ? "Motivar" : "Pensar"

                    return (
                      <div
                        key={domainName}
                        className={cn(
                          "p-4 rounded-lg border space-y-3",
                          domainInfo.lightColor, 
                          domainInfo.borderColor
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", domainInfo.color)}>
                            <DomainIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h5 className={cn("font-semibold text-sm", domainInfo.textColor)}>
                              {domainNameEs}
                            </h5>
                            <span className="text-xs text-muted-foreground">
                              {count} fortaleza{count !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {strengthsInDomain.map((us) => (
                            <div key={us.id} className="flex items-center justify-between p-2 bg-card/50 rounded border border-border/30">
                              <span className="text-sm font-medium truncate">
                                {us.strength.nameEs || us.strength.name}
                              </span>
                              <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                                #{us.position}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Footer */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xl font-bold text-primary mb-1">{sortedStrengths.length}</div>
            <div className="text-xs text-muted-foreground font-medium">Fortalezas</div>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xl font-bold text-primary mb-1">{Object.keys(domainDistribution).length}</div>
            <div className="text-xs text-muted-foreground font-medium">Dominios</div>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xl font-bold text-primary mb-1">
              {Math.round((Object.keys(domainDistribution).length / 4) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground font-medium">Balance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
