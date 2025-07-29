'use client'
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { toast } from "sonner";


export default function AppSideFooter() {
    const handleLogout = async () => {
      try {
        await logout();
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error("Failed to logout");
      }
    };
  
  return (
          <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleLogout}
              >
                <LogOut />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
  )
}