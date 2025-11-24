import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { Column } from './DataTable';

// Operator types
export type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between'
  | 'in';

// Filter item interface
export interface FilterItem {
  id: string;
  key: string; // column id
  operator: FilterOperator;
  value: string | number | Date | string[];
  type?: 'text' | 'number' | 'date' | 'select';
}

// Filter configuration for columns
export interface FilterConfig<T> {
  key: keyof T | string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  operators?: FilterOperator[];
  options?: Array<{ label: string; value: string | number }>;
}

interface DataTableFilterProps<T> {
  columns: Column<T>[];
  filterConfigs?: FilterConfig<T>[];
  onFilterChange: (filters: FilterItem[]) => void;
  onFiltersApplied?: (filters: FilterItem[]) => void; // Callback when filters are applied
  initialFilters?: FilterItem[];
}

// Default operators per type
const defaultOperatorsByType: Record<string, FilterOperator[]> = {
  text: ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith'],
  number: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
  date: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'],
  select: ['equals', 'notEquals', 'in'],
};

// Operator labels
const operatorLabels: Record<FilterOperator, string> = {
  equals: 'Sama dengan',
  notEquals: 'Tidak sama dengan',
  contains: 'Mengandung',
  notContains: 'Tidak mengandung',
  startsWith: 'Dimulai dengan',
  endsWith: 'Diakhiri dengan',
  greaterThan: 'Lebih besar dari',
  lessThan: 'Lebih kecil dari',
  greaterThanOrEqual: 'Lebih besar atau sama dengan',
  lessThanOrEqual: 'Lebih kecil atau sama dengan',
  between: 'Diantara',
  in: 'Termasuk dalam',
};

