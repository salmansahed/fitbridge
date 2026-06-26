import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-12 relative overflow-hidden select-none transition-colors duration-300">
      {/* Background cyber grid lines with radial masking */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 dark:opacity-60" />

      {/* Ambient glowing orbs matching the application theme */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-87.5 sm:w-100 h-87.5 sm:h-100 bg-linear-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 rounded-full blur-[100px] sm:blur-[140px] opacity-25 dark:opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-87.5 sm:w-100 h-87.5 sm:h-100 bg-linear-to-r from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500 rounded-full blur-[100px] sm:blur-[140px] opacity-25 dark:opacity-20 animate-pulse pointer-events-none" />

      {/* Central glassmorphic card container */}
      <div className="relative max-w-sm w-full text-center flex flex-col items-center z-10 p-8 sm:p-10 rounded-3xl bg-white/40 dark:bg-white/2 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        {/* Animated outer tracking ring with spinning center loader */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-green-500 opacity-20 dark:opacity-20 blur-md animate-ping" />
          <div className="absolute inset-2 rounded-2xl bg-linear-to-tr from-blue-600 to-green-400 opacity-10 animate-spin animation-duration-[8s]" />

          <div className="absolute inset-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 shadow-sm dark:shadow-lg flex items-center justify-center">
            <RiLoader2Fill className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 animate-spin animation-duration-[2s]" />
          </div>
        </div>

        {/* Loading typography with system theme text treatment */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight mb-1">
          Loading Resources
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 tracking-wide animate-pulse">
          Please wait a moment...
        </p>
      </div>
    </div>
  );
}
