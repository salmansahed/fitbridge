export const metadata = {
  title: "All Classes",
};

import CategoryFilter from "@/components/classes/CategoryFilter";
import ClassCard from "@/components/classes/ClassCard";
import PaginationWithSummary from "@/components/pagination/PaginationWithSummary";
import SearchBox from "@/components/reusable/SearchBox";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FiSearch } from "react-icons/fi";

const AllClassesPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page) || 1;
  const size = parseInt(resolvedParams?.size) || 8;
  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/classes?page=${page}&size=${size}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  const classes = data?.classes || [];
  const totalItems = data?.totalCount || 0;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  return (
    <div className="container mx-auto px-4 py-12 mt-16 flex flex-col gap-8">
      {/* Header */}
      <div className="w-full bg-white dark:bg-neutral-800 dark:border dark:border-gray-600 shadow-md p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-center lg:text-left font-bold text-slate-900 dark:text-white">
              All Fitness Classes
            </h1>
            <p className="text-xs text-center lg:text-left text-slate-500 dark:text-neutral-400">
              Find the perfect workout session tailored for you.
            </p>
          </div>

          {/* Search Box & Category Dropdown Container */}
          <SearchBox
            label="Search Classes"
            placeholder="Search classes by name..."
          />
          <CategoryFilter />
        </div>
      </div>

      {/* Class Grid */}
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {classes.map((classData) => (
            <ClassCard
              key={classData._id}
              classData={classData}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        /* No results found state */
        <div className="w-full min-h-122.5 flex flex-col items-center justify-center p-8 bg-white/40 dark:bg-neutral-900 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-neutral-700 shadow-2xl relative overflow-hidden group">
          <div className="relative flex items-center justify-center w-16 h-16 mb-5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-neutral-800 shadow-xs transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 rounded-2xl animate-ping opacity-75 pointer-events-none" />
            <FiSearch className="size-7 text-slate-600 dark:text-neutral-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white" />
          </div>

          <h3 className="text-xl font-bold bg-linear-to-r from-slate-800 to-slate-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-2 tracking-tight">
            No Classes Found
          </h3>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-xs text-center leading-relaxed">
            We couldn&apos;t find any fitness sessions matching{" "}
            <span className="font-semibold text-slate-800 dark:text-neutral-200">
              &quot;{search || category}&quot;
            </span>
            . Try exploring other keywords.
          </p>
        </div>
      )}

      {/* Pagination Container */}
      {totalItems > 0 && (
        <div className="w-full pt-4 border-t border-slate-200/40 dark:border-neutral-800/40">
          <PaginationWithSummary
            totalItems={totalItems}
            page={page}
            itemsPerPage={size}
          />
        </div>
      )}
    </div>
  );
};

export default AllClassesPage;
