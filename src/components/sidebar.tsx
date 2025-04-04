"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostPopup } from "./PostPopup";
import { useState } from "react";

// Icons for the sidebar
import { Settings, Home, Clock, Plus } from "lucide-react";
import { ProfileButton } from "./profile-button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);

  const handlePostSubmit = async (newPost: { id: number; content: string }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token
        },
        body: JSON.stringify({ content: newPost.content }), // Send the post content
      });
  
      if (response.ok) {
        console.log("Post created successfully");
        setIsPostPopupOpen(false); // Close the popup after submission
      } else {
        console.error("Failed to create post");
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

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

        {/* Spacer to push buttons to the bottom */}
        <div className="flex-1"></div>

        {/* Create Post Button */}
        <div className="px-4 py-4">
          <button
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsPostPopupOpen(true)}
          >   
          <Plus className="h-5 w-5" />
            Create Post
          </button>
        </div>

        {/* Profile button */}
        <div className="mt-auto px-4 py-4 border-t">
          <ProfileButton />
        </div>
      </div>

      {/* Post Creation Popup */}
      <PostPopup
        isOpen={isPostPopupOpen}
        onClose={() => setIsPostPopupOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
}
