"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  ThumbsUp,
  ExternalLink,
  MessageCircle,
  Send,
  User,
} from "lucide-react";

interface Comment {
  id: number;
  content: string;
  user: string;
  created_at: string;
}

interface SocialActionsProps {
  postId: number;
  initialLikes?: number;
  initialComments?: Comment[];
  onLike?: () => void;
  onComment?: (comment: string) => void;
}

function Avatar({ username }: { username: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
      <User size={16} className="text-gray-600" />
    </div>
  );
}

export function SocialActions({
  postId,
  initialLikes = 0,
  initialComments = [],
  onLike,
  onComment,
}: SocialActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const currentUser = {
    username: "Current User",
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/auth/posts/${postId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes); // Set the total likes
          setLiked(data.user_liked); // Set whether the user has liked the post
        } else {
          console.error("Failed to fetch post details");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike the post
        const response = await fetch(`http://127.0.0.1:8000/api/auth/likes/${postId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          setLikes((prevLikes) => prevLikes - 1);
          setLiked(false);
        } else {
          console.error("Failed to unlike post");
        }
      } else {
        // Like the post
        const response = await fetch("http://127.0.0.1:8000/api/auth/likes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ post: postId }),
        });

        if (response.ok) {
          setLikes((prevLikes) => prevLikes + 1);
          setLiked(true);
        } else {
          console.error("Failed to like post");
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        alert("Post link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/posts/${postId}/comments/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/comments/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            content: commentText,
            post: postId,
          }),
        });

        if (response.ok) {
          const newComment = await response.json();
          setComments((prevComments) => [newComment, ...prevComments]);
          setCommentText("");
        } else {
          console.error("Failed to submit comment");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="py-2">
      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm"
        >
          <ThumbsUp
            size={18}
            className={liked ? "fill-black text-black" : "text-gray-600"}
          />
          <span>{likes}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-sm text-gray-600"
        >
          <ExternalLink size={18} />
          <span>Share</span>
        </button>

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-1 text-sm text-gray-600"
        >
          <MessageCircle size={18} />
          <span>
            Comment{comments.length > 0 ? ` (${comments.length})` : ""}
          </span>
        </button>
      </div>

      {(showCommentInput || comments.length > 0) && (
        <div className="mt-4 border-t pt-3">
          {showCommentInput && (
            <form
              onSubmit={submitComment}
              className="flex items-center gap-2 mb-4"
            >
              <Avatar username={currentUser.username} />
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                type="submit"
                className="p-2 text-gray-600 hover:text-black"
                disabled={!commentText.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          )}

          {comments.length > 0 && (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar username={comment.user} />
                  <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-[85%]">
                    <div className="text-xs font-medium">
                      {comment.user}
                    </div>
                    <div className="text-sm">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}