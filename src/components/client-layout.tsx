"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

// Array of routes where we don't want to show the sidebar
const publicRoutes = ["/login", "/signup", "/forgot-password", "/otp-login"];

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const isPublicRoute = publicRoutes.includes(pathname);

  console.log("Current pathname:", pathname);
  console.log("Is public route:", isPublicRoute);

  return (
    <div className="flex h-screen">
      {!isPublicRoute && <Sidebar className="w-64 hidden md:flex" />}
      <main className={`flex-1 overflow-y-auto ${isPublicRoute ? "" : ""}`}>
        {!isPublicRoute && <MobileNav />}
        <div className={`${isPublicRoute ? "p-0" : "p-4 md:p-6"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
