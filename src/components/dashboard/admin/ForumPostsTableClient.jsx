"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog, Chip } from "@heroui/react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ForumPostsTableClient({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleDeleteClass = async (postId) => {
    setLoadingId(postId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts-for-admin/${postId}`,
        { method: "DELETE" },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Post has been deleted permanently");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-2">
      <Table className="max-h-screen overflow-y-auto scrollbar-thin">
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage Forum Posts Table">
            <Table.Header>
              <Table.Column>POST DETAILS</Table.Column>
              <Table.Column>AUTHOR INFO</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {posts.map((post) => (
                <Table.Row
                  key={post._id}
                  className="border-b border-slate-50 dark:border-zinc-800"
                >
                  <Table.Cell>
                    <div className="flex items-center gap-3 py-2">
                      <Image
                        src={
                          post.image ||
                          "https://i.ibb.co/6HqS4B8/placeholder.png"
                        }
                        alt={post.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl object-cover border"
                      />
                      <span className="font-semibold text-slate-700 dark:text-zinc-200">
                        {post.title?.length > 20
                          ? `${post.title.substring(0, 20)}...`
                          : post.title}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="text-slate-600 dark:text-zinc-300 font-medium text-sm">
                    {post.userName || "Unknown"}
                    <div className="text-xs text-slate-400 font-normal">
                      <Chip
                        className={`${
                          post.userRole === "trainer"
                            ? "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400"
                            : "bg-blue-500/10 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                        } rounded-md px-2 py-0.5 text-xs font-semibold`}
                      >
                        {post.userRole}
                      </Chip>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <AlertDialog>
                      <Button
                        variant="danger-soft"
                        size="sm"
                        className="rounded-md hover:rounded-3xl transition-all duration-300 border border-red-200 dark:border-red-900/50"
                      >
                        Delete
                      </Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="dark:bg-zinc-900 border dark:border-zinc-800">
                            <AlertDialog.Header>
                              <AlertDialog.Heading className="dark:text-zinc-100">
                                Delete Post Permanently?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-sm text-slate-600 dark:text-zinc-300">
                                Are you sure you want to delete{" "}
                                <strong className="dark:text-zinc-100">
                                  {post.title}
                                </strong>
                                ?
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button
                                slot="close"
                                variant="outline"
                                className="rounded-md hover:rounded-3xl transition-all duration-300 border border-slate-200 dark:border-zinc-700 dark:text-zinc-300"
                              >
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                variant="danger"
                                className="rounded-md hover:rounded-3xl transition-all duration-300 border border-red-200 dark:border-red-900/50"
                                isLoading={loadingId === post._id}
                                onClick={() => handleDeleteClass(post._id)}
                              >
                                Confirm Delete
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
