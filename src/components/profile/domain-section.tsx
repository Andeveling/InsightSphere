"use client";

import { Badge } from "@/components/ui/badge";
import { StrengthCard } from "./strength-card";
import { cn } from "@/lib/utils";

interface Domain {
  id: string;
  name: string;
  description: string;
}

interface Strength {
  id: string;
  name: string;
  description: string;
  domain: Domain;
}

interface DomainSectionProps {
  domain: Domain;
  strengths: Strength[];
  selectedStrengthIds: string[];
  onStrengthSelect: (strengthId: string) => void;
  maxSelections: number;
  className?: string;
}

// Domain color mapping consistent with StrengthCard
const domainHeaderColors = {
  Doing: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  Feeling: "bg-gradient-to-r from-green-500 to-green-600 text-white",
  Motivating: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
  Thinking: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
} as const;

const domainBorderColors = {
  Doing: "border-blue-200",
  Feeling: "border-green-200",
  Motivating: "border-purple-200",
  Thinking: "border-orange-200",
} as const;

const domainBadgeColors = {
  Doing: "bg-blue-100 text-blue-800",
  Feeling: "bg-green-100 text-green-800",
  Motivating: "bg-purple-100 text-purple-800",
  Thinking: "bg-orange-100 text-orange-800",
} as const;

export function DomainSection({
  domain,
  strengths,
  selectedStrengthIds,
  onStrengthSelect,
  maxSelections,
  className,
}: DomainSectionProps) {
  const domainName = domain.name as keyof typeof domainHeaderColors;
  const headerColorClass = domainHeaderColors[domainName] || domainHeaderColors.Thinking;
  const borderColorClass = domainBorderColors[domainName] || domainBorderColors.Thinking;
  const badgeColorClass = domainBadgeColors[domainName] || domainBadgeColors.Thinking;

  const selectedCount = selectedStrengthIds.length;
  const canSelectMore = selectedCount < maxSelections;

  // Count how many strengths are selected in this domain
  const selectedInDomain = strengths.filter(strength => 
    selectedStrengthIds.includes(strength.id)
  ).length;

  return (
    <section 
      className={cn(
        "rounded-lg border-2 overflow-hidden shadow-sm",
        borderColorClass,
        className
      )}
      aria-labelledby={`domain-${domain.id}-title`}
    >
      {/* Domain Header */}
      <header className={cn("px-6 py-4", headerColorClass)}>
        <div className="flex items-center justify-between mb-2">
          <h2 
            id={`domain-${domain.id}-title`}
            className="text-xl font-bold"
          >
            {domain.name}
          </h2>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs font-medium bg-white/20 text-white border-white/30",
                "hover:bg-white/30"
              )}
            >
              {selectedInDomain} / {strengths.length}
            </Badge>
          </div>
        </div>
        <p className="text-sm opacity-90 leading-relaxed">
          {domain.description}
        </p>
      </header>

      {/* Strengths Grid */}
      <div className="p-6 bg-white">
        {strengths.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay fortalezas en este dominio.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {strengths.map((strength) => {
              const isSelected = selectedStrengthIds.includes(strength.id);
              const isDisabled = !isSelected && !canSelectMore;

              return (
                <StrengthCard
                  key={strength.id}
                  id={strength.id}
                  name={strength.name}
                  description={strength.description}
                  domain={strength.domain}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onSelect={onStrengthSelect}
                  domainColor={headerColorClass}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Selection Status Footer */}
      {selectedInDomain > 0 && (
        <footer className="px-6 py-3 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Seleccionadas en {domain.name}:
            </span>
            <Badge 
              variant="outline" 
              className={cn("font-medium", badgeColorClass)}
            >
              {selectedInDomain} fortaleza{selectedInDomain !== 1 ? 's' : ''}
            </Badge>
          </div>
        </footer>
      )}
    </section>
  );
}

// Export for use in parent components
export type { Domain, Strength, DomainSectionProps };
