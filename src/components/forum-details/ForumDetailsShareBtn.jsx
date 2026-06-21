"use client";

import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { HiOutlineShare } from "react-icons/hi";
import { Button } from "@heroui/react";

const ForumDetailsShareBtn = () => {
  const pathname = usePathname();

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}`;

      try {
        await navigator.clipboard.writeText(fullUrl);

        toast.success("Link copied to clipboard! Spread the word. 🎉", {
          position: "top-center",
        });
      } catch (err) {
        toast.error("Failed to copy link. Please try again!");
      }
    }
  };

  return (
    <Button
      onClick={handleCopyLink}
      className="rounded-full bg-slate-200/60 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-neutral-800"
    >
      <HiOutlineShare />
      Share Insight
    </Button>
  );
};

export default ForumDetailsShareBtn;
