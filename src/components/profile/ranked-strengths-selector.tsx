import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, Trophy, Medal, Award, Target } from "lucide-react";
import type { Domain, Strength } from "@prisma/client";

interface StrengthWithDomain extends Strength {
  domain: Domain;
}

interface RankedStrengthsSelectorProps {
  domains: (Domain & { strengths: Strength[] })[];
  selectedStrengths: { strengthId: string; position?: number | null }[];
  onChange: (rankings: { strengthId: string; position: number }[]) => void;
  disabled?: boolean;
}

const DOMAIN_COLORS = {
  "Doing": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Feeling": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", 
  "Motivating": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Thinking": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
};

const POSITION_ICONS = {
  1: Trophy,
  2: Medal, 
  3: Award,
  4: Target,
  5: Star
};

const POSITION_LABELS = {
  1: "1ra Fortaleza",
  2: "2da Fortaleza", 
  3: "3ra Fortaleza",
  4: "4ta Fortaleza",
  5: "5ta Fortaleza"
};

export function RankedStrengthsSelector({ 
  domains, 
  selectedStrengths, 
  onChange,
  disabled = false 
}: RankedStrengthsSelectorProps) {
  const [rankings, setRankings] = useState<{ strengthId: string; position: number }[]>([]);

  // Initialize rankings from selectedStrengths
  useEffect(() => {
    const initialRankings = selectedStrengths
      .filter(s => s.position !== null && s.position !== undefined)
      .map(s => ({ strengthId: s.strengthId, position: s.position! }))
      .sort((a, b) => a.position - b.position);
    
    setRankings(initialRankings);
  }, [selectedStrengths]);

  // Create a flat list of all strengths with their domains
  const allStrengths: StrengthWithDomain[] = domains.flatMap(domain => 
    domain.strengths.map(strength => ({ ...strength, domain }))
  );

  const handleStrengthClick = (strength: StrengthWithDomain) => {
    if (disabled) return;

    const existingRank = rankings.find(r => r.strengthId === strength.id);
    
    if (existingRank) {
      // Remove from rankings
      const newRankings = rankings
        .filter(r => r.strengthId !== strength.id)
        .map((r, index) => ({ ...r, position: index + 1 })); // Reorder positions
      
      setRankings(newRankings);
      onChange(newRankings);
    } else if (rankings.length < 5) {
      // Add to rankings
      const newRankings = [
        ...rankings, 
        { strengthId: strength.id, position: rankings.length + 1 }
      ];
      
      setRankings(newRankings);
      onChange(newRankings);
    }
  };

  const getStrengthPosition = (strengthId: string): number | null => {
    return rankings.find(r => r.strengthId === strengthId)?.position || null;
  };

  const getRankedStrength = (position: number): StrengthWithDomain | null => {
    const ranking = rankings.find(r => r.position === position);
    if (!ranking) return null;
    return allStrengths.find(s => s.id === ranking.strengthId) || null;
  };

  return (
    <div className="space-y-8">
      {/* Top 5 Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Tu TOP 5 de Fortalezas
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(position => {
            const strength = getRankedStrength(position);
            const Icon = POSITION_ICONS[position as keyof typeof POSITION_ICONS];
            
            return (
              <Card key={position} className={cn(
                "border-2 border-dashed transition-all",
                strength 
                  ? "border-solid border-primary bg-primary/5" 
                  : "border-muted-foreground/25 bg-muted/20"
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {POSITION_LABELS[position as keyof typeof POSITION_LABELS]}
                    </Badge>
                    <Icon className={cn(
                      "h-4 w-4",
                      strength ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {strength ? (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm leading-tight">
                        {strength.name} / {strength.nameEs}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", DOMAIN_COLORS[strength.domain.name as keyof typeof DOMAIN_COLORS])}
                      >
                        {strength.domain.name}
                      </Badge>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {strength.description}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-xs text-muted-foreground">
                        Selecciona una fortaleza
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Has seleccionado {rankings.length} de 5 fortalezas
          </p>
          {rankings.length === 5 && (
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              ¡Perfecto! Has completado tu TOP 5 de fortalezas
            </p>
          )}
        </div>
      </div>

      {/* Strength Selection Grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">
          Selecciona tus Fortalezas
        </h3>
        
        {domains.map(domain => (
          <div key={domain.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-base">{domain.name}</h4>
              <Badge 
                variant="outline" 
                className={DOMAIN_COLORS[domain.name as keyof typeof DOMAIN_COLORS]}
              >
                {domain.strengths.length} fortalezas
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {domain.strengths.map(strength => {
                const strengthWithDomain = { ...strength, domain };
                const position = getStrengthPosition(strength.id);
                const isSelected = position !== null;
                
                return (
                  <Button
                    key={strength.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleStrengthClick(strengthWithDomain)}
                    disabled={disabled || (!isSelected && rankings.length >= 5)}
                    className={cn(
                      "h-auto p-4 text-left flex flex-col items-start gap-2 relative",
                      isSelected && "ring-2 ring-primary ring-offset-2"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {position}
                      </div>
                    )}
                    
                    <div className="space-y-1 w-full">
                      <h5 className="font-medium text-sm leading-tight">
                        {strength.name} / {strength.nameEs}
                      </h5>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {strength.description}
                      </p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Hidden inputs for form submission */}
      {rankings.map(ranking => (
        <input
          key={ranking.strengthId}
          type="hidden"
          name="strengthRankings"
          value={JSON.stringify(ranking)}
        />
      ))}
    </div>
  );
}
