"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

// Array of routes where we don't want to show the sidebar
const publicRoutes = ["/login", "/signup", "/forgot-password", "/OTP", "/reset-password"];

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Function to check if the user is authenticated
const isAuthenticated = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/verify-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isPublicRoute && !(await isAuthenticated())) {
        // Redirect to login page if the user is not authenticated
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, isPublicRoute, router]);

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
