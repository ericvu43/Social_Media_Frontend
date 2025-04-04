"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

async function fetchCurrentUser() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the auth token
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to fetch current user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export function ProfileButton() {
  const router = useRouter();

  const handleProfileClick = async () => {
    const currentUser = await fetchCurrentUser();
    if (currentUser && currentUser.id) {
      router.push(`/profile/${currentUser.id}`); // Redirect to the user's profile page
    } else {
      console.error("User not logged in or failed to fetch user data");
      toast({
        title: "Error",
        description: "Failed to fetch user data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    console.log("User logged out");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });

    // Redirect to login page
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Profile</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}