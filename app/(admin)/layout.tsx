import { Sidebar } from "@/components/organism/sidebar";
import { dashboardConfig } from "@/config/dashboard";
import React from "react";
import { Navbar } from "@/components/organism/navbar";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
    
  return (
    <div className="min-h-screen flex h-full flex-row">
      <aside className="hidden lg:flex">
        <Sidebar items={dashboardConfig.sidebarNav} />
      </aside>
      <div className="min-h-screen flex-1 flex flex-col space-y-3">
        <Navbar items={dashboardConfig.mainNav} />
        <main className="flex w-full flex-1 flex-col overflow-hidden bg-background p-10 max-sm:p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
