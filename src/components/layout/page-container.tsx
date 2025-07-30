import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  spacing?: "none" | "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-3xl", 
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full"
};

const paddingClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-4 sm:px-6 lg:px-8", 
  lg: "px-6 sm:px-8 lg:px-12"
};

const spacingClasses = {
  none: "",
  sm: "py-4",
  md: "py-6 sm:py-8",
  lg: "py-8 sm:py-12"
};

export function PageContainer({ 
  children, 
  className,
  maxWidth = "lg",
  padding = "md",
  spacing = "md"
}: PageContainerProps) {
  return (
    <div className={cn(
      "w-full mx-auto",
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
}
