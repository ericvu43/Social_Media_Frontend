"use client";

import { useState, FormEvent } from "react";
import { ThumbsUp, ExternalLink, MessageCircle, Send, User } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  username: string;
}

interface SocialActionsProps {
  initialLikes?: number;
  initialComments?: Comment[];
  onLike?: () => void;
  onShare?: () => void;
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
  initialLikes = 0,
  initialComments = [],
  onLike,
  onShare,
  onComment,
}: SocialActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Mock user data - in a real app this would come from auth context
  const currentUser = {
    username: "Current User",
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
    onLike?.();
  };

  const handleShare = () => {
    // TODO: Implement share functionality backend and then frontend
    onShare?.();
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
    onComment?.(commentText);
  };

  const submitComment = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: commentText,
        username: currentUser.username,
      };
      setComments([...comments, newComment]);
      setCommentText("");
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
          onClick={handleComment}
          className="flex items-center gap-1 text-sm text-gray-600"
        >
          <MessageCircle size={18} />
          <span>
            Comment{comments.length > 0 ? ` (${comments.length})` : ""}
          </span>
        </button>
      </div>

      {/* Comment section */}
      {(showCommentInput || comments.length > 0) && (
        <div className="mt-4 border-t pt-3">
          {/* Comment input */}
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

          {/* Comments list */}
          {comments.length > 0 && (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar username={comment.username} />
                  <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-[85%]">
                    <div className="text-xs font-medium">
                      {comment.username}
                    </div>
                    <div className="text-sm">{comment.text}</div>
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
