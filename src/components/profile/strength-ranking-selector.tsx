"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Target, Star, Brain, Heart, Zap, Cog } from "lucide-react";
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

// Domain color mappings with icons
const domainConfig = {
  "Doing": {
    color: "bg-blue-500",
    lightColor: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: Cog,
  },
  "Feeling": {
    color: "bg-pink-500", 
    lightColor: "bg-pink-100 dark:bg-pink-900/20",
    textColor: "text-pink-700 dark:text-pink-300",
    borderColor: "border-pink-200 dark:border-pink-800",
    icon: Heart,
  },
  "Motivating": {
    color: "bg-orange-500",
    lightColor: "bg-orange-100 dark:bg-orange-900/20", 
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
    icon: Zap,
  },
  "Thinking": {
    color: "bg-purple-500",
    lightColor: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-300", 
    borderColor: "border-purple-200 dark:border-purple-800",
    icon: Brain,
  }
};

const rankIcons = [Trophy, Medal, Award, Target, Star];
const rankLabels = ["1ra Fortaleza", "2da Fortaleza", "3ra Fortaleza", "4ta Fortaleza", "5ta Fortaleza"];

export function StrengthRankingSelector({
  domains,
  selectedRankings,
  onChange,
  disabled,
  name
}: StrengthRankingSelectorProps) {
  // Convert rankings format to positions array for easier handling
  const [selectedStrengths, setSelectedStrengths] = useState<(string | null)[]>([null, null, null, null, null]);

  // Initialize from selectedRankings
  useEffect(() => {
    const positions: (string | null)[] = [null, null, null, null, null];
    selectedRankings.forEach(ranking => {
      if (ranking.position >= 1 && ranking.position <= 5) {
        positions[ranking.position - 1] = ranking.strengthId;
      }
    });
    setSelectedStrengths(positions);
  }, [selectedRankings]);

  const getDomainConfig = (domainName: string) => {
    return domainConfig[domainName as keyof typeof domainConfig] || domainConfig.Doing;
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

  const handleStrengthSelect = (position: number, strengthId: string) => {
    if (disabled) return;

    const newSelected = [...selectedStrengths];

    // Si la fortaleza ya está seleccionada en otra posición, la removemos
    const existingIndex = newSelected.indexOf(strengthId);
    if (existingIndex !== -1) {
      newSelected[existingIndex] = null;
    }

    newSelected[position] = strengthId;
    setSelectedStrengths(newSelected);

    // Convert back to rankings format
    const newRankings = newSelected
      .map((strengthId, index) => strengthId ? { strengthId, position: index + 1 } : null)
      .filter(Boolean) as { strengthId: string; position: number }[];
    
    onChange(newRankings);
  };

  const getAvailableStrengths = (currentPosition: number) => {
    const currentSelection = selectedStrengths[currentPosition];
    const allStrengths: (Strength & { domain: Domain })[] = [];
    
    domains.forEach(domain => {
      domain.strengths.forEach(strength => {
        allStrengths.push({ ...strength, domain });
      });
    });

    return allStrengths.filter(
      (strength) => !selectedStrengths.includes(strength.id) || strength.id === currentSelection
    );
  };

  const selectedCount = selectedStrengths.filter((s) => s !== null).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Selecciona tus TOP 5 Fortalezas
          </CardTitle>
          <p className="text-muted-foreground">
            Elige exactamente 5 fortalezas que mejor te representen y ordénalas por prioridad (1-5).
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedCount}/5 fortalezas seleccionadas
            </Badge>
          </div>

          <div className="space-y-4">
            {selectedStrengths.map((selectedStrengthId, index) => {
              const RankIcon = rankIcons[index];
              const availableStrengths = getAvailableStrengths(index);
              const strengthData = selectedStrengthId ? getStrengthById(selectedStrengthId) : null;
              const domainInfo = strengthData ? getDomainConfig(strengthData.domain.name) : null;

              return (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <RankIcon 
                      className={cn(
                        "h-6 w-6",
                        index === 0 ? "text-yellow-600" : 
                        index === 1 ? "text-gray-500" : 
                        "text-orange-600"
                      )} 
                    />
                    <span className="font-medium">{rankLabels[index]}</span>
                  </div>

                  <div className="flex-1">
                    <Select
                      value={selectedStrengthId || ""}
                      onValueChange={(value) => handleStrengthSelect(index, value)}
                      disabled={disabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una fortaleza..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStrengths.map((strength) => {
                          const domainConfig = getDomainConfig(strength.domain.name);
                          const DomainIcon = domainConfig.icon;

                          return (
                            <SelectItem
                              key={strength.id}
                              value={strength.id}
                            >
                              <div className="flex items-start gap-3 w-full py-2">
                                <div className={cn("p-1 rounded", domainConfig.color)}>
                                  <DomainIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium">{strength.nameEs || strength.name}</div>
                                  <div className="text-xs text-muted-foreground">{strength.name} • {strength.domain.nameEs || strength.domain.name}</div>
                                  {strength.briefDefinition && (
                                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {strength.briefDefinition}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {strengthData && domainInfo && (
                    <div className="flex items-center gap-2">
                      <Badge className={cn(domainInfo.color, "text-white")}>
                        {strengthData.domain.name}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedCount === 5 && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <h3 className="text-green-800 dark:text-green-200 font-bold text-lg mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  ¡Perfecto! Has seleccionado tus TOP 5 Fortalezas
                </h3>
                <div className="space-y-2">
                  {selectedStrengths.map((strengthId, index) => {
                    if (!strengthId) return null;
                    const strengthData = getStrengthById(strengthId);
                    if (!strengthData) return null;

                    const domainInfo = getDomainConfig(strengthData.domain.name);
                    const RankIcon = rankIcons[index];

                    return (
                      <div key={index} className="flex items-center gap-3 text-green-800 dark:text-green-200">
                        <RankIcon className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">{index + 1}.</span>
                        <span className="font-medium">{strengthData.strength.nameEs || strengthData.strength.name}</span>
                        <span className="text-sm text-muted-foreground">({strengthData.strength.name})</span>
                        <Badge className={cn(domainInfo.color, "text-white text-xs")}>
                          {strengthData.domain.name}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Domain Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {domains.map((domain) => {
              const config = getDomainConfig(domain.name);
              const DomainIcon = config.icon;
              
              return (
                <Card key={domain.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn("p-2 rounded", config.color)}>
                        <DomainIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold">{domain.nameEs || domain.name}</h4>
                        <p className="text-xs text-muted-foreground">{domain.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {domain.summary || domain.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className={cn(config.textColor, config.borderColor, "text-xs")}>
                        {domain.strengths.length} fortalezas
                      </Badge>
                      {domain.metaphor && (
                        <Badge variant="secondary" className="text-xs">
                          {domain.metaphor}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hidden inputs for form submission */}
      {selectedStrengths.map((strengthId, index) => {
        if (!strengthId) return null;
        return (
          <div key={strengthId}>
            <input
              type="hidden"
              name={`${name}[${index}].strengthId`}
              value={strengthId}
            />
            <input
              type="hidden"
              name={`${name}[${index}].position`}
              value={index + 1}
            />
          </div>
        );
      })}
    </div>
  );
}
