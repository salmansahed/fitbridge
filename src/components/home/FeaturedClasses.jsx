import { HiOutlineEmojiSad } from "react-icons/hi";
import ClassCard from "../classes/ClassCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const getFeaturedClasses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-classes`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};

const FeaturedClasses = async () => {
  const featuredClasses = await getFeaturedClasses();

  return (
    <section className="py-16 dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Most Popular{" "}
            <span className="bg-linear-to-r from-green-600 dark:from-green-500 to-blue-600 dark:to-blue-500 bg-clip-text text-transparent">
              Classes
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out our community&apos;s top-rated fitness classes. Join the
            movement and start your transformation today!
          </p>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredClasses.length > 0 ? (
            featuredClasses.map((classData) => (
              <ClassCard key={classData._id} classData={classData} />
            ))
          ) : (
            // No classes available message
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                <HiOutlineEmojiSad className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No Classes Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                It looks like there are no featured classes at the moment.
                Please check back later!
              </p>
            </div>
          )}
        </div>
        <Link href="/all-classes" className="flex justify-center mt-12">
          <Button className="font-bold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl px-8 py-6 text-base shadow-xl shadow-green-600/20 group/btn transition-all duration-300">
            Browse All Classes <FaArrowRight className="group-hover/btn:translate-x-1 transition-all duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedClasses;
