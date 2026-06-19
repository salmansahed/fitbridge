import Image from "next/image";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineThumbUp,
  HiOutlineChatAlt,
} from "react-icons/hi";
import Link from "next/link";
import { Button } from "@heroui/react";

const ForumsPostsCard = ({ postData }) => {
  const { _id, title, content, image, userRole, createdAt, userName } =
    postData || {};

  const likeCount = 1000;
  const commentCount = 1000;

  return (
    <div className="w-full max-w-90 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image Section with Role Badge */}
      <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-900 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover"
          />

        {/* Role Badge */}
        {userRole && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#4c2475]/90 dark:bg-[#381a56]/90 rounded-md shadow-sm">
            <span className="text-[11px] font-bold tracking-wide text-purple-200 capitalize">
              {userRole}
            </span>
          </div>
        )}
      </div>

      {/* Content and Meta Area */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Forum Post's Bold Title */}
        <h3 className="text-base font-extrabold text-neutral-900 dark:text-neutral-50 line-clamp-2 leading-snug tracking-tight">
          {title}
        </h3>

        {/* User Role and Publish Date */}
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <HiOutlineUser className="text-sm shrink-0" />
            <span className="capitalize font-medium">
              {(userName || "Author").split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          {/* Date */}
          <div className="flex items-center gap-1">
            <HiOutlineCalendar className="text-sm shrink-0" />
            <span>{createdAt}</span>
          </div>
        </div>

        {/* Forum Short Content Description */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
          {content}
        </p>

        {/* Divider Line */}
        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-1" />

        {/* Bottom Panel: Likes, Comments Counters and Link Button */}
        <div className="flex items-center justify-between pt-1">
          {/* Like and Comment Counters Area */}
          <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 text-xs">
            <div className="flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer transition-colors">
              <HiOutlineThumbUp className="text-base" />
              <span>{likeCount > 999 ? "999+" : likeCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer transition-colors">
              <HiOutlineChatAlt className="text-base" />
              <span>{commentCount > 999 ? "999+" : commentCount}</span>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/forum-details/${_id}`}>
            <Button className="px-4 py-1.5 bg-[#f4f9ed] dark:bg-[#1a2412] hover:bg-[#e9f4dc] border border-[#d2ebaf] dark:border-[#38531a] text-[#72c113] text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer active:scale-95">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForumsPostsCard;
