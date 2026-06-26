"use client";

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCalendarCheck, FaRegHeart, FaRegUser } from "react-icons/fa6";
import {
  FiLayers,
  FiUsers,
  FiMessageSquare,
  FiPlusCircle,
  FiGrid,
  FiFileText,
  FiUser,
  FiList,
} from "react-icons/fi";
import { HiOutlineClock, HiOutlineSparkles, HiPlus } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { RiCalendarCheckLine } from "react-icons/ri";

const OverviewComponent = ({
  applicationData,
  classesCount,
  forumPostCount,
  user,
  totalEnrolledStudents,
  totalBookings,
  totalFavorites,
  totalUsers,
  totalSubscriptions,
  totalApprovedClasses,
}) => {
  const { status, specialty, yearsOfExperience } = applicationData || {};

  const userInfo = {
    name: user?.name,
    role: user?.role,
    email: user?.email,
    userImage: user?.image,
    userId: user?.id,
  };

  const role = user?.role || "User";

  const trainerStats = [
    {
      id: 1,
      label: "Total Classes Created",
      value: classesCount,
      icon: FiLayers,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      label: "Total Students Enrolled",
      value: totalEnrolledStudents,
      icon: FiUsers,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      id: 3,
      label: "Forum Posts Contributed",
      value: forumPostCount,
      icon: FiMessageSquare,
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
  ];

  const userStats = [
    {
      id: 1,
      label: "Booked Classes",
      value: totalBookings,
      icon: FaRegCalendarCheck,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      label: "Favorite Classes",
      value: totalFavorites,
      icon: FaRegHeart,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 3,
      label: "Role",
      value: userInfo.role,
      icon: FaRegUser,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const approvedClasses = totalApprovedClasses;

  const adminStats = [
    {
      id: 1,
      label: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      label: "Approved Classes",
      value: approvedClasses,
      icon: FiLayers,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 3,
      label: "Transactions",
      value: totalSubscriptions,
      icon: FiList,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const trainerProfileCardLink = [
    {
      id: 1,
      label: "Add New Class",
      icon: FiPlusCircle,
      href: "/dashboard/add-class",
    },
    {
      id: 2,
      label: "My Classes",
      icon: FiGrid,
      href: "/dashboard/my-classes",
    },
    {
      id: 3,
      label: "Add Forum Post",
      icon: FiFileText,
      href: "/dashboard/add-forum-post",
    },
    {
      id: 4,
      label: "My Forum Posts",
      icon: FiUser,
      href: "/dashboard/my-posts",
    },
  ];

  const userProfileCardLink = [
    {
      id: 1,
      label: "Booked Classes",
      icon: FaRegCalendarCheck,
      href: "/dashboard/booked-classes",
    },
    {
      id: 2,
      label: "Favorite Classes",
      icon: FaRegHeart,
      href: "/dashboard/favorites",
    },
    {
      id: 3,
      label: "Apply as Trainer",
      icon: FiUser,
      href: "/dashboard/apply-as-trainer",
    },
  ];

  const adminProfileCardLink = [
    {
      id: 1,
      label: "Manage Users",
      icon: FaRegUser,
      href: "/dashboard/admin/all-users",
    },
    {
      id: 2,
      label: "Trainer Applications",
      icon: FiFileText,
      href: "/dashboard/admin/trainer-applications",
    },
    {
      id: 3,
      label: "Manage Trainers",
      icon: FiLayers,
      href: "/dashboard/admin/all-trainers",
    },
    {
      id: 4,
      label: "Manage Classes",
      icon: RiCalendarCheckLine,
      href: "/dashboard/admin/all-classes",
    },
    {
      id: 5,
      label: "Add Forum Post",
      icon: FiPlusCircle,
      href: "/dashboard/add-forum-post",
    },
    {
      id: 6,
      label: "Forum Posts",
      icon: FiMessageSquare,
      href: "/dashboard/admin/forum-posts",
    },
    {
      id: 7,
      label: "Transactions",
      icon: FiList,
      href: "/dashboard/admin/transactions",
    },
  ];

  let stats =
    role === "trainer"
      ? trainerStats
      : role === "admin"
        ? adminStats
        : userStats;
  let profileCardLinks =
    role === "trainer"
      ? trainerProfileCardLink
      : role === "admin"
        ? adminProfileCardLink
        : userProfileCardLink;

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-neutral-950 p-4 md:p-8 flex flex-col gap-8 transition-colors duration-300">
      {/* Section 1: Unique Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className="relative overflow-hidden group bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md border border-slate-200 dark:border-neutral-700 p-6 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 dark:hover:border-green-500/30"
            >
              {/* Background Glow */}
              <div
                className={`absolute -right-4 -bottom-4 w-24 h-24 bg-linear-to-br ${stat.color} opacity-5 blur-xl rounded-full group-hover:opacity-10 transition-opacity`}
              />

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-neutral-500 tracking-wide uppercase">
                  {stat.label}
                </span>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                  {stat.value}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-xl ${stat.bgLight} transition-transform duration-300 group-hover:scale-110 shadow-xs`}
              >
                <IconComponent className="size-5 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 2: Premium Glass-Morphism Profile and Action Hub */}
      <div className="w-full relative overflow-hidden rounded-3xl bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl border border-slate-200 dark:border-neutral-700 p-6 md:p-8 shadow-xs flex flex-col gap-6 md:gap-8">
        {/* Trainer Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* User Image */}
          <div>
            <Image
              src={userInfo.userImage}
              alt={userInfo.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-2xl border-2 border-blue-700 dark:border-neutral-500 shadow-sm"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-1.5 justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {userInfo.name}
              </h1>
              {/* Trainer Role */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                <HiCheckBadge className="size-3" />
                {userInfo.role}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-neutral-400 tracking-wide">
              {userInfo.email}
            </p>
          </div>
        </div>

        {/* Section 3: Action Buttons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-3 pt-2">
          {profileCardLinks.map((link) => {
            const IconComponent = link.icon;

            return (
              <Link href={link.href} key={link.id}>
                <Button className="w-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700/80 font-bold text-xs rounded-md hover:rounded-3xl transition-all duration-200 border border-slate-200/50 dark:border-neutral-700/50 h-10">
                  <IconComponent />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Trainer Application Card */}
      {applicationData && userInfo.role === "user" ? (
        <div className="p-8 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-sm">
          <div className="flex flex-col items-start text-left space-y-4">
            {/* Title */}
            <h3 className="text-2xl font-extrabold text-black dark:text-white">
              Trainer Application
            </h3>

            {/* Status Chip - Left Aligned */}
            <div className="w-full">
              <Chip
                variant="soft"
                color="danger"
                className="w-full justify-start px-3 rounded py-2 font-bold uppercase tracking-widest text-xs"
              >
                <HiOutlineClock className="text-base mr-1" />
                {status}
              </Chip>
              <div className="mt-2">
                {status === "rejected" && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-red-500/20">
                    <span className="font-bold">Reason for Rejection:</span>{" "}
                    {applicationData.rejectionReason}
                  </p>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1 text-sm">
              <p className="text-neutral-500 dark:text-neutral-400">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  Specialty:
                </span>{" "}
                {specialty}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  Experience:
                </span>{" "}
                {yearsOfExperience} years
              </p>
            </div>
          </div>
        </div>
      ) : (
        userInfo.role === "user" && (
          <div className="w-full p-10 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-sm hover:shadow-md hover:border hover:border-green-500 transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center">
                <HiOutlineSparkles className="text-3xl text-neutral-400" />
              </div>

              {/* Texts */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Trainer Application
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  No application submitted yet.
                </p>
              </div>

              {/* Button */}
              <Link href="/dashboard/apply-as-trainer">
                <Button className="h-10 bg-transparent text-green-600 dark:text-green-500 font-bold hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all">
                  <HiPlus className="text-lg" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OverviewComponent;
