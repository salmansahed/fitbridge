"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

const RemoveFromFavorite = ({ userId, classId }) => {
  const router = useRouter();
  const handleRemoveFromFavorite = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${userId}/${classId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Favorite removed successfully", {
          position: "top-center",
        });
        router.refresh();
      } else {
        toast.error(data.message || "Failed to remove favorite", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("An error occurred while removing favorite", {
        position: "top-center",
      });
    }
  };
  return (
    <div>
      <Button
        onClick={handleRemoveFromFavorite}
        className="w-full rounded-md hover:rounded-3xl bg-red-100 text-red-600 transition-all duration-300 border border-red-300"
      >
        <FaHeart />
        Remove from Favorites
      </Button>
    </div>
  );
};

export default RemoveFromFavorite;
