
import React, { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Users, Dumbbell, Package, Calendar, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Members", path: "/members", icon: Users },
    { name: "Trainers", path: "/trainers", icon: Dumbbell },
    { name: "Plans & Packages", path: "/plans", icon: Package },
    { name: "Schedules", path: "/schedules", icon: Calendar },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-shack-purple to-shack-vivid-purple flex items-center justify-center text-white font-bold">
                  SF
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-shack-purple to-shack-vivid-purple bg-clip-text text-transparent">
                  ShackFitness
                </div>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={location.pathname === item.path ? "bg-accent text-accent-foreground" : ""}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin</span>
              <div className="w-8 h-8 rounded-full bg-shack-purple flex items-center justify-center text-white">
                A
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
