import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export function usePagination(initial: PaginationState) {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>(initial);

  const { pageIndex, pageSize } = pagination;

  return {
    totalItems,
    setTotalItems,
    limit: pageSize,
    state: pagination,
    offset: pageSize * pageIndex,
    onPaginationChange: setPagination,
    reset: () => {
      setTotalItems(0);
      setPagination(initial);
    },
  };
}
