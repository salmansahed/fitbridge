export const metadata = {
  title: "Community Forum",
};

import ForumsPostsCard from "@/components/forums/ForumsPostsCard";
import PaginationWithSummary from "@/components/pagination/PaginationWithSummary";
import SearchBox from "@/components/reusable/SearchBox";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { FiSearch } from "react-icons/fi";

const CommunityForumPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page) || 1;
  const limit = parseInt(resolvedParams?.limit) || 8;
  const search = resolvedParams?.search || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-forum-posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  const publicPostsData = data?.posts || [];
  const totalItems = data?.totalPosts || 0;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  return (
    <div className="container mx-auto px-4 py-12 mt-16 space-y-8">
      {/* Header */}
      <div className="w-full bg-white dark:bg-neutral-800 dark:border dark:border-gray-600 shadow-md p-6 rounded-3xl ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-center md:text-left font-bold text-slate-900 dark:text-white">
              Community Forum
            </h1>
            <p className="text-xs text-center md:text-left text-slate-500 dark:text-neutral-400">
              Connect with other fitness enthusiasts and share your experiences.
            </p>
          </div>
          {/* Search Box */}
          <SearchBox
            label="Search Forum Posts"
            placeholder="Search forum posts..."
          />
        </div>
      </div>
      {/* Forum Posts Grid */}
      <div>
        {publicPostsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {publicPostsData.map((post) => (
              <ForumsPostsCard key={post._id} postData={post} userId={userId} />
            ))}
          </div>
        ) : (
          // No Results Found State
          <div className="w-full min-h-100 flex flex-col items-center justify-center p-8 bg-white/40 dark:bg-neutral-900 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-neutral-700 shadow-2xl relative overflow-hidden group">
            <div className="relative flex items-center justify-center w-16 h-16 mb-5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-neutral-800 shadow-xs transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 rounded-2xl animate-ping opacity-75 pointer-events-none" />
              <FiSearch className="size-7 text-slate-600 dark:text-neutral-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white" />
            </div>

            <h3 className="text-xl font-bold bg-linear-to-r from-slate-800 to-slate-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-2 tracking-tight">
              No Forum Posts Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-xs text-center leading-relaxed">
              We couldn&apos;t find any forum posts matching{" "}
              <span className="font-semibold text-slate-800 dark:text-neutral-200">
                &quot;{search}&quot;
              </span>
              . Try searching with different keywords to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalItems > 0 && (
        <div className="w-full pt-4 border-t border-slate-200/40 dark:border-neutral-800/40">
          <PaginationWithSummary
            totalItems={totalItems}
            page={page}
            itemsPerPage={limit}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityForumPage;
