"use client";

import { useEffect, useState } from "react";
import { Search } from "@/components/ui/search";
import { Post } from "@/components/Post";

interface PostData {
  id: number;
  user: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/posts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="container max-w-screen-md py-8">
      <Search />
      <div className="mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              user={post.user}
              content={post.content}
              createdAt={post.created_at}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No posts available</div>
        )}
        <div className="mt-4 text-center text-gray-500">End of Feed</div>
      </div>
    </div>
  );
}