"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Icons for the sidebar
import { Settings, Home, Clock } from "lucide-react";
import { ProfileButton } from "./profile-button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/feed",
      label: "Feed",
      icon: Home,
      active: pathname === "/feed",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
    {
      href: "/will-update",
      label: "Will Update",
      icon: Clock,
      active: pathname === "/will-update",
    },
  ];

  return (
    <div
      className={cn("flex flex-col h-full bg-background border-r", className)}
    >
      <div className="py-4 px-2 flex flex-col h-full">
        <h2 className="text-lg font-semibold px-4 mb-6">Navigation</h2>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                route.active
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Spacer to push profile button to bottom */}
        <div className="flex-1"></div>

        {/* Profile button */}
        <div className="mt-auto px-4 py-4 border-t">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}
