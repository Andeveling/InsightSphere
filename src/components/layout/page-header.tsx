import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  breadcrumbs?: ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  children, 
  className,
  breadcrumbs 
}: PageHeaderProps) {
  return (
    <div className={cn("pb-6 border-b border-border/40", className)}>
      {breadcrumbs && (
        <div className="mb-4">
          {breadcrumbs}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        
        {children && (
          <div className="flex-shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
