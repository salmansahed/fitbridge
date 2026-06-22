"use client";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";

const PaymentButton = ({
  className,
  classPrice,
  classId,
  userEmail,
  alreadyBookedStatus,
}) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, classPrice, classId, userEmail }),
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

  return alreadyBookedStatus ? (
    <Button
      onClick={handleAlreadyBookedClick}
      className="w-full bg-gray-500 hover:bg-gray-600 text-white py-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-gray-500/5 hover:shadow-lg transition-all duration-200 active:scale-98 cursor-not-allowed"
    >
      Already Booked
    </Button>
  ) : (
    <Button
      onClick={handleCheckout}
      className="w-full bg-[#72c113] hover:bg-[#63aa10] text-white py-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-green-500/5 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
    >
      Book Now — $ {classPrice}
    </Button>
  );
};

export default PaymentButton;
