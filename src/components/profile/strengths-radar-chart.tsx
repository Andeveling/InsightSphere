"use client"

import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Domain, Strength, User, UserStrength } from "@prisma/client"
import { BarChart3, Brain, Cog, Heart, Info, TrendingUp, Zap } from "lucide-react"
import { useState } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"

interface StrengthsRadarChartProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength & {
        domain: Domain
      }
    })[]
  }
  className?: string
  showInsights?: boolean
}

// Domain configuration
const domainConfig = {
  Doing: {
    color: "hsl(var(--chart-1))",
    lightColor: "bg-chart-1/10",
    textColor: "text-chart-1",
    icon: Cog,
    description: "Ejecución y resultados",
    focus: "Hacer que las cosas sucedan",
  },
  Feeling: {
    color: "hsl(var(--chart-2))",
    lightColor: "bg-chart-2/10",
    textColor: "text-chart-2",
    icon: Heart,
    description: "Relaciones y conexiones",
    focus: "Construir vínculos fuertes",
  },
  Motivating: {
    color: "hsl(var(--chart-3))",
    lightColor: "bg-chart-3/10",
    textColor: "text-chart-3",
    icon: Zap,
    description: "Influencia e inspiración",
    focus: "Motivar y energizar",
  },
  Thinking: {
    color: "hsl(var(--chart-4))",
    lightColor: "bg-chart-4/10",
    textColor: "text-chart-4",
    icon: Brain,
    description: "Análisis y estrategia",
    focus: "Pensar y planificar",
  },
}

export function StrengthsRadarChart({ user, className, showInsights = true }: StrengthsRadarChartProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Calculate domain distribution
  const domainDistribution = user.userStrengths.reduce(
    (acc, userStrength) => {
      const domainName = userStrength.strength.domain.name
      acc[domainName] = (acc[domainName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Prepare data for radar chart
  const radarData = Object.entries(domainConfig).map(([domainName, config]) => ({
    domain: domainName,
    domainEs:
      domainName === "Doing"
        ? "Hacer"
        : domainName === "Feeling"
          ? "Sentir"
          : domainName === "Motivating"
            ? "Motivar"
            : "Pensar",
    value: domainDistribution[domainName] || 0,
    maxValue: 5,
    percentage: ((domainDistribution[domainName] || 0) / 5) * 100,
    color: config.color,
    description: config.description,
    focus: config.focus,
  }))

  // Calculate insights
  const totalStrengths = user.userStrengths.length
  const dominantDomain = radarData.reduce((prev, current) => (prev.value > current.value ? prev : current))
  const balanceScore = Math.round((4 - (radarData.filter((d) => d.value > 0).length - 1)) * 25)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm text-foreground mb-1">{data.domainEs}</p>
          <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{data.value}</span> de 5 fortalezas
            </p>
            <p className="text-xs text-muted-foreground">{data.percentage.toFixed(0)}% de tu perfil</p>
          </div>
        </div>
      )
    }
    return null
  }

  if (totalStrengths === 0) {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Radar de Fortalezas</CardTitle>
          <CardDescription>Visualiza la distribución de tus fortalezas por dominio</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Completa tu perfil para ver tu radar de fortalezas personalizado
          </p>
          <Button variant="outline" size="sm">
            Seleccionar Fortalezas
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Radar de Fortalezas</CardTitle>
              <CardDescription className="text-sm">
                Distribución de tus {totalStrengths} fortalezas por dominio
              </CardDescription>
            </div>
          </div>
          {showInsights && (
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="h-8 px-2">
              <Info className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Radar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.3} radialLines={true} />
              <PolarAngleAxis
                dataKey="domainEs"
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--foreground))",
                  fontWeight: 500,
                }}
                className="text-sm"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 5]}
                tick={{
                  fontSize: 10,
                  fill: "hsl(var(--muted-foreground))",
                }}
                tickCount={6}
              />
              <Radar
                name="Fortalezas"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={3}
                dot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Legend */}
        <div className="grid grid-cols-2 gap-3">
          {radarData.map((domain) => {
            const config = domainConfig[domain.domain as keyof typeof domainConfig]
            const DomainIcon = config.icon
            return (
              <div
                key={domain.domain}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  config.lightColor,
                  domain.value > 0 ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50",
                )}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: domain.color }}
                >
                  <DomainIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">{domain.domainEs}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {domain.value}/5
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{domain.focus}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Insights */}
        {showInsights && showDetails && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm text-foreground">Insights de tu Perfil</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dominant Domain */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: dominantDomain.color }}
                  >
                    {React.createElement(domainConfig[dominantDomain.domain as keyof typeof domainConfig].icon, {
                      className: "h-3 w-3 text-white",
                    })}
                  </div>
                  <h5 className="font-semibold text-sm text-primary">Dominio Dominante</h5>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">
                  {dominantDomain.domainEs} ({dominantDomain.value} fortalezas)
                </p>
                <p className="text-xs text-muted-foreground">
                  Tu enfoque principal está en {dominantDomain.focus.toLowerCase()}
                </p>
              </div>

              {/* Balance Score */}
              <div className="bg-muted/50 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <h5 className="font-semibold text-sm text-foreground">Balance del Perfil</h5>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">{balanceScore}% equilibrado</p>
                <p className="text-xs text-muted-foreground">
                  {balanceScore >= 75
                    ? "Perfil muy equilibrado entre dominios"
                    : balanceScore >= 50
                      ? "Perfil moderadamente equilibrado"
                      : "Perfil especializado en pocos dominios"}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <h5 className="font-semibold text-sm text-foreground mb-2">Recomendaciones</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {dominantDomain.value >= 3 && (
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      Aprovecha tu fortaleza en {dominantDomain.domainEs} para liderar iniciativas relacionadas
                    </span>
                  </li>
                )}
                {radarData.filter((d) => d.value === 0).length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      Considera desarrollar fortalezas en dominios menos representados para mayor versatilidad
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Busca colaboradores que complementen tus fortalezas en otros dominios</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-6 pt-2 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{totalStrengths}</div>
            <div className="text-xs text-muted-foreground">Fortalezas</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{radarData.filter((d) => d.value > 0).length}</div>
            <div className="text-xs text-muted-foreground">Dominios</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{balanceScore}%</div>
            <div className="text-xs text-muted-foreground">Balance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
