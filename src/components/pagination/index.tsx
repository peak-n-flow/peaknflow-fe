"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Meta {
  total_data: number;
  total_page: number;
  page: number;
  limit: number;
}

interface PaginationProps {
  meta: Meta;
  className?: string;
}

export function Pagination({ meta, className }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    router.push(createPageURL(pageNumber));
  };

  // Generate page numbers to display
  const generatePagination = () => {
    // If 7 or fewer pages, show all
    if (meta.total_page <= 7) {
      return Array.from({ length: meta.total_page }, (_, i) => i + 1);
    }

    // Always include first and last page
    // Show dots when needed
    const leftSiblingIndex = Math.max(meta.page - 1, 1);
    const rightSiblingIndex = Math.min(meta.page + 1, meta.total_page);

    // Don't show dots if only one position away from the end
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < meta.total_page - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show first 5 pages, then dots, then last page
      const leftRange = Array.from({ length: 5 }, (_, i) => i + 1);
      return [...leftRange, "dots", meta.total_page];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Show first page, then dots, then last 5 pages
      const rightRange = Array.from(
        { length: 5 },
        (_, i) => meta.total_page - 4 + i
      );
      return [1, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      // Show first page, dots, current page and siblings, dots, last page
      const middleRange = [leftSiblingIndex, meta.page, rightSiblingIndex];
      return [1, "dots", ...middleRange, "dots", meta.total_page];
    }

    return [];
  };

  const pages = generatePagination();

  return (
    <nav
      className={cn("flex items-center font-normal space-x-2", className)}
    >
      <button
        onClick={() => handlePageChange(1)}
        disabled={meta.page <= 1}
        className="p-2 rounded-md hover:bg-light-40 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="First page"
      >
        <ChevronsLeft className="h-5 w-5 text-[#BFBFBF]" />
      </button>
      <button
        onClick={() => meta.page > 1 && handlePageChange(meta.page - 1)}
        disabled={meta.page <= 1}
        className="p-2 rounded-md hover:bg-light-40 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5 text-[#BFBFBF]" />
      </button>

      {pages.map((page, i) =>
        page === "dots" ? (
          <span key={`dots-${i}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(Number(page))}
            className={cn(
              "px-3 py-1 rounded-md",
              meta.page === page
                ? "text-[#E3872A] font-medium"
                : "text-[#BFBFBF] hover:bg-light-40"
            )}
            aria-current={meta.page === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() =>
          meta.page < meta.total_page && handlePageChange(meta.page + 1)
        }
        disabled={meta.page >= meta.total_page}
        className="p-2 rounded-md hover:bg-light-40 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5 text-[#BFBFBF]" />
      </button>
      <button
        onClick={() => handlePageChange(meta.total_page)}
        disabled={meta.page >= meta.total_page}
        className="p-2 rounded-md hover:bg-light-40 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Last page"
      >
        <ChevronsRight className="h-5 w-5 text-[#BFBFBF]" />
      </button>
    </nav>
  );
}
