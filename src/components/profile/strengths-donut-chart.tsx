"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { Domain, Strength, User, UserStrength } from "@prisma/client"
import { BarChart3, Brain, Cog, Heart, Info, TrendingUp, Zap } from "lucide-react"
import { useState } from "react"
import { Cell, Pie, PieChart } from "recharts"

interface StrengthsDonutChartProps {
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

export function StrengthsDonutChart({ user, className, showInsights = true }: StrengthsDonutChartProps) {
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

  // Chart configuration for shadcn/ui
  const chartConfig = {
    count: {
      label: "Fortalezas",
    },
    Doing: {
      label: "Hacer",
      color: "hsl(var(--chart-1))",
    },
    Feeling: {
      label: "Sentir",
      color: "hsl(var(--chart-2))",
    },
    Motivating: {
      label: "Motivar",
      color: "hsl(var(--chart-3))",
    },
    Thinking: {
      label: "Pensar",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  // Prepare data for donut chart - only include domains with strengths
  const chartData = Object.entries(domainConfig)
    .map(([domainName, config], index) => {
      const count = domainDistribution[domainName] || 0
      return {
        domain: domainName,
        domainEs:
          domainName === "Doing"
            ? "Hacer"
            : domainName === "Feeling"
              ? "Sentir"
              : domainName === "Motivating"
                ? "Motivar"
                : "Pensar",
        count,
        percentage: 0, // Will be calculated after filtering
        fill: config.color, // Use the actual color from domainConfig
        color: config.color,
        description: config.description,
        focus: config.focus,
      }
    })
    .filter((item) => item.count > 0) // Only show domains with strengths

  // Calculate percentages for domains with strengths
  const totalStrengths = chartData.reduce((sum, item) => sum + item.count, 0)
  chartData.forEach((item) => {
    item.percentage = totalStrengths > 0 ? Math.round((item.count / totalStrengths) * 100) : 0
  })

  // All domain data for legend (including zeros)
  const allDomainsData = Object.entries(domainConfig).map(([domainName, config]) => ({
    domain: domainName,
    domainEs:
      domainName === "Doing"
        ? "Hacer"
        : domainName === "Feeling"
          ? "Sentir"
          : domainName === "Motivating"
            ? "Motivar"
            : "Pensar",
    count: domainDistribution[domainName] || 0,
    color: config.color,
    icon: config.icon,
    description: config.description,
    focus: config.focus,
  }))

  // Calculate insights
  const dominantDomain = allDomainsData.reduce((prev, current) => (prev.count > current.count ? prev : current))
  const activeDomainsCount = allDomainsData.filter((d) => d.count > 0).length
  const balanceScore = activeDomainsCount > 0 ? Math.round((activeDomainsCount / 4) * 100) : 0

  if (totalStrengths === 0) {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-3 shadow-sm">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Distribución de Fortalezas</CardTitle>
          <CardDescription>Visualiza cómo se distribuyen tus fortalezas por dominio</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Completa tu perfil para ver la distribución de tus fortalezas
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
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Distribución de Fortalezas</CardTitle>
              <CardDescription className="text-sm">
                Cómo se reparten tus {totalStrengths} fortalezas entre dominios
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
        {/* Donut Chart */}
        <div className="relative flex items-center justify-center">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px] min-h-[280px]">
            <PieChart width={280} height={280}>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
                          <span className="font-medium text-foreground">{data.domainEs}</span>
                        </div>
                        <p className="text-sm text-foreground mb-1">
                          <span className="font-bold">{data.count}</span> fortaleza{data.count > 1 ? "s" : ""}{" "}
                          <span className="text-muted-foreground"> ({data.percentage}%)</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{data.focus}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          {/* Center Stats Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalStrengths}</div>
              <div className="text-sm text-muted-foreground">Fortalezas</div>
            </div>
          </div>
        </div>

        {/* Domain Legend - All domains */}
        <div className="grid grid-cols-2 gap-3">
          {allDomainsData.map((domain) => {
            const DomainIcon = domain.icon
            const percentage = totalStrengths > 0 ? Math.round((domain.count / totalStrengths) * 100) : 0
            return (
              <div
                key={domain.domain}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  domain.count > 0
                    ? "border-primary/30 bg-primary/5 ring-1 ring-primary/10"
                    : "border-border/50 bg-muted/20",
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: domain.color }}
                  >
                    <DomainIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-foreground">{domain.domainEs}</h4>
                      <Badge variant={domain.count > 0 ? "default" : "secondary"} className="text-xs">
                        {domain.count}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">{domain.focus}</p>
                      {domain.count > 0 && <span className="text-xs font-medium text-primary">{percentage}%</span>}
                    </div>
                  </div>
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
              <h4 className="font-medium text-sm text-foreground">Análisis de tu Perfil</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dominant Domain */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: dominantDomain.color }}
                  >
                    {React.createElement(dominantDomain.icon, {
                      className: "h-3 w-3 text-white",
                    })}
                  </div>
                  <h5 className="font-semibold text-sm text-primary">Fortaleza Principal</h5>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">
                  {dominantDomain.domainEs} ({dominantDomain.count} fortaleza{dominantDomain.count > 1 ? "s" : ""})
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round((dominantDomain.count / totalStrengths) * 100)}% de tu perfil se enfoca en{" "}
                  {dominantDomain.focus.toLowerCase()}
                </p>
              </div>
              {/* Diversity Score */}
              <div className="bg-muted/50 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <h5 className="font-semibold text-sm text-foreground">Diversidad</h5>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">{activeDomainsCount} de 4 dominios activos</p>
                <p className="text-xs text-muted-foreground">
                  {balanceScore >= 75
                    ? "Perfil muy diverso y equilibrado"
                    : balanceScore >= 50
                      ? "Perfil moderadamente diverso"
                      : "Perfil especializado y enfocado"}
                </p>
              </div>
            </div>
            {/* Recommendations */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <h5 className="font-semibold text-sm text-foreground mb-2">Recomendaciones</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {dominantDomain.count >= 2 && (
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      Lidera proyectos que requieran {dominantDomain.domainEs.toLowerCase()}, es tu zona de mayor
                      fortaleza
                    </span>
                  </li>
                )}
                {activeDomainsCount < 4 && (
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      Considera desarrollar fortalezas en los dominios sin representación para mayor versatilidad
                    </span>
                  </li>
                )}
                {activeDomainsCount >= 3 && (
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Tu perfil diverso te permite adaptarte bien a diferentes roles y equipos</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Busca colaboradores que complementen tus áreas menos desarrolladas</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-6 pt-2 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{totalStrengths}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{activeDomainsCount}</div>
            <div className="text-xs text-muted-foreground">Dominios</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{balanceScore}%</div>
            <div className="text-xs text-muted-foreground">Diversidad</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
