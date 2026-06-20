import { useState } from "react";

export default function usePagination(initialPage = 1, itemsPerPage = 10) {
  const [page, setPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate the total number of pages dynamically
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Generate middle page numbers and handle ellipsis (...) logic
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

  // Calculate item summary bounds for text representation (Showing X-Y of Z)
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  // Return state and values to be consumed by other components
  return {
    page,
    setPage,
    totalItems,
    setTotalItems,
    totalPages,
    getPageNumbers,
    startItem,
    endItem,
    itemsPerPage,
  };
}
