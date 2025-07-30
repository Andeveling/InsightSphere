import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { BarChart3, Home, Settings, User } from "lucide-react";
import AppSideBarFooter from "@/components/app-sidebar-footer";
import Link from "next/link";
import { auth } from "@/auth";

export async function AppSidebar() {
  const session = await auth();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    ...(session?.user ? [{ title: "Profile", url: "/dashboard/profile", icon: User }] : []),
    { title: "Team Activity", url: "/dashboard/team", icon: BarChart3 },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>InsightSphere</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSideBarFooter />
    </Sidebar>
  );
}
