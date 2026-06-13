'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { TableSkeleton } from '@/components/loading/TableSkeleton';

export interface Column<T = Record<string, any>> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T = Record<string, any>> {
  data: T[];
  columns: Column<any>[];
  loading?: boolean;
  onRowClick?: (row: any) => void;
  rowActions?: (row: any) => React.ReactNode;
  emptyMessage?: string;
  enableSelection?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  rowIdKey?: string;
  onExport?: () => void;
  enableExport?: boolean;
}

export const DataTable = React.memo(function DataTable<T = Record<string, any>>({
  data,
  columns,
  loading = false,
  onRowClick,
  rowActions,
  emptyMessage = 'No data available',
  enableSelection = false,
  selectedRows = new Set(),
  onSelectionChange,
  rowIdKey = 'id',
  onExport,
  enableExport = false,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (debouncedSearchTerm) {
      result = result.filter((row) =>
        columns.some((col) => {
          const value = (row as any)[col.key];
          return value?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        })
      );
    }

    // Column filter
    if (filterColumn && filterValue && filterValue !== 'all') {
      result = result.filter((row) => {
        const value = (row as any)[filterColumn];
        return value?.toString().toLowerCase() === filterValue.toLowerCase();
      });
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortColumn];
        const bValue = (b as any)[sortColumn];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, debouncedSearchTerm, sortColumn, sortDirection, filterColumn, filterValue, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const handleSort = useCallback((column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedData.map((row) => (row as any)[rowIdKey]));
      onSelectionChange?.(allIds);
    } else {
      onSelectionChange?.(new Set());
    }
  }, [paginatedData, rowIdKey, onSelectionChange]);

  const handleSelectRow = useCallback((rowId: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    onSelectionChange?.(newSelected);
  }, [selectedRows, onSelectionChange]);

  const isAllSelected = paginatedData.length > 0 && paginatedData.every((row) => selectedRows.has((row as any)[rowIdKey]));
  const isSomeSelected = paginatedData.some((row) => selectedRows.has((row as any)[rowIdKey]));

  // Get unique values for filter
  const filterOptions = useMemo(() => {
    if (!filterColumn) return [];
    const uniqueValues = new Set(data.map((row) => (row as any)[filterColumn]?.toString()));
    return Array.from(uniqueValues).filter(Boolean);
  }, [data, filterColumn]);

  if (loading) {
    return <TableSkeleton rows={5} columns={columns.length} />;
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <div className="relative flex-1 w-full sm:w-auto min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {columns.some((col) => col.filterable) && (
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={filterColumn} onValueChange={setFilterColumn}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.filter((col) => col.filterable).map((col) => (
                    <SelectItem key={col.key as string} value={col.key as string}>
                      {col.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filterColumn && (
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {filterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {enableExport && onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex-1 sm:flex-none gap-1.5 px-2 sm:px-3 py-2 h-8 sm:h-9 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden w-full max-w-full">
        <div className="overflow-x-auto max-h-[500px] sm:max-h-[600px] overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {enableSelection && (
                  <TableHead className="w-[50px] min-w-[50px] sticky left-0 bg-background z-20 p-2">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate = isSomeSelected && !isAllSelected;
                        }
                      }}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectAll(e.target.checked);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead key={col.key as string}>
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.key as any)}
                        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                      >
                        {col.label}
                        {sortColumn === col.key && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    ) : (
                      col.label
                    )}
                  </TableHead>
                ))}
                {rowActions && <TableHead className="w-[35px] sticky right-0 bg-background z-20 text-center p-0.5">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (rowActions ? 1 : 0) + (enableSelection ? 1 : 0)} className="text-center py-8">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => {
                  const rowId = (row as any)[rowIdKey];
                  const isSelected = selectedRows.has(rowId);
                  // Use combination of rowId and index to ensure uniqueness even with duplicate IDs
                  const uniqueKey = rowId ? `${rowId}-${index}` : `row-${index}`;
                  return (
                    <TableRow
                      key={uniqueKey}
                      onClick={() => onRowClick?.(row)}
                      className={cn(
                        onRowClick && 'cursor-pointer hover:bg-muted/30',
                        isSelected && 'bg-muted/50'
                      )}
                    >
                      {enableSelection && (
                        <TableCell className="border-r border-border sticky left-0 bg-background z-20 p-2 min-w-[50px]" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectRow(rowId, e.target.checked);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 cursor-pointer"
                          />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell key={col.key as string}>
                          {col.render ? (
                            <span suppressHydrationWarning>
                              {col.render((row as any)[col.key], row)}
                            </span>
                          ) : (
                            (row as any)[col.key]?.toString()
                          )}
                        </TableCell>
                      ))}
                      {rowActions && (
                        <TableCell className="border-l border-border sticky right-0 bg-background z-20 text-center p-0.5" onClick={(e) => e.stopPropagation()}>
                          {rowActions(row)}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600">Rows per page:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
              <SelectTrigger className="w-[60px] sm:w-[70px] text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 px-2 sm:px-3"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-7 h-7 sm:w-8 sm:h-8 text-xs"
                >
                  {page}
                </Button>
              ))}
              {totalPages > 5 && (
                <span className="text-xs text-muted-foreground">...</span>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});
