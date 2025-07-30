import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumbs({ items, className, showHome = true }: BreadcrumbsProps) {
  const allItems = showHome ? [{ label: "Dashboard", href: "/dashboard" }, ...items] : items;

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {showHome && (
        <>
          <Link 
            href="/dashboard" 
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
          {allItems.length > 1 && <ChevronRight className="h-4 w-4" />}
        </>
      )}
      
      {allItems.slice(showHome ? 1 : 0).map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.current || !item.href ? (
            <span className="font-medium text-foreground">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
