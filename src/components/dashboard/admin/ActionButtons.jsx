"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ActionButtons({ userId, currentStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //   Make Admin Button Function
  const handleMakeAdmin = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "admin" }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("User promoted to Admin successfully!");
        router.refresh();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role!");
    } finally {
      setLoading(false);
    }
  };

  // Block Unblock Toggle Button Function
  const handleToggleStatus = async () => {
    setLoading(true);
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success(
          `User ${newStatus === "active" ? "Unblocked" : "Blocked"} successfully!`,
        );
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update status!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to change user status!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Make Admin Button */}
      <Button
        size="sm"
        isLoading={loading}
        onClick={handleMakeAdmin}
        className="rounded-md bg-green-600/10 text-green-600 hover:bg-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 font-medium"
      >
        Make Admin
      </Button>

      {/* Block / Unblock Button */}
      <Button
        size="sm"
        isLoading={loading}
        onClick={handleToggleStatus}
        className={`rounded-md font-medium transition-colors ${
          currentStatus === "active"
            ? "bg-red-600/10 text-red-600 hover:bg-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
            : "bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20"
        }`}
      >
        {currentStatus === "active" ? "Block" : "Unblock"}
      </Button>
    </div>
  );
}
