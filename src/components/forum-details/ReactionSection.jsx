"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { toast } from "react-toastify";

const ReactionSection = ({ forumId }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Track reaction counts and current user's voting status
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [myStatus, setMyStatus] = useState(null); // Values: "like", "dislike", or null
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial reaction stats on component mount or user change
  useEffect(() => {
    const fetchReactionStatus = async () => {
      try {
        // Send userId query param only if the user is authenticated
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts/${forumId}/reaction-status${
          user ? `?userId=${user.id || user.email}` : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();

        setLikesCount(data.likesCount || 0);
        setDislikesCount(data.dislikesCount || 0);
        setMyStatus(data.myStatus || null);
      } catch (error) {
        console.error("Error fetching reaction status:", error);
      }
    };

    fetchReactionStatus();
  }, [forumId, user]);

  // Handle vote toggle or switch logic
  const handleReactionClick = async (actionType) => {
    // Block action if user is not logged in
    if (!user) {
      toast.warning("Please login to react on this post! 🙋‍♂️");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts/${forumId}/reaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id || user.email,
            action: actionType,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        // Update states immediately with updated counts from the backend
        setLikesCount(data.likesCount);
        setDislikesCount(data.dislikesCount);
        setMyStatus(data.myStatus);

        // UI notifications based on backend response
        if (data.myStatus === actionType) {
          toast.success(`Post ${actionType}d successfully! 🎉`, {
            autoClose: 1500,
          });
        } else if (data.myStatus === null) {
          toast.info(`Removed your ${actionType}.`, { autoClose: 1500 });
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Like Button */}
      <Button
        onClick={() => handleReactionClick("like")}
        disabled={isLoading}
        size="md"
        className={`font-semibold gap-2 transition-all duration-200 ${
          myStatus === "like"
            ? "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/50"
            : "bg-slate-200/60 dark:bg-neutral-800 hover:bg-green-50 dark:hover:bg-green-950/20 text-slate-800 dark:text-neutral-200"
        }`}
      >
        {/* Toggle between solid and outline icon based on status */}
        {myStatus === "like" ? (
          <BiSolidLike className="text-xl text-green-500" />
        ) : (
          <BiLike className="text-xl text-green-500" />
        )}
        <span>Helpful ({likesCount})</span>
      </Button>

      {/* Dislike Button */}
      <Button
        onClick={() => handleReactionClick("dislike")}
        disabled={isLoading}
        size="md"
        className={`font-semibold gap-2 transition-all duration-200 ${
          myStatus === "dislike"
            ? "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-danger border border-red-200 dark:border-red-900/30"
            : "bg-slate-200/60 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/10 text-slate-800 dark:text-neutral-200"
        }`}
      >
        {/* Toggle between solid and outline icon based on status */}
        {myStatus === "dislike" ? (
          <BiSolidDislike className="text-xl text-danger" />
        ) : (
          <BiDislike className="text-xl text-danger" />
        )}
        <span>Not Helpful ({dislikesCount})</span>
      </Button>
    </div>
  );
};

export default ReactionSection;
