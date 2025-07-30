"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StrengthCardProps {
  id: string;
  name: string;
  description: string;
  domain: {
    id: string;
    name: string;
    description: string;
  };
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (strengthId: string) => void;
  domainColor: string;
}

// Domain color mapping for visual hierarchy
const domainColors = {
  Doing: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-900",
  Feeling: "bg-green-50 border-green-200 hover:bg-green-100 text-green-900",
  Motivating: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-900",
  Thinking: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-900",
} as const;

const selectedDomainColors = {
  Doing: "bg-blue-100 border-blue-400 text-blue-900 ring-2 ring-blue-300",
  Feeling: "bg-green-100 border-green-400 text-green-900 ring-2 ring-green-300",
  Motivating: "bg-purple-100 border-purple-400 text-purple-900 ring-2 ring-purple-300",
  Thinking: "bg-orange-100 border-orange-400 text-orange-900 ring-2 ring-orange-300",
} as const;

const domainBadgeColors = {
  Doing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Feeling: "bg-green-100 text-green-800 hover:bg-green-200",
  Motivating: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  Thinking: "bg-orange-100 text-orange-800 hover:bg-orange-200",
} as const;

export function StrengthCard({
  id,
  name,
  description,
  domain,
  isSelected,
  isDisabled,
  onSelect,
}: StrengthCardProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const domainName = domain.name as keyof typeof domainColors;
  const baseColorClass = domainColors[domainName] || domainColors.Thinking;
  const selectedColorClass = selectedDomainColors[domainName] || selectedDomainColors.Thinking;
  const badgeColorClass = domainBadgeColors[domainName] || domainBadgeColors.Thinking;

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? selectedColorClass : baseColorClass,
        isDisabled && !isSelected && "opacity-50 cursor-not-allowed hover:shadow-none",
        "focus-within:ring-2 focus-within:ring-offset-2"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${name}: ${description}. Dominio: ${domain.name}. ${
        isSelected ? "Seleccionado" : "No seleccionado"
      }${isDisabled ? ". Deshabilitado" : ""}`}
    >
      <CardContent className="p-4">
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full",
              "bg-white shadow-sm border-2",
              domainName === "Doing" && "border-blue-400",
              domainName === "Feeling" && "border-green-400",
              domainName === "Motivating" && "border-purple-400",
              domainName === "Thinking" && "border-orange-400"
            )}>
              <Check className="w-4 h-4 text-current" />
            </div>
          </div>
        )}

        {/* Domain badge */}
        <div className="mb-3">
          <Badge 
            variant="secondary"
            className={cn(
              "text-xs font-medium",
              badgeColorClass
            )}
          >
            {domain.name}
          </Badge>
        </div>

        {/* Strength name */}
        <h3 className="font-semibold text-base mb-2 leading-tight">
          {name}
        </h3>

        {/* Strength description */}
        <p className="text-sm opacity-90 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// Export domain colors for use in other components
export { domainColors, selectedDomainColors, domainBadgeColors };
