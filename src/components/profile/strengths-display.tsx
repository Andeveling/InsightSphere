"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
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
  Sparkles,
  BarChart3,
  TrendingUp,
  Users,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"
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

// Domain configuration
const domainConfig = {
  Doing: {
    color: "bg-chart-1",
    lightColor: "bg-chart-1/10",
    textColor: "text-chart-1",
    borderColor: "border-chart-1/30",
    icon: Cog,
    nameEs: "Hacer",
    description: "Fortalezas orientadas a la acción y ejecución",
  },
  Feeling: {
    color: "bg-chart-2",
    lightColor: "bg-chart-2/10",
    textColor: "text-chart-2",
    borderColor: "border-chart-2/30",
    icon: Heart,
    nameEs: "Sentir",
    description: "Fortalezas emocionales y de conexión",
  },
  Motivating: {
    color: "bg-chart-3",
    lightColor: "bg-chart-3/10",
    textColor: "text-chart-3",
    borderColor: "border-chart-3/30",
    icon: Zap,
    nameEs: "Motivar",
    description: "Fortalezas de liderazgo e influencia",
  },
  Thinking: {
    color: "bg-chart-4",
    lightColor: "bg-chart-4/10",
    textColor: "text-chart-4",
    borderColor: "border-chart-4/30",
    icon: Brain,
    nameEs: "Pensar",
    description: "Fortalezas analíticas y estratégicas",
  },
}

const positionIcons = [Trophy, Medal, Award, Target, Star]
const positionLabels = ["1ra Fortaleza", "2da Fortaleza", "3ra Fortaleza", "4ta Fortaleza", "5ta Fortaleza"]

