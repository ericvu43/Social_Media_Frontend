"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  user: string;
  content: string;
  created_at: string;
}

async function fetchPost(postId: string): Promise<Post | null> {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token
        },
      });
  
      if (response.ok) {
        return response.json();
      } else {
        console.error("Failed to fetch post");
        return null;
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postId = params.postId as string; // Get postId from the URL
    if (!postId) return;

    const fetchData = async () => {
      const postData = await fetchPost(postId);
      setPost(postData);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container max-w-screen-md py-8">
      <h1 className="text-2xl font-bold mb-4">Post Details</h1>
      <div className="rounded-lg border p-4 mb-6">
        <h2 className="font-medium text-lg">Posted by: {post.user}</h2>
        <p className="text-gray-600 mb-3">{post.content}</p>
        <p className="text-sm text-gray-400">
          Created at: {new Date(post.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}