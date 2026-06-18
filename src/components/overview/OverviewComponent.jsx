"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiLayers,
  FiUsers,
  FiMessageSquare,
  FiPlusCircle,
  FiGrid,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";

const OverviewComponent = ({ classesCount, forumPostCount, user }) => {
  const stats = [
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
      value: "0",
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

  const trainerInfo = {
    name: user?.name,
    role: user?.role,
    email: user?.email,
    userImage: user?.image,
  };

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
              src={trainerInfo.userImage}
              alt={trainerInfo.name}
              width={80}
              height={80}
              className="rounded-2xl border-2 border-blue-700 dark:border-neutral-500 shadow-sm"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-1.5 justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {trainerInfo.name}
              </h1>
              {/* Trainer Role */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                <HiCheckBadge className="size-3" />
                {trainerInfo.role}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-neutral-400 tracking-wide">
              {trainerInfo.email}
            </p>
          </div>
        </div>

        {/* Section 3: Action Buttons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <Link href="/dashboard/add-class">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-md hover:rounded-3xl shadow-md shadow-emerald-500/10 transition-all duration-200 active:scale-95 cursor-pointer">
              <FiPlusCircle className="size-4 stroke-[2.5]" />
              Add New Class
            </Button>
          </Link>

          <Link href="/dashboard/my-classes">
            <Button className="w-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700/80 font-bold text-xs rounded-md hover:rounded-3xl transition-all duration-200 active:scale-95 border border-slate-200/50 dark:border-neutral-700/50 cursor-pointer">
              <FiGrid className="size-4" />
              My Classes
            </Button>
          </Link>

          <Link href="/dashboard/add-forum-post">
            <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold text-xs rounded-md hover:rounded-3xl shadow-md shadow-violet-500/10 transition-all duration-200 active:scale-95 cursor-pointer">
              <FiFileText className="size-4 stroke-[2.5]" />
              Add Forum Post
            </Button>
          </Link>

          <Link href="/dashboard/my-posts">
            <Button className="w-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700/80 font-bold text-xs rounded-md hover:rounded-3xl transition-all duration-200 active:scale-95 border border-slate-200/50 dark:border-neutral-700/50 cursor-pointer">
              <FiUser className="size-4" />
              My Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;
