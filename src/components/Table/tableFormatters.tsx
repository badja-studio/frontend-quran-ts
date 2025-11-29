import { Chip } from '@mui/material';

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
