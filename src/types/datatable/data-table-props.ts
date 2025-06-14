import type { ColumnDef } from "@tanstack/react-table"
import type { ApiResponse } from "@/types/apiResponse"

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onSuccess?: () => Promise<void>
    isLoading?: boolean
    pagination?: ApiResponse<TData>["meta"]
    onPageChange?: (page: number) => Promise<void>
    onPerPageChange?: (perPage: number) => Promise<void>
}