// Componente para una fortaleza individual
function StrengthCard({
  userStrength,
  index,
}: {
  userStrength: UserStrength & { strength: Strength & { domain: Domain } }
  index: number
}) {
  const { strength } = userStrength
  const position = userStrength.position || index + 1
  const PositionIcon = positionIcons[position - 1] || Star
  const domainInfo = domainConfig[strength.domain.name as keyof typeof domainConfig] || domainConfig.Doing
  const DomainIcon = domainInfo.icon

  const hasExpandableContent = strength.fullDefinition || strength.strengthsDynamics

  return (
    <Card
      className={cn(
        "relative overflow-hidden border transition-all duration-300 hover:shadow-lg group",
        domainInfo.borderColor,
        domainInfo.lightColor,
      )}
    >
      {/* Position Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
            domainInfo.color,
          )}
        >
          <PositionIcon className="h-5 w-5" />
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3 pr-12">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", domainInfo.color)}>
              <DomainIcon className="h-4 w-4 text-white" />
            </div>
            <Badge variant="outline" className={cn("text-xs font-medium", domainInfo.textColor)}>
              {domainInfo.nameEs}
            </Badge>
          </div>

          <div>
            <h3 className="font-bold text-lg leading-tight text-foreground mb-2">{strength.nameEs || strength.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {strength.briefDefinition || strength.description}
            </p>
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">
            {positionLabels[position - 1] || `${position}ª Fortaleza`}
          </span>

          {hasExpandableContent && (
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Más detalles
            </Badge>
          )}
        </div>

        {/* Expandable Content usando Accordion */}
        {hasExpandableContent && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-2 cursor-pointer text-primary">
                Ver información detallada
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {strength.fullDefinition && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Definición Completa
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">{strength.fullDefinition}</p>
                    </div>
                  </div>
                )}

                {strength.strengthsDynamics && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Dinámicas de la Fortaleza
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                      <ul className="space-y-3">
                        {strength.strengthsDynamics
                          .split('. ')
                          .filter(item => item.trim().length > 0)
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{item.trim().endsWith('.') ? item.trim() : `${item.trim()}.`}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

// Componente para el resumen de dominios
function DomainSummary({
  domainDistribution,
  sortedStrengths,
}: {
  domainDistribution: Record<string, number>
  sortedStrengths: any[]
}) {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Análisis por Dominios
        </CardTitle>
        <CardDescription>Distribución de tus fortalezas según los 4 dominios de HIGH5</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Domain Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(domainDistribution).map(([domainName, count]) => {
            const domainInfo = domainConfig[domainName as keyof typeof domainConfig]
            const DomainIcon = domainInfo.icon

            return (
              <div
                key={domainName}
                className={cn(
                  "relative p-4 rounded-xl border text-center transition-all duration-300 hover:shadow-md hover:scale-105",
                  domainInfo.lightColor,
                  domainInfo.borderColor,
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-sm",
                    domainInfo.color,
                  )}
                >
                  <DomainIcon className="h-6 w-6 text-white" />
                </div>
                <div className={cn("text-2xl font-bold mb-1", domainInfo.textColor)}>{count}</div>
                <div className="text-sm font-medium text-foreground mb-1">{domainInfo.nameEs}</div>
                <div className="text-xs text-muted-foreground">{count === 1 ? "fortaleza" : "fortalezas"}</div>
              </div>
            )
          })}
        </div>

        {/* Detailed Domain Analysis */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="domain-details" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              Ver análisis detallado por dominio
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(domainDistribution).map((domainName) => {
                  const domainInfo = domainConfig[domainName as keyof typeof domainConfig]
                  const DomainIcon = domainInfo.icon
                  const count = domainDistribution[domainName]
                  const strengthsInDomain = sortedStrengths.filter((us) => us.strength.domain.name === domainName)

                  return (
                    <div
                      key={domainName}
                      className={cn("p-4 rounded-lg border space-y-3", domainInfo.lightColor, domainInfo.borderColor)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", domainInfo.color)}>
                          <DomainIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className={cn("font-bold text-base", domainInfo.textColor)}>{domainInfo.nameEs}</h4>
                          <p className="text-xs text-muted-foreground">{domainInfo.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {strengthsInDomain.map((us) => (
                          <div
                            key={us.id}
                            className="flex items-center justify-between p-3 bg-card/70 rounded-lg border border-border/30"
                          >
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

// Componente para estadísticas
function StrengthsStats({
  sortedStrengths,
  domainDistribution,
}: {
  sortedStrengths: any[]
  domainDistribution: Record<string, number>
}) {
  const balancePercentage = Math.round((Object.keys(domainDistribution).length / 4) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold text-primary">{sortedStrengths.length}</span>
        </div>
        <p className="text-sm font-medium text-foreground">Fortalezas Identificadas</p>
        <p className="text-xs text-muted-foreground">de 5 posibles</p>
      </Card>

      <Card className="text-center p-4 bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-5 w-5 text-chart-2 mr-2" />
          <span className="text-2xl font-bold text-chart-2">{Object.keys(domainDistribution).length}</span>
        </div>
        <p className="text-sm font-medium text-foreground">Dominios Cubiertos</p>
        <p className="text-xs text-muted-foreground">de 4 dominios</p>
      </Card>

      <Card className="text-center p-4 bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
        <div className="flex items-center justify-center mb-2">
          <BarChart3 className="h-5 w-5 text-chart-3 mr-2" />
          <span className="text-2xl font-bold text-chart-3">{balancePercentage}%</span>
        </div>
        <p className="text-sm font-medium text-foreground">Balance de Dominios</p>
        <p className="text-xs text-muted-foreground">diversidad de fortalezas</p>
      </Card>
    </div>
  )
}

// Componente principal
export function StrengthsDisplay({ user, className }: StrengthsDisplayProps) {
  // Sort strengths by position
  const sortedStrengths = [...user.userStrengths].sort((a, b) => {
    if (a.position !== null && b.position !== null) {
      return a.position - b.position
    }
    if (a.position !== null) return -1
    if (b.position !== null) return 1
    return a.strengthId.localeCompare(b.strengthId)
  })

  // Empty state
  if (sortedStrengths.length === 0) {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Tus Fortalezas HIGH5</CardTitle>
          <CardDescription className="text-base">Aún no has completado tu perfil de fortalezas</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Completa tu evaluación HIGH5 para descubrir tus 5 fortalezas principales y cómo puedes potenciarlas en tu
            desarrollo profesional.
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Completar Evaluación
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
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <Card className="border-border bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">TOP 5 Fortalezas HIGH5</CardTitle>
                <CardDescription className="text-base">
                  Tus fortalezas principales ordenadas por prioridad
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">{sortedStrengths.length}/5</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Strengths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedStrengths.map((userStrength, index) => (
          <StrengthCard key={userStrength.id} userStrength={userStrength} index={index} />
        ))}
      </div>

      {/* Domain Summary */}
      <DomainSummary domainDistribution={domainDistribution} sortedStrengths={sortedStrengths} />

      {/* Statistics */}
      <StrengthsStats sortedStrengths={sortedStrengths} domainDistribution={domainDistribution} />
    </div>
  )
}
