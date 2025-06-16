import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination as PaginationType } from "@/lib/interfaces/articles-interfaces";

interface ArticlesPaginationProps extends PaginationType {
  onPageChange: (page: string) => void;
}

export default function ArticlesPagination({
  currentPage,
  totalPage,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: ArticlesPaginationProps) {
  const handlePageChange = (page: number) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("page", page.toString());
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
    onPageChange(page.toString());
  };

  const generatePaginationItems = () => {
    if (!totalPage || totalPage <= 1) return [1];
    const currentPageNum = currentPage || 1;
    const totalPages = totalPage || 1;
    const items = [];

    items.push(1);

    const leftSide = Math.max(2, currentPageNum - 1);
    const rightSide = Math.min(totalPages - 1, currentPageNum + 1);
    if (leftSide > 2) {
      items.push("ellipsis-left");
    } else if (totalPages >= 2) {
      items.push(2);
    }
    for (
      let i = Math.max(3, leftSide);
      i <= Math.min(totalPages - 2, rightSide);
      i++
    ) {
      items.push(i);
    }
    if (rightSide < totalPages - 1) {
      items.push("ellipsis-right");
    } else if (totalPages > 2 && !items.includes(totalPages - 1)) {
      items.push(totalPages - 1);
    }

    if (totalPages > 1 && !items.includes(totalPages)) {
      items.push(totalPages);
    }
    return items;
  };

  return (
    <div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  hasPreviousPage
                    ? handlePageChange(currentPage - 1)
                    : undefined
                }
                className={
                  !hasPreviousPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Page Number */}
            {generatePaginationItems().map((item, index) => {
              if (item === "ellipsis-left" || item === "ellipsis-right") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={`page-${item}-${index}`}>
                  <PaginationLink
                    onClick={() => handlePageChange(item as number)}
                    isActive={currentPage === item}
                    className="cursor-pointer"
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (hasNextPage) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={
                  !hasNextPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
