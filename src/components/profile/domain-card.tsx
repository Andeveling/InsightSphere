"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Domain } from "@prisma/client";

interface DomainCardProps {
  domain: Domain;
  strengthsCount?: number;
  className?: string;
}

// Domain color mappings
const domainColors = {
  "Doing": "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  "Feeling": "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800", 
  "Motivating": "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800",
  "Thinking": "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800"
};

export function DomainCard({ domain, strengthsCount, className }: DomainCardProps) {
  const contributionList = Array.isArray(domain.contributionToTeam) 
    ? domain.contributionToTeam as string[]
    : [];

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline"
            className={cn(
              "text-sm font-medium",
              domainColors[domain.name as keyof typeof domainColors]
            )}
          >
            {domain.name} - {domain.nameEs}
          </Badge>
          {strengthsCount !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {strengthsCount} fortaleza{strengthsCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <div>
          <CardTitle className="text-lg">
            {domain.metaphor}
          </CardTitle>
          <CardDescription className="text-sm mt-1">
            {domain.keyQuestion}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {domain.summary}
          </p>
        </div>

        {contributionList.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-sm mb-2 text-foreground">
                Contribución al Equipo:
              </h4>
              <ul className="space-y-1">
                {contributionList.map((contribution, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {domain.potentialPitfall && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-sm mb-2 text-destructive">
                Posible Trampa:
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {domain.potentialPitfall}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
