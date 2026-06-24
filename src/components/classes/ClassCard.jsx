import Image from "next/image";
import { HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "@heroui/react";
import Link from "next/link";
import EditClassCardModal from "./EditClassCardModal";
import DeleteClassModal from "./DeleteClassModal";
import { FaHeart, FaRegUser } from "react-icons/fa6";
import RemoveFromFavorite from "../dashboard/user/RemoveFromFavorite";

const ClassCard = async ({ classData, userId, favoriteStatus }) => {
  const {
    _id,
    image,
    name,
    category,
    difficulty,
    duration,
    price,
    startTime,
    scheduleDays,
    userName,
    userImage,
    description,
    userId: classUserId,
  } = classData;
  console.log("Favorite Status ?", favoriteStatus);

  const totalBookingsCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/count/${_id}`,
    { cache: "no-store" },
  );
  const { bookingCount } = await totalBookingsCountRes.json();
  const totalBookings = bookingCount || 0;

  return (
    <div className="group w-full max-w-95 bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-700 rounded-2xl p-4 shadow-xs hover:shadow-2xl hover:border-green-500/40 hover:-translate-y-2 dark:hover:border-green-500/30 transition-all duration-300 flex flex-col gap-4">
      {/* Image Section with glass badge */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge - Top Left (Transparent Glass Effect) */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/40 dark:border-neutral-800 rounded-full shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            {category}
          </span>
        </div>

        {/* Difficulty Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-neutral-900/80 dark:bg-neutral-100/90 rounded-md">
          <span className="text-[10px] font-semibold text-white dark:text-neutral-900 capitalize">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Class Name */}
        <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        {/* Description */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Duration, Time and Schedule Grid (Icon included) */}
        <div className="flex items-center justify-between gap-4 my-1 pt-2 border-t border-dashed border-neutral-100 dark:border-neutral-900 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <HiOutlineClock className="text-sm text-green-500" />
            <span>
              {duration} mins / {startTime}{" "}
              {parseInt(startTime) >= 12 ? "PM" : "AM"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 dark:text-neutral-400">
            <FaRegUser className="text-sm text-green-500" />{" "}
            <span>{totalBookings}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineCalendar className="text-sm text-green-500" />
            <span className="line-clamp-1">{scheduleDays?.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Trainer or Admin Info Bar */}
      <div className="flex items-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="relative size-6 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <Image
            src={userImage}
            alt={userName}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
          By{" "}
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {userName}
          </span>
        </span>
      </div>

      {/* Price and Action Button */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
            Total Investment
          </p>
          <p className="text-lg font-black text-neutral-900 dark:text-white">
            ${price}
            <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
              /session
            </span>
          </p>
        </div>

        {/* Unique Action Button */}
        <Link href={`/class-details/${_id}`}>
          <Button className="bg-[#72c113] hover:bg-[#63aa10] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 group/btn">
            View Details
            <FiArrowUpRight className="text-sm group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
      {userId === classUserId && (
        <div className="flex items-center justify-between gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-2">
          {/* Edit Button */}
          <EditClassCardModal classData={classData} />

          {/* Delete Button */}
          <DeleteClassModal classData={classData} />
        </div>
      )}
      {favoriteStatus && <RemoveFromFavorite userId={userId} classId={_id} />}
    </div>
  );
};

export default ClassCard;
