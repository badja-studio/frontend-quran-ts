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
  Chip,
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import DataTableFilter, { FilterItem, FilterConfig, applyFilters } from './DataTableFilter';
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
  enableExport = false,
  onExport,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [orderBy, setOrderBy] = useState<keyof T | string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const exportMenuOpen = Boolean(exportAnchorEl);

  // Apply filters first
  const filteredData = applyFilters(data, filters);

  // Apply search query (controlled by parent)
  const searchedData = searchValue
    ? filteredData.filter((row) => {
        // Search across all columns
        return columns.some((column) => {
          const value = row[column.id as keyof T];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchValue.toLowerCase());
        });
      })
    : filteredData;

  // Handle sorting
  const sortedData = [...searchedData].sort((a, b) => {
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

  // Paginated data
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof T | string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (newFilters: FilterItem[]) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportAnchorEl(null);
  };

  const handleExport = (type: ExportType) => {
    if (onExport) {
      onExport(type, sortedData);
    }
    handleExportMenuClose();
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
      {/* Filter Section */}
      {enableFilter && (
        <DataTableFilter
          columns={columns}
          filterConfigs={filterConfigs}
          onFilterChange={handleFilterChange}
          onFiltersApplied={onFiltersApplied}
          initialFilters={filters}
        />
      )}

      {/* Search and Export Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Left side - Search */}
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 300 }, maxWidth: { sm: 500 } }}>
          {enableSearch && (
            <TextField
              fullWidth
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => {
                onSearchChange?.(e.target.value);
                setPage(0); // Reset to first page when searching
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
          )}
        </Box>

        {/* Right side - Export */}
        {enableExport && (
          <Box>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportMenuOpen}
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Export
            </Button>
            <Menu
              anchorEl={exportAnchorEl}
              open={exportMenuOpen}
              onClose={handleExportMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleExport('excel')}>
                <ListItemIcon>
                  <TableChartIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText>Export ke Excel</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleExport('pdf')}>
                <ListItemIcon>
                  <PictureAsPdfIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Export ke PDF</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleExport('print')}>
                <ListItemIcon>
                  <PrintIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Cetak (Print)</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader={stickyHeader} aria-label="data table">
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
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
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
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris per halaman:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
        }
      />
    </Paper>
    </Box>
  );
}

// Helper function untuk format status dengan Chip
export const formatStatus = (
  status: string,
  colorMap?: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'>
) => {
  const defaultColorMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    active: 'success',
    aktif: 'success',
    pending: 'warning',
    menunggu: 'warning',
    inactive: 'error',
    nonaktif: 'error',
    completed: 'success',
    selesai: 'success',
    ...colorMap,
  };

  const color = defaultColorMap[status.toLowerCase()] || 'default';

  return <Chip label={status} color={color} size="small" />;
};
