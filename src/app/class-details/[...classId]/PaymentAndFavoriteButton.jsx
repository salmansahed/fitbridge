"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

const PaymentAndFavoriteButton = ({
  className,
  classPrice,
  classId,
  userEmail,
  alreadyBookedStatus,
  userId,
  formattedTime,
  scheduleDays,
  userRole,
  currentUserRole,
  userName,
  userStatus,
}) => {
  const id = Array.isArray(classId) ? classId[0] : classId;
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    if (userStatus === "blocked") {
      return toast.error("Access Denied! Booking is blocked by admin.", {
        position: "top-center",
      });
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className,
          classPrice,
          classId,
          userEmail,
          formattedTime,
          scheduleDays,
          authorName: userName,
          authorRole: userRole,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Error Response:", errorText);
        return;
      }

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const handleAlreadyBookedClick = () => {
    toast.error("You have already booked this class.", {
      position: "top-center",
    });
  };

  // Handle favorite button click
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { data: tokenData } = await authClient.token();
      if (!userId || !id) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${userId}`,
          {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );
        const data = await res.json();

        const isExists = data.favoriteClasses?.some(
          (fav) => fav.classId === id,
        );
        setIsFavorited(!!isExists);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkFavoriteStatus();
  }, [userId, id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (userStatus === "blocked") {
      return toast.error("Access Denied! Action blocked by admin.", {
        position: "top-center",
      });
    }

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ userId, classId: id }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setIsFavorited(data.isFavorited);

        if (data.isFavorited) {
          toast.success("Added to Favorites");
        } else {
          toast.error("Removed from Favorites");
        }
      } else {
        toast.error(data.message || "Something went wrong!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-4">
      {userRole === currentUserRole ? (
        <Button
          isDisabled
          className="w-full py-6 rounded-md uppercase bg-danger"
        >
          Class Booking for Users Only
        </Button>
      ) : alreadyBookedStatus ? (
        <Button
          onClick={handleAlreadyBookedClick}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-6 rounded-xl font-bold uppercase tracking-wider shadow-md shadow-gray-500/5 hover:shadow-lg transition-all duration-200 active:scale-98 cursor-not-allowed"
        >
          Already Booked
        </Button>
      ) : (
        <Button
          onClick={handleCheckout}
          className="w-full bg-[#72c113] hover:bg-[#63aa10] text-white py-6 rounded-xl font-bold uppercase tracking-wider shadow-md shadow-green-500/5 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
        >
          Book Now — $ {classPrice}
        </Button>
      )}

      {userRole !== currentUserRole && (
        <Button
          onClick={handleFavoriteToggle}
          isLoading={loading}
          className={`w-full py-6 rounded-xl font-bold uppercase transition-all ${
            isFavorited
              ? "bg-red-50 text-red-500 border border-red-500"
              : "bg-white text-black border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {isFavorited ? (
            <>
              <FaHeart className="text-red-500" /> <span>Favorited</span>
            </>
          ) : (
            <>
              <FaRegHeart /> <span>Add to Favorites</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default PaymentAndFavoriteButton;
