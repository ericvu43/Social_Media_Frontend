"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Post } from "@/components/Post";

interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  is_email_verified: boolean;
}

interface PostData {
  id: number;
  user: string;
  content: string;
  created_at: string;
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

async function fetchUserPosts(userId: string): Promise<PostData[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/users/${userId}/posts/`);

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to fetch user posts");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = params.userId as string; // Get userId from the URL
    if (!userId) return;

    const fetchData = async () => {
      const userData = await fetchUser(userId);
      setUser(userData);

      if (userData) {
        const userPosts = await fetchUserPosts(userId);
        setPosts(userPosts);
      }

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
      <div className="rounded-lg border p-4 mb-6">
        <h2 className="font-medium text-lg">{user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number || "N/A"}</p>
        <p>Email Verified: {user.is_email_verified ? "Yes" : "No"}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            user={user.username}
            content={post.content}
            createdAt={post.created_at}
          />
        ))
      ) : (
        <div className="text-gray-500">This user has not posted anything yet.</div>
      )}
    </div>
  );
}