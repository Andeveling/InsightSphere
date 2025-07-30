"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User, UserStrength, Strength, Domain } from "@prisma/client";

interface StrengthsDisplayProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength & {
        domain: Domain;
      };
    })[];
  };
  className?: string;
}

// Domain color mappings
const domainColors = {
  "Doing": "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  "Feeling": "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800", 
  "Motivating": "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800",
  "Thinking": "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800"
};

const positionIcons = {
  1: Trophy,
  2: Medal,
  3: Award,
  4: Star,
  5: Star
};

const positionColors = {
  1: "text-yellow-600",
  2: "text-gray-500",
  3: "text-orange-600",
  4: "text-blue-500",
  5: "text-green-500"
};

const positionLabels = {
  1: "1ra Fortaleza Principal",
  2: "2da Fortaleza",
  3: "3ra Fortaleza", 
  4: "4ta Fortaleza",
  5: "5ta Fortaleza"
};

export function StrengthsDisplay({ user, className }: StrengthsDisplayProps) {
  // Sort strengths by position (if available) or by strengthId
  const sortedStrengths = [...user.userStrengths].sort((a, b) => {
    if (a.position !== null && b.position !== null) {
      return a.position - b.position;
    }
    if (a.position !== null) return -1;
    if (b.position !== null) return 1;
    return a.strengthId.localeCompare(b.strengthId);
  });

  if (sortedStrengths.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            Tus Fortalezas HIGH5
          </CardTitle>
          <CardDescription>
            Aún no has seleccionado tus fortalezas principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Completa tu perfil para ver tus fortalezas HIGH5</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Tus TOP 5 Fortalezas HIGH5
        </CardTitle>
        <CardDescription>
          Estas son las fortalezas que mejor te representan, ordenadas por prioridad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedStrengths.map((userStrength, index) => {
            const { strength } = userStrength;
            const position = userStrength.position || (index + 1);
            const IconComponent = positionIcons[position as keyof typeof positionIcons] || Star;
            const iconColor = positionColors[position as keyof typeof positionColors] || "text-gray-400";
            const positionLabel = positionLabels[position as keyof typeof positionLabels] || `${position}ta Fortaleza`;

            return (
              <div
                key={userStrength.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                {/* Position Icon */}
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <IconComponent className={cn("h-6 w-6", iconColor)} />
                  <span className="text-xs font-medium text-muted-foreground">
                    #{position}
                  </span>
                </div>

                {/* Strength Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant="outline"
                      className={cn(
                        "text-xs",
                        domainColors[strength.domain.name as keyof typeof domainColors]
                      )}
                    >
                      {strength.domain.name}
                    </Badge>
                    <h4 className="font-semibold text-lg text-foreground">
                      {strength.name}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {strength.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground font-medium">
                    {positionLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary by Domain */}
        <div className="mt-6 pt-4 border-t border-border/40">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">
            Distribución por Dominio
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(sortedStrengths.map(us => us.strength.domain.name))).map(domainName => {
              const count = sortedStrengths.filter(us => us.strength.domain.name === domainName).length;
              return (
                <Badge
                  key={domainName}
                  variant="outline"
                  className={cn(
                    "text-xs",
                    domainColors[domainName as keyof typeof domainColors]
                  )}
                >
                  {domainName} ({count})
                </Badge>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
