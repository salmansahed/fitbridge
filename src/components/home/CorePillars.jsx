"use client";
import { motion } from "framer-motion";
import {
  RiShieldFlashLine,
  RiUserHeartLine,
  RiCompassDiscoverLine,
  RiTrophyLine,
  RiCheckboxCircleFill,
  RiFireFill,
} from "react-icons/ri";

const CorePillars = () => {
  const pillars = [
    {
      icon: (
        <RiShieldFlashLine className="text-2xl text-green-600 dark:text-green-400" />
      ),
      title: "Elite Coaching & Safety Protocols",
      description:
        "Train with absolute confidence under the direct supervision of internationally certified fitness experts.",
    },
    {
      icon: (
        <RiUserHeartLine className="text-2xl text-blue-600 dark:text-blue-400" />
      ),
      title: "Hyper-Personalized Ecosystem",
      description:
        "Get AI-driven workout regimes and precision nutrition structures tailored specifically to your body type.",
    },
    {
      icon: (
        <RiCompassDiscoverLine className="text-2xl text-green-600 dark:text-green-400" />
      ),
      title: "Dynamic Milestone Mapping",
      description:
        "Track your real-time stamina curves, strength metrics, and lifting progress with advanced analytics dashboards.",
    },
    {
      icon: (
        <RiTrophyLine className="text-2xl text-blue-600 dark:text-blue-400" />
      ),
      title: "Global Community Challenges",
      description:
        "Compete in interactive local and global leaderboards to push your boundaries alongside driven athletes.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-24 dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Content Column */}
        <motion.div
          variants={leftItemVariants}
          className="lg:col-span-5 space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-500">
              The FitBridge Edge
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              How We Shape Your <br />
              <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Ultimate Self.
              </span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              We don&apos;t just offer equipment; we build a full-scale digital
              and physical ecosystem engineered to bridge the gap between your
              current state and peak performance.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl shadow-lg max-w-md mx-auto lg:mx-0 text-left overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-linear-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-neutral-800/60 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 animate-bounce">
                  <RiFireFill className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 dark:text-white">
                    Daily Consistency
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-neutral-500">
                    Real-time synchronization
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                Active Streak
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <RiCheckboxCircleFill className="text-green-500 text-lg shrink-0" />
                <span>100% Verified Performance Indicators</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <RiCheckboxCircleFill className="text-blue-500 text-lg shrink-0" />
                <span>Seamless Mobile & Web Dashboard Sync</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={rightItemVariants}
          className="lg:col-span-7 space-y-4"
        >
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border border-gray-200/60 dark:border-neutral-800/40 bg-white dark:bg-neutral-900/60 shadow-xs hover:shadow-xl hover:border-blue-500/30 dark:hover:border-green-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-neutral-800 group-hover:bg-linear-to-br group-hover:from-green-600/10 group-hover:to-blue-600/10 text-gray-700 dark:text-gray-300 transition-all duration-300 shrink-0 shadow-xs">
                {pillar.icon}
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors duration-200 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CorePillars;
