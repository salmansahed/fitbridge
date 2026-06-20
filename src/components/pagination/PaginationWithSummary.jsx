"use client";

import { Pagination } from "@heroui/react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js hooks for URL management
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Receive individual values directly instead of using a hook object
export default function PaginationWithSummary({ totalItems, page, itemsPerPage = 10 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate the total number of pages based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Update the URL search parameters when the page changes
  const handlePageChange = (newPage) => {
    // Copy the current URL query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set the new page number and items per page size
    params.set("page", newPage.toString());
    params.set("size", itemsPerPage.toString());

    // Push the updated query parameters to the URL to trigger server-side re-fetching
    router.push(`?${params.toString()}`);
  };

  // Logic to generate page numbers and handle ellipsis (...)
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate summary item numbers (Showing X-Y of Z results)
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 shadow-xs">
      {/* Summary text section */}
      <Pagination.Summary className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
        Showing{" "}
        <span className="font-bold text-slate-800 dark:text-white">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-800 dark:text-white">
          {totalItems}
        </span>{" "}
        results
      </Pagination.Summary>

      {/* Button controls section */}
      <Pagination.Content className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-neutral-950/50 p-1.5 rounded-xl border border-slate-200/40 dark:border-neutral-800/40">
        {/* Previous button */}
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => handlePageChange(page - 1)} // Call handlePageChange instead of setPage
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-900 rounded-lg cursor-pointer"
          >
            <FiChevronLeft className="size-4" />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Map page numbers and ellipsis */}
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis className="px-2.5 py-1.5 text-xs text-slate-400" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === page}
                onPress={() => handlePageChange(p)} // Update the URL when a new page is clicked
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  p === page
                    ? "bg-slate-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs scale-105"
                    : "text-slate-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-900"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        {/* Next button */}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => handlePageChange(page + 1)} // Update the URL for the next page
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-900 rounded-lg cursor-pointer"
          >
            <span>Next</span>
            <FiChevronRight className="size-4" />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
