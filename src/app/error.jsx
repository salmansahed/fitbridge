"use client";

import React from "react";
import { Button } from "@heroui/react";
import { LuRefreshCw } from "react-icons/lu";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import { BiHome } from "react-icons/bi";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-12 relative overflow-hidden select-none transition-colors duration-300">
      {/* Background cyber grid lines with radial masking */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 dark:opacity-60" />

      {/* Ambient glowing orbs matching the application theme */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-87.5 sm:w-100 h-87.5 sm:h-100 bg-linear-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 rounded-full blur-[100px] sm:blur-[140px] opacity-25 dark:opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-87.5 sm:w-100 h-87.5 sm:h-100 bg-linear-to-r from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500 rounded-full blur-[100px] sm:blur-[140px] opacity-25 dark:opacity-20 animate-pulse pointer-events-none" />

      {/* Central glassmorphic card container */}
      <div className="relative max-w-lg w-full text-center flex flex-col items-center z-10 p-8 sm:p-12 rounded-3xl bg-white/40 dark:bg-white/2 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        {/* Animated outer tracking ring and central alert icon holder */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-green-500 opacity-20 dark:opacity-20 blur-md animate-ping" />
          <div className="absolute inset-2 rounded-2xl bg-linear-to-tr from-blue-600 to-green-400 opacity-10 animate-spin animation-duration-[8s]" />

          <div className="absolute inset-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 shadow-sm dark:shadow-lg flex items-center justify-center">
            <FiAlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 animate-bounce" />
          </div>
        </div>

        {/* Error Heading with 3D gradient text treatment */}
        <div className="relative">
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter bg-linear-to-b from-slate-800 via-blue-600 to-green-600 dark:from-white dark:via-blue-400 dark:to-green-500 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] uppercase">
            Ops!
          </h1>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-zinc-100 mt-3 mb-2 tracking-tight">
          Something Went Wrong
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-sm mx-auto">
          {error?.message ||
            "An unexpected application error occurred. Please try recovery or refresh the process."}
        </p>

        {/* Action buttons wrapper for layout responsiveness */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* Interactive action button to trigger error recovery */}
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-linear-to-r from-green-600 to-blue-600 text-white font-semibold text-sm tracking-wide transition-all duration-300 px-8 py-6 shadow-[0_4px_20px_rgba(14,165,233,0.25)] hover:shadow-[0_4px_30px_rgba(34,197,94,0.45)] hover:-translate-y-0.5 rounded-md hover:rounded-3xl"
          >
            <LuRefreshCw className="w-4 h-4 animate-spin animation-duration-[3s]" />
            Try Again
          </Button>

          {/* Navigation action button routing back to the home page */}
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-slate-200/60 dark:bg-zinc-900 border border-slate-300/50 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm tracking-wide transition-all duration-300 px-8 py-6 hover:-translate-y-0.5 rounded-md hover:rounded-3xl shadow-sm">
              <BiHome className="w-4 h-4" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
