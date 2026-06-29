export const metadata = {
  title: "Community Forum Details",
};

import React from "react";
import { Chip, Button } from "@heroui/react";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlinePhotograph,
} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ForumDetailsShareBtn from "@/components/forum-details/ForumDetailsShareBtn";
import ReactionSection from "@/components/forum-details/ReactionSection";
import DiscussionHub from "@/components/forum-details/DiscussionHub";

const ForumDetailsPage = async ({ params }) => {
  const { forumId } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts/${forumId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <p className="text-sm font-bold text-neutral-400">
          Forum Details Not Found!
        </p>
      </div>
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!data || data.error) {
    return (
      <div className="min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-slate-50 dark:bg-neutral-950 px-4 ">
        <div className="w-full max-w-sm p-6 bg-white dark:bg-neutral-900 shadow-md rounded-2xl text-center flex flex-col gap-6 items-center border border-slate-200 dark:border-neutral-700">
          <HiOutlineExclamation className="text-5xl text-danger" />

          {/* Message Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Post Not Found
            </h2>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
              The post you are looking for doesn&apos;t exist or was removed.
            </p>
          </div>

          {/* Return to Forum Button */}
          <Link href="/community-forum" className="w-full">
            <Button className="w-full bg-black dark:bg-neutral-800 dark:border dark:border-neutral-700 text-white font-semibold rounded-md hover:rounded-3xl transition-all duration-300 group">
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" />
              Return to Forum
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-28 pb-20 relative overflow-hidden transition-all duration-500">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Back to Forum Button */}
        <div className="mb-10">
          <Link href="/community-forum">
            <Button variant="ghost">
              <HiOutlineArrowLeft />
              Back to Forum
            </Button>
          </Link>
        </div>

        {/* Article Container */}
        <article className="space-y-8">
          {/* Image Section */}
          {data.image ? (
            <div className="w-full h-70 sm:h-100 md:h-120 rounded-3xl overflow-hidden shadow-2xl relative group bg-neutral-900">
              <Image
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102"
                fill
              />
            </div>
          ) : (
            <div className="w-full h-48 sm:h-64 md:h-80 rounded-3xl bg-slate-100 dark:bg-neutral-900 border border-dashed border-slate-300 dark:border-neutral-700 flex flex-col items-center justify-center text-center px-4">
              <div className="p-3 bg-slate-200 dark:bg-neutral-700 rounded-2xl mb-2">
                <HiOutlinePhotograph className="text-3xl text-slate-500 dark:text-neutral-400" />
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-neutral-400">
                No Preview Image Available
              </p>
            </div>
          )}

          {/* Author Info Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-slate-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <Image
                alt={data.userName}
                src={data.userImage}
                width={50}
                height={50}
                className="w-14 h-14 border-2 border-green-500 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {data.userName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 truncate max-w-50 md:max-w-xs">
                  {data.userEmail}
                </p>
              </div>
            </div>

            {/* Time Stamp */}
            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-neutral-400">
              <p className="flex items-center gap-1">
                <HiOutlineCalendar className="text-base text-green-500" />
                {data.createdAt}
              </p>
            </div>
          </div>

          {/* User Role Chip */}
          <div className="space-y-4 pt-2">
            <Chip
              variant="primary"
              color="accent"
              className="uppercase font-semibold"
            >
              {data.userRole}
            </Chip>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {data.title}
            </h1>
          </div>

          {/* Content Section */}
          <div className="prose prose-slate dark:prose-invert max-w-none pt-4">
            <p className="text-slate-700 dark:text-neutral-300 text-lg md:text-xl leading-relaxed font-normal whitespace-pre-line text-justify selection:bg-green-500/20">
              {data.content}
            </p>
          </div>

          {/* Reaction Buttons */}
          <div className="flex items-center flex-wrap gap-2 justify-between py-4 border-y border-slate-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              {/* Reaction Buttons */}
              <ReactionSection forumId={forumId} />
            </div>

            <ForumDetailsShareBtn />
          </div>

          <DiscussionHub forumId={forumId} currentUser={user} />
        </article>
      </div>
    </div>
  );
};

export default ForumDetailsPage;
