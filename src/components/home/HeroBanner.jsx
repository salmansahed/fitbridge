"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { RiHeartPulseFill, RiArrowRightLine } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa6";

const HeroBanner = () => {
  // Stats data for the banner
  const stats = [
    { value: "15,000+", label: "Active Members" },
    { value: "120+", label: "Expert Coaches" },
    { value: "95+", label: "Fitness Programs" },
    { value: "99%", label: "Success Rate" },
  ];

  return (
    <section className="py-20 flex items-center dark:from-neutral-950 dark:bg-black overflow-hidden px-3">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
          {/* Banner Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs md:text-sm font-medium tracking-wide">
            <RiHeartPulseFill className="animate-pulse text-base" />
            Your Ultimate Fitness Companion
          </div>

          {/* Primary Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            Bridge The Gap <br />
            To Your{" "}
            <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Elite Self.
            </span>
          </h1>

          {/* Subheading or Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Connect with premium trainers, track your progress live, and immerse
            yourself in a community dedicated to breaking boundaries every
            single day.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link href="/all-classes">
              <Button className="font-semibold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl shadow-lg shadow-green-600/20 transition-all duration-300 px-6 py-6 text-sm md:text-base group">
                Explore Classes{" "}
                <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-semibold border-2 border-gray-300 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-500 rounded-md hover:rounded-3xl text-gray-800 dark:text-gray-200 transition-all duration-300 px-6 py-6 text-sm md:text-base bg-transparent group">
                Join Free
                <FaChevronRight className="text-lg group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-6 border-t border-gray-200 dark:border-neutral-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="lg:col-span-5 relative grid grid-cols-12 gap-4 h-112.5 md:h-137.5 w-full mt-8 lg:mt-0">
          {/* Large Image on the Left */}
          <div className="col-span-6 relative h-full rounded-2xl overflow-hidden group shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1593455026613-e30bfc0a54a9?q=80&w=600"
              alt="Heavy weight lifting exercise"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Small Images Container on the Right */}
          <div className="col-span-6 grid grid-rows-2 gap-4 h-full">
            {/* Top Right Image */}
            <div className="relative h-full rounded-2xl overflow-hidden group shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600"
                alt="Cardio and group workout"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Right Image */}
            <div className="relative h-full rounded-2xl overflow-hidden group shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1588528402605-1f9d0eb7a6d6?q=80&w=600"
                alt="Yoga and flexibility session"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
