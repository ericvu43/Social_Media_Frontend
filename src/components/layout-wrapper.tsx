"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

// Array of routes where we don't want to show the sidebar
const publicRoutes = ["/login", "/signup", "/forgot-password"];

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  console.log("Raw pathname:", pathname); // Debug log

  // Normalize the pathname to handle potential trailing slashes
  const normalizedPath = pathname?.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  console.log("Normalized pathname:", normalizedPath); // Debug log

  const isPublicRoute = publicRoutes.includes(normalizedPath || "");
  console.log("Public routes:", publicRoutes); // Debug log
  console.log("Is public route:", isPublicRoute); // Debug log

  if (!pathname) {
    console.log("Warning: pathname is undefined"); // Debug log
    return <>{children}</>; // Render without layout if pathname is undefined
  }

  return (
    <div className="flex h-screen">
      {!isPublicRoute && <Sidebar className="w-64 hidden md:flex" />}
      <main
        className={`flex-1 overflow-y-auto ${isPublicRoute ? "" : "md:pl-64"}`}
      >
        {!isPublicRoute && <MobileNav />}
        <div className={`${isPublicRoute ? "p-0" : "p-4 md:p-6"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
