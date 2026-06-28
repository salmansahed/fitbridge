"use client";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  RiFlashlightLine,
  RiArrowRightUpLine,
  RiMagicLine,
  RiUserHeartLine,
  RiUserFollowLine,
} from "react-icons/ri";

const CTACommunity = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-20 dark:bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-3">
        {/* Full-width Premium Card Container */}
        <div className="relative rounded-3xl border border-gray-200/80 dark:border-neutral-800 bg-linear-to-br from-gray-50 via-white to-gray-50/50 dark:from-neutral-900/90 dark:via-neutral-950 dark:to-neutral-900/40 p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden group">
          {/* Card Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-linear-to-tr from-green-600/10 to-blue-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Column 1: Title and Description */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                <RiMagicLine className="text-sm animate-pulse" /> Shape Your
                Destiny
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
                Cross The Bridge. <br />
                <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Claim Your Power.
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                Stop waiting for tomorrow. Join FitBridge today and unlock an
                AI-driven ecosystem designed to maximize your muscle growth,
                endurance, and transformation.
              </p>
            </div>

            {/* Column 2: iPhone-style Trust and Social Proof Widget (Grid Span: 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-gray-200/50 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl shadow-lg max-w-sm mx-auto w-full space-y-4">
              <span className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest block text-center lg:text-left">
                FitBridge Ecosystem Pulse
              </span>

              {/* Social Proof Row */}
              <div className="space-y-3">
                {/* Indicator 1 */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-900/5 dark:bg-neutral-800/40 border border-black/5 dark:border-white/5 text-left">
                  <div className="p-2.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                    <RiUserHeartLine className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">
                      Active Global Athletes
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                      15,000+ Synchronized
                    </p>
                  </div>
                </div>

                {/* Indicator 2 */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-900/5 dark:bg-neutral-800/40 border border-black/5 dark:border-white/5 text-left">
                  <div className="p-2.5 rounded-lg bg-blue-50/10 text-blue-600 dark:text-blue-400 shrink-0">
                    <RiUserFollowLine className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">
                      Community Mentorship
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                      Real-time Group Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Premium Button Panel (Grid Span: 3) */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch w-full max-w-sm mx-auto">
              {/* Primary Glowing Button */}
              <Button className="font-bold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl px-8 py-6 text-base shadow-xl shadow-green-600/20 group/btn transition-all duration-300">
                Get Started Now
                <RiArrowRightUpLine className="text-xl group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </Button>

              {/* Secondary Clean Button */}
              <Button
                variant="outline"
                className="font-bold text-gray-800 dark:text-gray-200 border-gray-200 dark:border-neutral-800 dark:hover:bg-neutral-900 rounded-md hover:rounded-3xl px-8 py-6 text-base transition-all duration-200 group/btn2"
              >
                Explore Classes{" "}
                <RiFlashlightLine className="text-lg group-hover/btn2:scale-150 transition-all duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTACommunity;
