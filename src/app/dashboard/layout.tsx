import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/40">
          <div className="flex items-center px-4 sm:px-6 lg:px-8 h-14">
            <SidebarTrigger className="-ml-1" />
          </div>
        </div>
        <div className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
