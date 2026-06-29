import React from "react";
import ForumsPostsCard from "@/components/forums/ForumsPostsCard";
import { HiOutlineEmojiSad, HiOutlineUsers } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@heroui/react";
import Link from "next/link";

const LatestForumPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-forum-posts?limit=4`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  const posts = data?.posts || [];

  return (
    <section className="py-24 relative overflow-hidden dark:bg-neutral-950 transition-colors duration-500">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-8 items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs md:text-sm font-medium tracking-wide">
            <HiOutlineUsers className="animate-pulse text-base" />
            Community Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Latest From {""}
            <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Our Forum
            </span>
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 max-w-lg text-lg">
            Discover shared wisdom, expert tips, and inspiring stories from our
            elite fitness community.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                <HiOutlineEmojiSad className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No Forum Posts Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                It looks like there are no featured forum posts at the moment.
                Please check back later!
              </p>
            </div>
          )}
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full flex justify-center transition-all duration-300 hover:-translate-y-2"
            >
              <ForumsPostsCard postData={post} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link href="/community-forum" className="block ">
            <Button className="font-bold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl px-8 py-6 text-base shadow-xl shadow-green-600/20 group/btn transition-all duration-300">
              Join the Discussion
              <FaArrowRight className="text-xl group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestForumPosts;
