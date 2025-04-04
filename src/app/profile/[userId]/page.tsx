"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  is_email_verified: boolean;
}

async function fetchUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/users/${userId}/`);

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to fetch user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = params.userId as string; // Get userId from the URL
    if (!userId) return;

    const fetchData = async () => {
      const userData = await fetchUser(userId);
      setUser(userData);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container max-w-screen-md py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="rounded-lg border p-4">
        <h2 className="font-medium text-lg">{user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number || "N/A"}</p>
        <p>Email Verified: {user.is_email_verified ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}