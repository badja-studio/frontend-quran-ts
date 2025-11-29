import { FilterItem } from './DataTableFilter';

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
