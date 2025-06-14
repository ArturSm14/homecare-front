import type { Table } from "@tanstack/react-table";
import type { ApiResponse } from "@/types/apiResponse";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: ApiResponse<TData>["meta"];
  onPageChange?: (page: number) => Promise<void>;
  onPerPageChange?: (perPage: number) => Promise<void>;
}