export default function DataTableFilter<T extends Record<string, unknown>>({
  columns,
  filterConfigs,
  onFilterChange,
  onFiltersApplied,
  initialFilters = [],
}: DataTableFilterProps<T>) {
  const [filters, setFilters] = useState<FilterItem[]>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  // Generate filter configs from columns if not provided
  const configs: FilterConfig<T>[] = filterConfigs || columns.map(col => ({
    key: col.id,
    label: col.label,
    type: 'text' as const,
  }));

  const addFilter = () => {
    const newFilter: FilterItem = {
      id: Date.now().toString(),
      key: configs[0]?.key as string,
      operator: 'equals',
      value: '',
      type: configs[0]?.type || 'text',
    };
    const newFilters = [...filters, newFilter];
    setFilters(newFilters);
  };

  const removeFilter = (id: string) => {
    const newFilters = filters.filter(f => f.id !== id);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const updateFilter = (id: string, updates: Partial<FilterItem>) => {
    const newFilters = filters.map(f => {
      if (f.id === id) {
        // If key changed, reset operator and value
        if (updates.key && updates.key !== f.key) {
          const config = configs.find(c => c.key === updates.key);
          return {
            ...f,
            ...updates,
            type: config?.type || 'text',
            operator: 'equals' as FilterOperator,
            value: '',
          } as FilterItem;
        }
        return { ...f, ...updates } as FilterItem;
      }
      return f;
    });
    setFilters(newFilters);
  };

  const applyFilters = () => {
    // Only send filters that have values
    const validFilters = filters.filter(f => {
      if (Array.isArray(f.value)) {
        return f.value.length > 0;
      }
      return f.value !== '' && f.value !== null && f.value !== undefined;
    });
    onFilterChange(validFilters);

    // Callback to parent with applied filters (for API calls)
    if (onFiltersApplied) {
      onFiltersApplied(validFilters);
    }

    // Auto-close filter panel after applying
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters([]);
    onFilterChange([]);
  };

  const getConfig = (key: string): FilterConfig<T> | undefined => {
    return configs.find(c => c.key === key);
  };

  const getOperators = (key: string): FilterOperator[] => {
    const config = getConfig(key);
    if (config?.operators) return config.operators;
    return defaultOperatorsByType[config?.type || 'text'];
  };

  const renderValueInput = (filter: FilterItem) => {
    const config = getConfig(filter.key);

    // Select type
    if (config?.type === 'select') {
      if (filter.operator === 'in') {
        // Multiple select for 'in' operator
        return (
          <FormControl fullWidth size="small">
            <InputLabel>Pilih nilai</InputLabel>
            <Select
              multiple
              value={Array.isArray(filter.value) ? filter.value : []}
              onChange={(e) => updateFilter(filter.id, { value: e.target.value as string[] })}
              label="Pilih nilai"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const option = config.options?.find(o => String(o.value) === String(value));
                    return <Chip key={value} label={option?.label || value} size="small" />;
                  })}
                </Box>
              )}
            >
              {config.options?.map((option) => (
                <MenuItem key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      // Single select
      return (
        <FormControl fullWidth size="small">
          <InputLabel>Pilih nilai</InputLabel>
          <Select
            value={filter.value as string}
            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
            label="Pilih nilai"
          >
            {config.options?.map((option) => (
              <MenuItem key={String(option.value)} value={String(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // Date type
    if (config?.type === 'date') {
      return (
        <TextField
          fullWidth
          size="small"
          type="date"
          value={filter.value as string}
          onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
      );
    }

    // Number type
    if (config?.type === 'number') {
      return (
        <TextField
          fullWidth
          size="small"
          type="number"
          value={filter.value as number}
          onChange={(e) => updateFilter(filter.id, { value: Number(e.target.value) })}
          placeholder="Masukkan angka"
        />
      );
    }

    // Text type (default)
    return (
      <TextField
        fullWidth
        size="small"
        value={filter.value as string}
        onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
        placeholder="Masukkan nilai"
      />
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Left side - Filter buttons (berdekatan) */}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          color={filters.length > 0 ? 'primary' : 'inherit'}
        >
          Filter {filters.length > 0 && `(${filters.length})`}
        </Button>

        {filters.length > 0 && (
          <>
            <Button variant="contained" onClick={applyFilters}>
              Terapkan Filter
            </Button>
            <Button
              variant="outlined"
              onClick={clearFilters}
              color="error"
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'error.main',
                  color: 'white',
                },
              }}
            >
              Hapus Semua
            </Button>
          </>
        )}
      </Box>

      {showFilters && (
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            {filters.map((filter) => (
              <Box key={filter.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Column selector */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel>Kolom</InputLabel>
                  <Select
                    value={filter.key}
                    onChange={(e: SelectChangeEvent) => updateFilter(filter.id, { key: e.target.value })}
                    label="Kolom"
                  >
                    {configs.map((config) => (
                      <MenuItem key={String(config.key)} value={String(config.key)}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Operator selector */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Operator</InputLabel>
                  <Select
                    value={filter.operator}
                    onChange={(e: SelectChangeEvent) =>
                      updateFilter(filter.id, { operator: e.target.value as FilterOperator })
                    }
                    label="Operator"
                  >
                    {getOperators(filter.key).map((op) => (
                      <MenuItem key={op} value={op}>
                        {operatorLabels[op]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Value input */}
                <Box sx={{ flex: 1 }}>{renderValueInput(filter)}</Box>

                {/* Delete button */}
                <IconButton onClick={() => removeFilter(filter.id)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Box>
              <Button startIcon={<AddIcon />} onClick={addFilter} variant="outlined" size="small">
                Tambah Filter
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

// Utility function to apply filters to data
export function applyFilters<T extends Record<string, unknown>>(
  data: T[],
  filters: FilterItem[]
): T[] {
  if (filters.length === 0) return data;

  return data.filter((row) => {
    return filters.every((filter) => {
      const value = row[filter.key];
      const filterValue = filter.value;

      // Handle null/undefined
      if (value === null || value === undefined) return false;

      const stringValue = String(value).toLowerCase();
      const stringFilterValue = String(filterValue).toLowerCase();

      switch (filter.operator) {
        case 'equals':
          return stringValue === stringFilterValue;

        case 'notEquals':
          return stringValue !== stringFilterValue;

        case 'contains':
          return stringValue.includes(stringFilterValue);

        case 'notContains':
          return !stringValue.includes(stringFilterValue);

        case 'startsWith':
          return stringValue.startsWith(stringFilterValue);

        case 'endsWith':
          return stringValue.endsWith(stringFilterValue);

        case 'greaterThan':
          if (typeof value === 'number' && typeof filterValue === 'number') {
            return value > filterValue;
          }
          return false;

        case 'lessThan':
          if (typeof value === 'number' && typeof filterValue === 'number') {
            return value < filterValue;
          }
          return false;

        case 'greaterThanOrEqual':
          if (typeof value === 'number' && typeof filterValue === 'number') {
            return value >= filterValue;
          }
          return false;

        case 'lessThanOrEqual':
          if (typeof value === 'number' && typeof filterValue === 'number') {
            return value <= filterValue;
          }
          return false;

        case 'in':
          if (Array.isArray(filterValue)) {
            return filterValue.some(fv => String(value).toLowerCase() === String(fv).toLowerCase());
          }
          return false;

        default:
          return true;
      }
    });
  });
}
