"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DomainSection, type Domain, type Strength } from "./domain-section";
import { cn } from "@/lib/utils";
import { Info, CheckCircle, AlertCircle } from "lucide-react";

interface StrengthsSelectorProps {
  domains: Array<{
    id: string;
    name: string;
    description: string;
    strengths: Array<{
      id: string;
      name: string;
      nameEs?: string;
      description: string;
      domainId: string;
    }>;
  }>;
  selectedIds?: string[];
  name?: string;
  maxSelections?: number;
  disabled?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function StrengthsSelector({
  domains,
  selectedIds = [],
  name = "strengthIds",
  maxSelections = 5,
  disabled = false,
  showProgress = true,
  className,
}: StrengthsSelectorProps) {
  const [selectedStrengthIds, setSelectedStrengthIds] = useState<string[]>(selectedIds);

  // Transform domains data to match DomainSection interface
  const transformedDomains = useMemo(() => {
    return domains.map(domain => ({
      ...domain,
      strengths: domain.strengths.map(strength => ({
        ...strength,
        domain: {
          id: domain.id,
          name: domain.name,
          description: domain.description,
        }
      }))
    }));
  }, [domains]);

  // Update local state when selectedIds changes
  useEffect(() => {
    setSelectedStrengthIds(selectedIds);
  }, [selectedIds]);

  const handleStrengthSelect = useCallback((strengthId: string) => {
    if (disabled) return;

    setSelectedStrengthIds(prev => {
      const isCurrentlySelected = prev.includes(strengthId);
      
      if (isCurrentlySelected) {
        // Remove selection
        return prev.filter(id => id !== strengthId);
      } else {
        // Add selection if under limit
        if (prev.length < maxSelections) {
          return [...prev, strengthId];
        }
        return prev;
      }
    });
  }, [disabled, maxSelections]);

  const selectedCount = selectedStrengthIds.length;
  const isComplete = selectedCount === maxSelections;
  const canSelectMore = selectedCount < maxSelections;
  const remaining = maxSelections - selectedCount;

  // Calculate statistics
  const domainStats = transformedDomains.map(domain => {
    const selectedInDomain = domain.strengths.filter(strength => 
      selectedStrengthIds.includes(strength.id)
    ).length;
    
    return {
      domain: domain.name,
      selected: selectedInDomain,
      total: domain.strengths.length,
      percentage: Math.round((selectedInDomain / domain.strengths.length) * 100)
    };
  });

  const getProgressColor = () => {
    const percentage = (selectedCount / maxSelections) * 100;
    if (percentage < 40) return "bg-red-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusMessage = () => {
    if (selectedCount === 0) {
      return "Selecciona tus fortalezas principales para continuar";
    }
    if (selectedCount < maxSelections) {
      return `Faltan ${remaining} fortaleza${remaining !== 1 ? 's' : ''} por seleccionar`;
    }
    return "¡Perfecto! Has seleccionado tus 5 fortalezas principales";
  };

  const getStatusIcon = () => {
    if (selectedCount === 0) return Info;
    if (selectedCount < maxSelections) return AlertCircle;
    return CheckCircle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className={cn("space-y-6", className)} role="region" aria-label="Selector de fortalezas">
      {/* Hidden inputs for form submission */}
      <input
        type="hidden" 
        name={name}
        value={JSON.stringify(selectedStrengthIds)}
        readOnly
      />
      
      {/* Progress Header */}
      {showProgress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Selección de Fortalezas</span>
              <Badge 
                variant={isComplete ? "default" : "secondary"}
                className={cn(
                  "font-semibold",
                  isComplete && "bg-green-100 text-green-800 border-green-300"
                )}
              >
                {selectedCount} / {maxSelections}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progreso</span>
                <span>{Math.round((selectedCount / maxSelections) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    getProgressColor()
                  )}
                  style={{ width: `${(selectedCount / maxSelections) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={selectedCount}
                  aria-valuemin={0}
                  aria-valuemax={maxSelections}
                  aria-label={`${selectedCount} de ${maxSelections} fortalezas seleccionadas`}
                />
              </div>
            </div>

            {/* Status Message */}
            <Alert className={cn(
              isComplete && "border-green-200 bg-green-50",
              selectedCount === 0 && "border-blue-200 bg-blue-50"
            )}>
              <StatusIcon className={cn(
                "h-4 w-4",
                isComplete && "text-green-600",
                selectedCount === 0 && "text-blue-600",
                selectedCount > 0 && selectedCount < maxSelections && "text-yellow-600"
              )} />
              <AlertDescription className={cn(
                isComplete && "text-green-800",
                selectedCount === 0 && "text-blue-800"
              )}>
                {getStatusMessage()}
              </AlertDescription>
            </Alert>

            {/* Domain Statistics */}
            {selectedCount > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {domainStats.map(stat => (
                  <div key={stat.domain} className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-muted-foreground">{stat.domain}</div>
                    <div className="font-semibold text-sm">
                      {stat.selected} / {stat.total}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Domain Sections */}
      <div className="space-y-6">
        {transformedDomains.map((domain) => (
          <DomainSection
            key={domain.id}
            domain={domain}
            strengths={domain.strengths}
            selectedStrengthIds={selectedStrengthIds}
            onStrengthSelect={handleStrengthSelect}
            maxSelections={maxSelections}
          />
        ))}
      </div>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tus Fortalezas Seleccionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedStrengthIds.map(strengthId => {
                // Find the strength name
                const strength = transformedDomains
                  .flatMap(d => d.strengths)
                  .find(s => s.id === strengthId);
                
                if (!strength) return null;

                const domainName = strength.domain.name as keyof typeof domainBadgeColors;
                const badgeColorClass = domainBadgeColors[domainName] || domainBadgeColors.Thinking;

                return (
                  <Badge 
                    key={strengthId}
                    variant="secondary"
                    className={cn("font-medium", badgeColorClass)}
                  >
                    {strength.name} / {strength.nameEs}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Domain badge colors for consistency
const domainBadgeColors = {
  Doing: "bg-blue-100 text-blue-800",
  Feeling: "bg-green-100 text-green-800",
  Motivating: "bg-purple-100 text-purple-800",
  Thinking: "bg-orange-100 text-orange-800",
} as const;

export type { StrengthsSelectorProps };
