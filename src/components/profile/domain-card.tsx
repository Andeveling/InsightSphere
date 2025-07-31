"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Brain, Heart, Zap, Cog, ChevronDown, ChevronUp, AlertTriangle, Users, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Domain } from "@prisma/client"

interface DomainCardProps {
  domain: Domain
  strengthsCount?: number
  className?: string
  variant?: "default" | "compact" | "detailed"
}

// Domain configuration using CSS variables
const domainConfig = {
  Doing: {
    color: "bg-chart-1",
    lightColor: "bg-chart-1/10",
    textColor: "text-chart-1",
    borderColor: "border-chart-1/30",
    ringColor: "ring-chart-1/20",
    icon: Cog,
    gradient: "from-chart-1/20 to-chart-1/5",
  },
  Feeling: {
    color: "bg-chart-2",
    lightColor: "bg-chart-2/10",
    textColor: "text-chart-2",
    borderColor: "border-chart-2/30",
    ringColor: "ring-chart-2/20",
    icon: Heart,
    gradient: "from-chart-2/20 to-chart-2/5",
  },
  Motivating: {
    color: "bg-chart-3",
    lightColor: "bg-chart-3/10",
    textColor: "text-chart-3",
    borderColor: "border-chart-3/30",
    ringColor: "ring-chart-3/20",
    icon: Zap,
    gradient: "from-chart-3/20 to-chart-3/5",
  },
  Thinking: {
    color: "bg-chart-4",
    lightColor: "bg-chart-4/10",
    textColor: "text-chart-4",
    borderColor: "border-chart-4/30",
    ringColor: "ring-chart-4/20",
    icon: Brain,
    gradient: "from-chart-4/20 to-chart-4/5",
  },
}

export function DomainCard({ domain, strengthsCount, className, variant = "default" }: DomainCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDetails, setShowDetails] = useState(variant === "detailed")

  const domainInfo = domainConfig[domain.name as keyof typeof domainConfig] || domainConfig.Doing
  const DomainIcon = domainInfo.icon

  const contributionList = Array.isArray(domain.contributionToTeam)
    ? (domain.contributionToTeam as string[])
    : domain.contributionToTeam
      ? [domain.contributionToTeam as string]
      : []

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "border transition-all duration-200 hover:shadow-md cursor-pointer",
          domainInfo.borderColor,
          domainInfo.lightColor,
          className,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", domainInfo.color)}>
              <DomainIcon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn("font-semibold text-sm", domainInfo.textColor)}>{domain.nameEs || domain.name}</h3>
                {strengthsCount !== undefined && strengthsCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {strengthsCount}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{domain.summary}</p>
            </div>
            <ChevronDown
              className={cn("h-4 w-4 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
            />
          </div>
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">{domain.keyQuestion}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "h-full border-2 transition-all duration-300 hover:shadow-lg group",
        domainInfo.borderColor,
        strengthsCount && strengthsCount > 0 && `ring-2 ${domainInfo.ringColor}`,
        className,
      )}
    >
      {/* Header with gradient background */}
      <CardHeader className={cn("relative overflow-hidden bg-gradient-to-br", domainInfo.gradient)}>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105",
                  domainInfo.color,
                )}
              >
                <DomainIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <Badge variant="outline" className={cn("text-xs font-medium mb-2", domainInfo.textColor)}>
                  {domain.name}
                </Badge>
                <CardTitle className={cn("text-lg font-bold", domainInfo.textColor)}>
                  {domain.nameEs || domain.name}
                </CardTitle>
              </div>
            </div>
            {strengthsCount !== undefined && (
              <div className="text-right">
                <div className={cn("text-2xl font-bold", domainInfo.textColor)}>{strengthsCount}</div>
                <div className="text-xs text-muted-foreground">fortaleza{strengthsCount !== 1 ? "s" : ""}</div>
              </div>
            )}
          </div>

          {domain.metaphor && (
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <CardDescription className="text-sm font-medium italic text-center">"{domain.metaphor}"</CardDescription>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Key Question */}
        {domain.keyQuestion && (
          <div className={cn("p-3 rounded-lg border-l-4", domainInfo.lightColor, domainInfo.borderColor)}>
            <div className="flex items-start gap-2">
              <Lightbulb className={cn("h-4 w-4 mt-0.5 flex-shrink-0", domainInfo.textColor)} />
              <div>
                <h4 className="font-medium text-sm text-foreground mb-1">Pregunta Clave:</h4>
                <p className="text-sm text-muted-foreground italic">"{domain.keyQuestion}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">{domain.summary}</p>
        </div>

        {/* Toggle Details Button */}
        {(contributionList.length > 0 || domain.potentialPitfall) && (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="h-8 px-3 text-xs">
              {showDetails ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Ocultar detalles
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Ver detalles
                </>
              )}
            </Button>
          </div>
        )}

        {/* Detailed Information */}
        {showDetails && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {contributionList.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm text-foreground">Contribución al Equipo</h4>
                  </div>
                  <div className="space-y-2">
                    {contributionList.map((contribution, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", domainInfo.color)} />
                        <span className="text-xs text-muted-foreground leading-relaxed">{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {domain.potentialPitfall && (
              <>
                <Separator />
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <h4 className="font-medium text-sm text-destructive">Posible Trampa</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{domain.potentialPitfall}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Dominio: {domain.name}</span>
            {strengthsCount !== undefined && (
              <span className={cn("font-medium", strengthsCount > 0 ? domainInfo.textColor : "text-muted-foreground")}>
                {strengthsCount > 0 ? `${strengthsCount} activa${strengthsCount !== 1 ? "s" : ""}` : "Sin fortalezas"}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
