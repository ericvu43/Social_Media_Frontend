"use client";

import { useEffect, useState } from "react";
import { Search } from "@/components/ui/search";
import { SocialActions } from "@/components/ui/social-actions";

interface Post {
  id: number;
  user: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
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

function Post({ user, content, createdAt }: { user: string; content: string; createdAt: string }) {
  return (
    <div className="rounded-lg border p-4 mb-4">
      <h3 className="font-medium mb-2">{user}</h3>
      <p className="text-gray-600 mb-3">{content}</p>
      <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleString()}</p>
      <SocialActions initialLikes={0} initialComments={[]} />
    </div>
  );
}