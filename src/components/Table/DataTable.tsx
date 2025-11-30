import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import DataTableFilter, { FilterItem, FilterConfig } from './DataTableFilter';
import { applyFilters } from './filterUtils';
export type { FilterConfig, FilterItem } from './DataTableFilter';

// Generic column definition
export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

export type ExportType = 'excel' | 'pdf' | 'print';

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
  enableFilter?: boolean;
  filterConfigs?: FilterConfig<T>[];
  onFiltersApplied?: (filters: FilterItem[]) => void; // Callback for applied filters (for API)
  enableSearch?: boolean; // Enable global search
  searchValue?: string; // Controlled search value from parent
  onSearchChange?: (value: string) => void; // Callback when search changes
  searchPlaceholder?: string; // Placeholder for search input
  enableExport?: boolean; // Enable export functionality
  onExport?: (type: ExportType, data: T[]) => void; // Unified export callback
  // Server-side pagination props
  serverSide?: boolean; // Enable server-side mode (parent controls everything)
  totalCount?: number; // Total records from server
  page?: number; // Current page (0-indexed) from parent
  rowsPerPage?: number; // Rows per page from parent
  onPageChange?: (page: number) => void; // Callback when page changes
  onRowsPerPageChange?: (rowsPerPage: number) => void; // Callback when rows per page changes
  // Server-side sorting props
  sortBy?: string; // Current sort column from parent
  sortOrder?: 'ASC' | 'DESC'; // Current sort order from parent
  onSortChange?: (columnId: string) => void; // Callback when sort changes
}

type Order = 'asc' | 'desc';

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  initialRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25, 50],
  onRowClick,
  emptyMessage = 'Tidak ada data',
  stickyHeader = true,
  enableFilter = false,
  filterConfigs,
  onFiltersApplied,
  enableSearch = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Cari data...',
  serverSide = false,
  totalCount,
  page: externalPage,
  rowsPerPage: externalRowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  sortBy: externalSortBy,
  sortOrder: externalSortOrder,
  onSortChange,
}: DataTableProps<T>) {
  // Internal state (used only if not server-side)
  const [internalPage, setInternalPage] = useState(0);
  const [internalRowsPerPage, setInternalRowsPerPage] = useState(initialRowsPerPage);
  const [orderBy, setOrderBy] = useState<keyof T | string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [filters, setFilters] = useState<FilterItem[]>([]);

  // Use external or internal state
  const currentPage = serverSide && externalPage !== undefined ? externalPage : internalPage;
  const currentRowsPerPage = serverSide && externalRowsPerPage !== undefined ? externalRowsPerPage : internalRowsPerPage;
  const currentOrderBy = serverSide && externalSortBy !== undefined ? externalSortBy : orderBy;
  const currentOrder = serverSide && externalSortOrder !== undefined ? externalSortOrder.toLowerCase() as Order : order;

  // Apply filters first (only for client-side)
  const filteredData = serverSide ? data : applyFilters(data, filters);

  // Apply search query (only for client-side)
  const searchedData = serverSide ? filteredData : (searchValue
    ? filteredData.filter((row) => {
      // Search across all columns
      return columns.some((column) => {
        const value = row[column.id as keyof T];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchValue.toLowerCase());
      });
    })
    : filteredData);

  // Handle sorting (only for client-side)
  const sortedData = serverSide ? searchedData : [...searchedData].sort((a, b) => {
    if (!orderBy) return 0;

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return order === 'asc' ? comparison : -comparison;
  });

  // Paginated data (only for client-side)
  const paginatedData = serverSide ? data : sortedData.slice(
    currentPage * currentRowsPerPage,
    currentPage * currentRowsPerPage + currentRowsPerPage
  );

  // Total count
  const totalRecords = serverSide && totalCount !== undefined ? totalCount : sortedData.length;

  const handleChangePage = (_event: unknown, newPage: number) => {
    if (serverSide && onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (serverSide && onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
      onPageChange?.(0); // Reset to first page
    } else {
      setInternalRowsPerPage(newRowsPerPage);
      setInternalPage(0);
    }
  };

  const handleRequestSort = (property: keyof T | string) => {
    if (serverSide && onSortChange) {
      // Server-side sorting
      onSortChange(property as string);
    } else {
      // Client-side sorting
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const handleFilterChange = (newFilters: FilterItem[]) => {
    setFilters(newFilters);
    if (serverSide && onPageChange) {
      onPageChange(0); // Reset to first page when filters change
    } else {
      setInternalPage(0);
    }
  };

  // Get cell value
  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    const value = row[column.id as keyof T];

    if (column.format) {
      return column.format(value, row);
    }

    // Convert unknown types to string for display
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  };

  return (
    <Box>
      {/* Filter Section - Container terpisah dengan maxWidth */}
      {enableFilter && (
        <Box sx={{ maxWidth: '100vw', overflow: 'hidden', mb: 2 }}>
          <DataTableFilter
            columns={columns}
            filterConfigs={filterConfigs}
            onFilterChange={handleFilterChange}
            onFiltersApplied={onFiltersApplied}
            initialFilters={filters}
          />
        </Box>
      )}

      {/* Search and Export Section - Container terpisah dengan maxWidth */}
      <Box
        sx={{
          maxWidth: '100vw',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          flexDirection: { xs: 'row', sm: 'row' },
          flexWrap: 'nowrap',
        }}
      >
        {/* Left side - Search */}
        {enableSearch && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => {
                onSearchChange?.(e.target.value);
                // Reset to first page when searching
                if (serverSide && onPageChange) {
                  onPageChange(0);
                } else {
                  setInternalPage(0);
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Table wrapper with overflow - Hanya table yang scroll */}
      <Box sx={{ maxWidth: '100vw', overflowX: 'auto' }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader={stickyHeader} aria-label="data table" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.id)}
                      align={column.align || 'left'}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        fontWeight: 'bold',
                        bgcolor: '#2E7D32',
                        color: 'white',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {column.sortable !== false ? (
                        <TableSortLabel
                          active={currentOrderBy === column.id}
                          direction={currentOrderBy === column.id ? currentOrder : 'asc'}
                          onClick={() => handleRequestSort(column.id)}
                          sx={{
                            '&.MuiTableSortLabel-root': {
                              color: 'white',
                            },
                            '&.MuiTableSortLabel-root:hover': {
                              color: '#FFEB3B',
                            },
                            '&.Mui-active': {
                              color: 'white',
                            },
                            '& .MuiTableSortLabel-icon': {
                              color: 'rgba(255, 255, 255, 0.7) !important',
                              fontSize: '1.2rem',
                            },
                            '&:hover .MuiTableSortLabel-icon': {
                              color: '#FFEB3B !important', // Yellow on hover
                              opacity: 1,
                            },
                            '&.Mui-active .MuiTableSortLabel-icon': {
                              color: '#FFD700 !important', // Gold color for active sort
                              opacity: 1,
                            },
                            '&.Mui-active:hover .MuiTableSortLabel-icon': {
                              color: '#FFC107 !important', // Darker gold on hover when active
                            },
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {emptyMessage}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow
                      hover
                      key={index}
                      onClick={() => onRowClick?.(row)}
                      sx={{
                        cursor: onRowClick ? 'pointer' : 'default',
                        '&:hover': onRowClick ? { bgcolor: 'action.hover' } : {},
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={String(column.id)}
                          align={column.align || 'left'}
                          sx={{ whiteSpace: 'nowrap' }}
                        >
                          {getCellValue(row, column)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={totalRecords}
            rowsPerPage={currentRowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Baris per halaman:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
            }
          />
        </Paper>
      </Box>
    </Box>
  );
}
