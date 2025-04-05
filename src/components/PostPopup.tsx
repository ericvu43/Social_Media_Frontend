"use client";

import React, { useState } from "react";

interface PostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPost: { id: number; content: string }) => void;
}

export function PostPopup({ isOpen, onClose, onSubmit }: PostPopupProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.trim() === "") {
      alert("Post content cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newPost = await response.json();
        onSubmit(newPost); // Pass the new post to the parent component
        setContent(""); // Clear the input field
        onClose(); // Close the popup
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create a Post</h2>
        <textarea
          className="w-full p-2 border rounded-md mb-4"
          rows={5}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}