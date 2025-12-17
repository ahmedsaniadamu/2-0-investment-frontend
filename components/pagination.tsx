'use client';
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export type TPagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

interface PaginationProps {
  pagination: TPagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

function generatePages(total: number, current: number) {
  const visible: (number | string)[] = [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  visible.push(1);
  if (current > 3) visible.push("...");
  const before = Math.max(2, current - 1);
  const after = Math.min(total - 1, current + 1);
  for (let p = before; p <= after; p++) visible.push(p);
  if (current < total - 2) visible.push("...");
  visible.push(total);
  return visible;
}

export default function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 8, 10, 15, 30, 45, 70],
}: PaginationProps) {
  const pages = generatePages(pagination.totalPages, pagination.currentPage);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
      {/* Page numbers */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(pagination.currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((p, idx) => (
          <Button
            key={idx}
            variant={p === pagination.currentPage ? "default" : "outline"}
            className={
              p === pagination.currentPage ? "bg-primary text-white" : ""
            }
            disabled={p === "..."}
            onClick={() => typeof p === "number" && onPageChange(p)}
          >
            {p === "..." ? <MoreHorizontal className="h-4 w-4" /> : p}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Page size dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Per Page: {pagination.pageSize}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={String(pagination.pageSize)}
              onValueChange={(v) => onPageSizeChange(Number(v))}
            >
              {pageSizeOptions.map((size) => (
                <DropdownMenuRadioItem key={size} value={String(size)}>
                  {size}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

