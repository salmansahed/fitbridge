"use client";

import React, { useState, useEffect } from "react";
import { Card, Chip, Button, TextArea, AlertDialog } from "@heroui/react";
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { BsArrow90DegDown } from "react-icons/bs";
import Image from "next/image";
import { toast } from "react-toastify";
import userAvatar from "../../assets/images/useravatar.png";
import { authClient } from "@/lib/auth-client";

const API_BASE = `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-comments`;

const DiscussionHub = ({ forumId, currentUser }) => {
  // State management
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [activeReplyBoxId, setActiveReplyBoxId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Controls which comment/reply is targeted for deletion (null means dialog is closed)
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const currentUserId = currentUser?.id || currentUser?.email;

  // Safely fetch comments inside useEffect
  useEffect(() => {
    if (!forumId) return;
    let isMounted = true;

    const loadComments = async () => {
      const { data: tokenData } = await authClient.token();
      try {
        const res = await fetch(`${API_BASE}/${forumId}`, {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        });
        const data = await res.json();
        if (isMounted && Array.isArray(data)) setComments(data);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    loadComments();
    return () => {
      isMounted = false;
    };
  }, [forumId, refreshTrigger]);

  // Helper helper to avoid code duplication in POST/PATCH/DELETE requests
  const handleApiRequest = async (url, method, bodyData, successMsg) => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(successMsg, {
          position: "top-center",
        });
        setRefreshTrigger((prev) => prev + 1);
        return true;
      }
      toast.error(data.error || data.message || "Something went wrong!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Network error! Please try again.", {
        position: "top-center",
      });
    }
    return false;
  };

  // Submit main comment
  const handleMainCommentSubmit = async () => {
    if (!currentUser) return toast.error("Please login to comment!");
    if (!newCommentText.trim()) return;

    const success = await handleApiRequest(
      API_BASE,
      "POST",
      {
        postId: forumId,
        parentId: null,
        userId: currentUserId,
        userName: currentUser.name || "Anonymous User",
        userImage: currentUser.image || userAvatar,
        commentText: newCommentText,
      },
      "Comment published successfully!",
    );

    if (success) setNewCommentText("");
  };

  // Submit reply
  const handleReplySubmit = async (mainCommentId) => {
    if (!currentUser) return toast.error("Please login to reply!");
    if (!replyText.trim()) return;

    const success = await handleApiRequest(
      API_BASE,
      "POST",
      {
        postId: forumId,
        parentId: mainCommentId,
        userId: currentUserId,
        userName: currentUser.name || "Anonymous User",
        userImage: currentUser.image || userAvatar,
        commentText: replyText,
      },
      "Reply submitted successfully!",
    );

    if (success) {
      setReplyText("");
      setActiveReplyBoxId(null);
    }
  };

  // Update existing comment or reply
  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;

    const success = await handleApiRequest(
      `${API_BASE}/${commentId}`,
      "PATCH",
      {
        userId: currentUserId,
        commentText: editingText,
      },
      "Comment updated successfully!",
    );

    if (success) {
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  // Delete comment or reply
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    const success = await handleApiRequest(
      `${API_BASE}/${commentToDelete}`,
      "DELETE",
      {
        userId: currentUserId,
      },
      "Comment deleted successfully!",
    );

    if (success) setCommentToDelete(null);
  };

  return (
    <Card className="p-6 bg-white dark:bg-neutral-900 shadow-xl rounded-3xl border border-slate-200 dark:border-neutral-700 mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Discussion Hub
        </h3>
        {(() => {
          const totalCommentsCount = comments.reduce(
            (total, comment) => total + 1 + (comment.replies?.length || 0),
            0,
          );
          return (
            <Chip color="primary" className="font-semibold">
              {totalCommentsCount}{" "}
              {totalCommentsCount === 1 ? "Thought" : "Thoughts"}
            </Chip>
          );
        })()}
      </div>

      {/* Main Comment Input */}
      <div className="flex gap-4 items-start mb-8">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src={currentUser?.image || userAvatar}
            alt={currentUser?.name || "User"}
            fill
            className="rounded-full object-cover border-2 border-green-500"
          />
        </div>
        <div className="w-full space-y-4">
          <TextArea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="What are your thoughts on this fitness insight? Write an educated response..."
            className="w-full text-base focus:outline-none resize-none transition-all dark:text-white"
            minRows={3}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleMainCommentSubmit}
              className="font-bold text-white bg-linear-to-r from-green-600 to-blue-600 shadow-xl shadow-green-600/20 rounded-full"
            >
              Publish Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List Section */}
      <div className="max-h-137.5 overflow-y-auto pr-2 space-y-6 pt-4 border-t border-slate-100 dark:border-neutral-800 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-neutral-800">
        {comments.map((comment) => (
          <div key={comment._id} className="space-y-3 group/main">
            {/* Main Comment Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src={comment.userImage}
                    alt={comment.userName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-neutral-200 flex items-center gap-2">
                    {comment.userName}
                    {comment.isEdited && (
                      <span className="text-[10px] font-normal text-slate-400 italic">
                        (edited)
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {currentUserId &&
                currentUserId === comment.userId &&
                editingCommentId !== comment._id && (
                  <div className="flex items-center gap-2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingText(comment.commentText);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => setCommentToDelete(comment._id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}
            </div>

            {/* Comment Body / Edit View */}
            {editingCommentId === comment._id ? (
              <div className="pl-12 space-y-2">
                <TextArea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  size="sm"
                  minRows={2}
                  className="w-full"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onClick={() => setEditingCommentId(null)}
                    className="gap-1"
                  >
                    <FiX /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => handleUpdateComment(comment._id)}
                    className="text-white gap-1"
                  >
                    <FiCheck /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-700 dark:text-neutral-300 pl-12 leading-relaxed whitespace-pre-line">
                {comment.commentText}
              </p>
            )}

            {/* Reply Toggle */}
            {editingCommentId !== comment._id && (
              <div className="pl-12">
                <button
                  onClick={() => {
                    setActiveReplyBoxId(
                      activeReplyBoxId === comment._id ? null : comment._id,
                    );
                    setReplyText("");
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-green-600 flex items-center gap-1 transition-colors"
                >
                  <BsArrow90DegDown className="rotate-180" /> Reply
                </button>
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyBoxId === comment._id && (
              <div className="pl-12 mt-2 flex gap-2 items-center">
                <TextArea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  minRows={1}
                  className="w-full"
                />
                <Button
                  onClick={() => handleReplySubmit(comment._id)}
                  size="sm"
                  color="success"
                  className="text-white font-medium"
                >
                  Reply
                </Button>
              </div>
            )}

            {/* Child Replies Thread */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-12 mt-2 space-y-3 border-l-2 border-slate-200 dark:border-neutral-800">
                {comment.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="p-3 bg-slate-50/50 dark:bg-neutral-950/40 border border-slate-100 dark:border-neutral-800/40 rounded-xl space-y-1 group/reply"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 shrink-0">
                          <Image
                            src={reply.userImage}
                            alt={reply.userName}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-xs text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
                          {reply.userName}
                          {reply.isEdited && (
                            <span className="text-[9px] font-normal text-slate-400 italic">
                              (edited)
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Reply Actions */}
                      {currentUserId &&
                        currentUserId === reply.userId &&
                        editingCommentId !== reply._id && (
                          <div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => {
                                setEditingCommentId(reply._id);
                                setEditingText(reply.commentText);
                              }}
                              className="p-1 text-slate-400 hover:text-blue-500 rounded-md transition-all"
                            >
                              <FiEdit2 size={12} />
                            </button>
                            <button
                              onClick={() => setCommentToDelete(reply._id)}
                              className="p-1 text-slate-400 hover:text-red-500 rounded-md transition-all"
                            >
                              <FiTrash2 size={12} />
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Reply Body / Edit View */}
                    {editingCommentId === reply._id ? (
                      <div className="pl-8 space-y-2 pt-1">
                        <TextArea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          size="sm"
                          minRows={1}
                          className="w-full"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            onClick={() => setEditingCommentId(null)}
                            className="h-7 text-xs"
                          >
                            <FiX /> Cancel
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            onClick={() => handleUpdateComment(reply._id)}
                            className="h-7 text-white text-xs"
                          >
                            <FiCheck /> Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 dark:text-neutral-300 pl-8 leading-relaxed">
                        {reply.commentText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controlled HeroUI AlertDialog */}
      <AlertDialog
        isOpen={commentToDelete !== null}
        onOpenChange={(open) => !open && setCommentToDelete(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete comment permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete your{" "}
                  <strong>Comment / Reply</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onClick={() => setCommentToDelete(null)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteComment}>
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </Card>
  );
};

export default DiscussionHub;
