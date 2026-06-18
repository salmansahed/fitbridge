import React from "react";
import Link from "next/link";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi2";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-neutral-950 flex items-center justify-center p-4 md:p-6 transition-colors duration-300 relative overflow-hidden">
        {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-500/10 dark:bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative w-full max-w-xl bg-white/70 dark:bg-neutral-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-neutral-800/60 p-8 md:p-12 rounded-3xl shadow-xs text-center flex flex-col items-center gap-6 md:gap-8 group">
        {/* Icon Architecture (Double Layer Protection Lock) */}
        <div className="relative flex items-center justify-center">
          {/* Background Pulse Glow Effect */}
          <div className="absolute inset-0 bg-rose-500/20 dark:bg-rose-500/10 blur-xl rounded-full scale-125 animate-pulse" />

          {/* Main Outer Container */}
          <div className="relative p-5 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-xs transition-transform duration-500 group-hover:rotate-12">
            <FiAlertTriangle className="size-10 stroke-[2.5]" />
          </div>

          {/* Shield Icon */}
          <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white dark:text-neutral-950 rounded-lg shadow-md">
            <HiShieldCheck className="size-4" />
          </div>
        </div>

        {/* 📝 Text and Content Section */}
        <div className="flex flex-col gap-2.5 max-w-sm">
          {/* Bold Status Code */}
          <span className="text-sm font-extrabold text-rose-500 dark:text-rose-400 tracking-widest uppercase bg-rose-500/10 px-3 py-1 rounded-full w-fit mx-auto border border-rose-500/20">
            Error 403
          </span>

          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            Access Forbidden
          </h1>

          {/* Detailed Description */}
          <p className="text-sm font-medium text-slate-500 dark:text-neutral-400 leading-relaxed">
            You are trying to access a restricted zone that your account does
            not have permission to view. Please log in with the correct account
            or contact the administrator.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Dashboard or Home Return Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-neutral-950 font-bold text-xs rounded-md hover:rounded-3xl shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <FiHome className="size-4 stroke-[2.5]" />
            Back to Home
          </Link>

          {/* Previous Page Return Link (Passing Previous Route) */}
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-200/40 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700/80 font-bold text-xs rounded-md hover:rounded-3xl transition-all duration-200 active:scale-95 border border-slate-200 dark:border-neutral-700 cursor-pointer"
          >
            <FiArrowLeft className="size-4 stroke-[2.5]" />
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
