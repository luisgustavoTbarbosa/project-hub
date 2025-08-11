import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full">
            <Header />
            <main className="p-8">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
