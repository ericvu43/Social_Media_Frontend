"use client";

import React from "react";
import { SocialActions } from "@/components/ui/social-actions";

interface PostProps {
  postId: number; // Add postId to match the calls
  user: string;
  content: string;
  createdAt: string;
}

export function Post({ postId, user, content, createdAt }: PostProps) {
  return (
    <div className="rounded-lg border p-4 mb-4">
      <h3 className="font-medium mb-2">{user}</h3>
      <p className="text-gray-600 mb-3">{content}</p>
      <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleString()}</p>
      <SocialActions postId={postId} initialLikes={0} initialComments={[]} />
    </div>
  );
}