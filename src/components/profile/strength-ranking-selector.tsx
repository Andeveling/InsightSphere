"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Domain, Strength } from "@prisma/client";

interface StrengthRankingSelectorProps {
  domains: (Domain & {
    strengths: Strength[];
  })[];
  selectedRankings: { strengthId: string; position: number }[];
  onChange: (rankings: { strengthId: string; position: number }[]) => void;
  disabled?: boolean;
  name: string;
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
  4: Award,
  5: Award
};

const positionLabels = {
  1: "1ra Fortaleza",
  2: "2da Fortaleza", 
  3: "3ra Fortaleza",
  4: "4ta Fortaleza",
  5: "5ta Fortaleza"
};

export function StrengthRankingSelector({
  domains,
  selectedRankings,
  onChange,
  disabled,
  name
}: StrengthRankingSelectorProps) {
  const [rankings, setRankings] = useState<{ strengthId: string; position: number }[]>(selectedRankings);

  useEffect(() => {
    setRankings(selectedRankings);
  }, [selectedRankings]);

  const handleStrengthSelect = (strengthId: string) => {
    if (disabled) return;

    const existingRanking = rankings.find(r => r.strengthId === strengthId);
    
    if (existingRanking) {
      // Remove existing ranking
      const newRankings = rankings.filter(r => r.strengthId !== strengthId);
      setRankings(newRankings);
      onChange(newRankings);
    } else if (rankings.length < 5) {
      // Add new ranking with next available position
      const nextPosition = getNextAvailablePosition();
      const newRankings = [...rankings, { strengthId, position: nextPosition }];
      setRankings(newRankings);
      onChange(newRankings);
    }
  };

  const handlePositionChange = (strengthId: string, newPosition: number) => {
    if (disabled) return;

    const currentRankings = [...rankings];
    const currentIndex = currentRankings.findIndex(r => r.strengthId === strengthId);
    const targetIndex = currentRankings.findIndex(r => r.position === newPosition);

    if (currentIndex === -1) return;

    if (targetIndex !== -1) {
      // Swap positions
      const currentPosition = currentRankings[currentIndex].position;
      currentRankings[targetIndex].position = currentPosition;
      currentRankings[currentIndex].position = newPosition;
    } else {
      // Just update position
      currentRankings[currentIndex].position = newPosition;
    }

    setRankings(currentRankings);
    onChange(currentRankings);
  };

  const removeRanking = (strengthId: string) => {
    if (disabled) return;
    
    const newRankings = rankings.filter(r => r.strengthId !== strengthId);
    setRankings(newRankings);
    onChange(newRankings);
  };

  const getNextAvailablePosition = (): number => {
    const usedPositions = rankings.map(r => r.position);
    for (let i = 1; i <= 5; i++) {
      if (!usedPositions.includes(i)) {
        return i;
      }
    }
    return 1;
  };

  const getStrengthById = (strengthId: string) => {
    for (const domain of domains) {
      const strength = domain.strengths.find(s => s.id === strengthId);
      if (strength) {
        return { strength, domain };
      }
    }
    return null;
  };

  const isStrengthSelected = (strengthId: string) => {
    return rankings.some(r => r.strengthId === strengthId);
  };

  const getRankingPosition = (strengthId: string) => {
    const ranking = rankings.find(r => r.strengthId === strengthId);
    return ranking?.position;
  };

  // Sort rankings by position for display
  const sortedRankings = [...rankings].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-6">
      {/* Selected Rankings Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Tus TOP 5 Fortalezas
          </CardTitle>
          <CardDescription>
            Selecciona exactamente 5 fortalezas y ordénalas por prioridad (1-5)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(position => {
              const ranking = sortedRankings.find(r => r.position === position);
              const strengthData = ranking ? getStrengthById(ranking.strengthId) : null;
              const IconComponent = positionIcons[position as keyof typeof positionIcons];

              return (
                <div key={position} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <IconComponent className={cn(
                      "h-5 w-5",
                      position === 1 ? "text-yellow-600" : position === 2 ? "text-gray-500" : "text-orange-600"
                    )} />
                    <span className="font-medium text-sm">
                      {positionLabels[position as keyof typeof positionLabels]}
                    </span>
                  </div>
                  
                  {strengthData ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs",
                          domainColors[strengthData.domain.name as keyof typeof domainColors]
                        )}
                      >
                        {strengthData.domain.name}
                      </Badge>
                      <span className="font-medium">{strengthData.strength.name}</span>
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {strengthData.strength.description}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => ranking && removeRanking(ranking.strengthId)}
                        disabled={disabled}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 text-muted-foreground text-sm italic">
                      Selecciona una fortaleza...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            {rankings.length}/5 fortalezas seleccionadas
          </div>
        </CardContent>
      </Card>

      {/* Strength Selection by Domain */}
      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Selecciona tus Fortalezas</h4>
        <p className="text-sm text-muted-foreground">
          Haz clic en una fortaleza para agregarla a tu TOP 5. Puedes cambiar el orden después.
        </p>
        
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Badge 
                  className={cn(
                    "px-3 py-1",
                    domainColors[domain.name as keyof typeof domainColors]
                  )}
                >
                  {domain.name}
                </Badge>
                <CardTitle className="text-lg">{domain.description}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {domain.strengths.map((strength) => {
                  const isSelected = isStrengthSelected(strength.id);
                  const position = getRankingPosition(strength.id);
                  const canSelect = !isSelected && rankings.length < 5;

                  return (
                    <Button
                      key={strength.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "h-auto p-4 justify-start text-left relative",
                        !canSelect && !isSelected && "opacity-50 cursor-not-allowed",
                        isSelected && "ring-2 ring-primary ring-offset-2"
                      )}
                      onClick={() => handleStrengthSelect(strength.id)}
                      disabled={disabled || (!canSelect && !isSelected)}
                    >
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{strength.name}</span>
                          {isSelected && position && (
                            <Badge variant="secondary" className="text-xs">
                              #{position}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {strength.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hidden inputs for form submission */}
      {rankings.map((ranking, index) => (
        <div key={ranking.strengthId}>
          <input
            type="hidden"
            name={`${name}[${index}].strengthId`}
            value={ranking.strengthId}
          />
          <input
            type="hidden"
            name={`${name}[${index}].position`}
            value={ranking.position}
          />
        </div>
      ))}
    </div>
  );
}
