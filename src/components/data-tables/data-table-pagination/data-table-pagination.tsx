import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DataTablePaginationProps } from "@/types/datatable/data-table-pagination-props";
import { useState, useEffect } from "react";

export function DataTablePagination<TData>({
  table,
  pagination,
  onPageChange,
  onPerPageChange,
}: DataTablePaginationProps<TData>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (pagination) {
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.last_page);
    }
  }, [pagination]);

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) {
      await onPageChange(page);
    }
  };

  const handlePerPageChange = async (value: string) => {
    const perPage = Number(value);
    if (onPerPageChange) {
      await onPerPageChange(perPage);
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between overflow-clip px-2 mt-4 mb-2 gap-4 sm:gap-2"
      style={{ overflowClipMargin: 1 }}
    >
      <div className="text-muted-foreground w-full sm:flex-1 text-sm text-center sm:text-left">
        {pagination ? (
          <span>
            {pagination.from === pagination.to ? 
              `Mostrando registro ${pagination.from} de ${pagination.total}` : 
              `Mostrando ${pagination.from} a ${pagination.to} de ${pagination.total} registros`
            }
          </span>
        ) : (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linha(s) selecionada(s)
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-2 w-full sm:w-auto">
        {pagination && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">Itens por página</p>
            <Select
              value={`${pagination.per_page}`}
              onValueChange={handlePerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.per_page} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 15, 20].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center justify-center text-sm font-medium whitespace-nowrap">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Ir para a primeira página</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Ir para a página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Ir para a próxima página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Ir para a última página</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
  