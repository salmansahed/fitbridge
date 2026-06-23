"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  RiHeartAddLine,
  RiCalculatorLine,
  RiSpeedUpLine,
} from "react-icons/ri";

const BMICalculator = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const heightInMeters = parseFloat(height) / 100;
    const bmi = (
      parseFloat(weight) /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    setBmiResult(bmi);

    if (bmi < 18.5) {
      setBmiStatus({
        label: "Underweight",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        barColor: "bg-blue-500",
        percentage: 25,
        advice:
          "Time to build lean muscle! Connect with our trainers to structure a high-protein bulk plan.",
      });
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiStatus({
        label: "Normal Weight",
        color: "text-green-500 bg-green-500/10 border-green-500/20",
        barColor: "bg-green-500",
        percentage: 50,
        advice:
          "Phenomenal shape! You're inside the golden zone. Let's maintain this endurance and power.",
      });
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      setBmiStatus({
        label: "Overweight",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        barColor: "bg-amber-500",
        percentage: 75,
        advice:
          "No worries, let's shredded! A mix of high-intensity cardio and clean deficit dieting will unlock your peak.",
      });
    } else {
      setBmiStatus({
        label: "Obese",
        color: "text-red-500 bg-red-500/10 border-red-500/20",
        barColor: "bg-red-500",
        percentage: 95,
        advice:
          "Take control today! Small, consistent steps in our custom tracking programs will spark massive changes.",
      });
    }
  };

  const bmiRange = [
    {
      range: "< 18.5",
      label: "Underweight",
      border: "hover:border-blue-800",
      bgColor: "bg-blue-700",
    },
    {
      range: "18.5 – 24.9",
      label: "Normal Weight",
      border: "hover:border-green-800",
      bgColor: "bg-green-700",
    },
    {
      range: "25.0 – 29.9",
      label: "Overweight",
      border: "hover:border-amber-800",
      bgColor: "bg-amber-700",
    },
    {
      range: "≥ 30.0",
      label: "Obese",
      border: "hover:border-red-800",
      bgColor: "bg-red-700",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24 dark:bg-black overflow-hidden relative"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold">
              <RiHeartAddLine className="text-base animate-pulse" /> Health
              Analytics Tools
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              Know Your Baseline. <br />
              <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Own Your Body.
              </span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Your Body Mass Index (BMI) is a vital indicator of optimal
              physiological composition. Use our instant diagnostic engine to
              see exactly where you stand on your fitness bridge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
            {bmiRange.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border border-gray-300 dark:border-neutral-900 dark:bg-neutral-900/30 text-left transition-all duration-300 ${item.border} ${item.bgColor}`}
              >
                <span className="block text-xs font-bold text-white dark:text-neutral-500">
                  {item.label}
                </span>
                <span className="text-sm font-extrabold text-white dark:text-gray-200">
                  {item.range}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 space-y-6 max-w-xl mx-auto w-full"
        >
          <form
            onSubmit={calculateBMI}
            className="p-6 md:p-8 rounded-2xl border border-gray-200/60 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  Weight (KG)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 75"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500 dark:focus:border-green-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  Height (CM)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500 dark:focus:border-green-500 transition-colors duration-200"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full font-bold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl px-6 py-6 text-sm md:text-base shadow-lg shadow-green-600/10 transition-all duration-300"
            >
              Calculate BMI <RiCalculatorLine className="text-lg" />
            </Button>
          </form>

          {bmiResult && (
            <div className="p-6 md:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-white/70 dark:bg-neutral-900/40 backdrop-blur-xl shadow-xl space-y-6 text-left">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest block">
                    Your Core Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                      {bmiResult}
                    </h3>
                    <span className="text-sm font-semibold text-gray-500">
                      BMI Index
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full border ${bmiStatus.color}`}
                >
                  {bmiStatus.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="w-full h-3 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bmiStatus.percentage}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${bmiStatus.barColor} transition-all duration-1000 ease-out relative rounded-full`}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-neutral-950/50 dark:to-neutral-900/30 border border-gray-100 dark:border-neutral-900">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                  <RiSpeedUpLine className="text-xl" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  {bmiStatus.advice}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BMICalculator;
