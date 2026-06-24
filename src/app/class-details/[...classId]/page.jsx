import Image from "next/image";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineBadgeCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  MdFitnessCenter,
  MdOutlineCategory,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import userAvatar from "../../../assets/images/useravatar.png";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PaymentAndFavoriteButton from "./PaymentAndFavoriteButton";

const ClassDetailsPage = async ({ params }) => {
  const { classId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${classId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <p className="text-sm font-bold text-neutral-400">
          Class Details Not Found!
        </p>
      </div>
    );
  }

  const classData = await res.json();
  const {
    category,
    description,
    difficulty,
    duration,
    image,
    name,
    price,
    scheduleDays,
    startTime,
    userImage,
    userName,
    userRole,
    userEmail,
    userId: authorId,
  } = classData;

  const formattedTime = startTime
    ? (() => {
        const [hours, minutes] = startTime.split(":");
        const hr = parseInt(hours, 10);
        const ampm = hr >= 12 ? "PM" : "AM";
        const displayHr = hr % 12 || 12;
        return `${displayHr}:${minutes || "00"} ${ampm}`;
      })()
    : "N/A";

  const totalBookingsCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/count/${classId}`,
    { cache: "no-store" },
  );
  const { bookingCount } = await totalBookingsCountRes.json();

  const totalBookedStudents = bookingCount || 0;

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const userId = session?.user?.id;
  const currentUserRole = session?.user?.role;

  const allredyBookedRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/${userId}/classes/${classId}`,
    { cache: "no-store" },
  );
  const { success, subscription } = await allredyBookedRes.json();
  const { classId: subscriptionId, userId: subscriptionUserId } =
    subscription || {};
  let alreadyBookedStatus = false;
  if (
    success &&
    subscriptionId === classId[0] &&
    subscriptionUserId === userId
  ) {
    alreadyBookedStatus = true;
  }

  return (
    <div className="py-28 bg-neutral-50 dark:bg-neutral-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation link to return to the catalog */}
        <div className="mb-6">
          <Link href="/all-classes">
            <Button variant="ghost" className="group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" />
              Back to All Classes
            </Button>
          </Link>
        </div>

        {/* Class Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Main content section containing the showcase image and detailed specifications */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full h-80 md:h-96 lg:h-112.5 rounded-2xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900 shadow-2xs">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-neutral-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* General description text block */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl p-6 md:p-8 shadow-2xs">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {name}
              </h2>
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                📖 About This Class
              </h3>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Informational grid block specifying the exact properties of the selected course */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-2xs">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                ⭐️ Class Specs
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Total duration breakdown */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <HiOutlineClock className="text-xl text-[#72c113]" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Duration
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {duration} Mins
                    </p>
                  </div>
                </div>

                {/* Scheduled time format display */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <HiOutlineCalendar className="text-xl text-[#72c113]" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Schedule Time
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {formattedTime}
                    </p>
                  </div>
                </div>

                {/* Enrolled participants metrics counter */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <HiOutlineUserGroup className="text-xl text-[#72c113]" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Enrolled
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {totalBookedStudents} Students
                    </p>
                  </div>
                </div>

                {/* Training type and category field */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <MdOutlineCategory className="text-xl text-[#72c113]" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Category
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {category}
                    </p>
                  </div>
                </div>

                {/* Skill level threshold verification */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <MdOutlineTrendingUp className="text-xl text-[#72c113]" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Difficulty
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {difficulty}
                    </p>
                  </div>
                </div>

                {/* Derived workout intensity dynamic estimation */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-xl flex items-center gap-3">
                  <div className="text-xl text-[#72c113] font-bold">⚡️</div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                      Intensity
                    </p>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                      {difficulty === "advanced"
                        ? "High Intensity"
                        : difficulty === "intermediate"
                          ? "Medium"
                          : "Normal"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certified gym trainer identification profile information banner */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="relative size-10 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <Image
                  src={userImage || userAvatar}
                  alt={userName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-black text-neutral-800 dark:text-neutral-200 flex items-center gap-1 mt-0.5">
                  Added By {"—"}
                  {userName}{" "}
                  <HiOutlineBadgeCheck className="text-blue-500 text-sm" />
                </h4>
                <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Pricing summary module with dynamic checkout triggering mechanisms */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xs">
              {/* Financial investment details per training session */}
              <div className="mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                  Session Investment
                </p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                    ${price}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    {" "}
                    / Per Person
                  </span>
                </div>
              </div>
              {/* Status parameters tracking concurrent registrations and time limitations */}
              <div className="grid grid-cols-2 gap-2 mb-4 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-xl text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
                <div className="border-r border-neutral-200 dark:border-neutral-800 py-1 flex items-center justify-center gap-1">
                  <HiOutlineUserGroup className="text-[#72c113]" />{" "}
                  {totalBookedStudents} booked
                </div>
                <div className="py-1 flex items-center justify-center gap-1">
                  <HiOutlineClock className="text-[#72c113]" /> {duration} min
                </div>
              </div>
              {/* Weekly scheduling distribution configuration indicators */}
              <div className="mb-6 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-xl border border-neutral-100 dark:border-neutral-900/60">
                <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <MdFitnessCenter className="text-sm text-[#72c113]" />{" "}
                  Available Weekly Days
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scheduleDays?.map((day, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-[11px] font-bold text-neutral-700 dark:text-neutral-300 shadow-2xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              {/* Call-to-action registration system trigger button */}
              <PaymentAndFavoriteButton
                className={name}
                classPrice={price}
                classId={classId}
                userEmail={userEmail}
                alreadyBookedStatus={alreadyBookedStatus}
                userId={userId}
                scheduleDays={scheduleDays}
                formattedTime={formattedTime}
                userRole={userRole}
                currentUserRole={currentUserRole}
                authorId={authorId}
                userName={userName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
