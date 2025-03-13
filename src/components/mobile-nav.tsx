"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Settings, Clock, Menu } from "lucide-react";
import { useState } from "react";
import { ProfileButton } from "./profile-button";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Feed",
      icon: Home,
      active: pathname === "/",
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
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-background rounded-md border"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background border-r shadow-lg flex flex-col">
            <div className="py-4 px-2 flex-1">
              <h2 className="text-lg font-semibold px-4 mb-6">Navigation</h2>
              <nav className="space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
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
            </div>

            {/* Profile button */}
            <div className="px-6 py-4 border-t">
              <ProfileButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
