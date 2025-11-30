import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Alert,
  Snackbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  TableChart as ExcelIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { exportService, useExport, ExportOptions } from '../../services/export.service';
import { FilterItem } from '../Table/DataTableFilter';

export interface ExportButtonProps {
  exportType: 'participants' | 'participants-not-assessed' | 'participants-ready-to-assess' | 'assessors' | 'assessments';
  filters?: FilterItem[];
  searchQuery?: string;
  filename?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  exportType,
  filters = [],
  searchQuery = '',
  filename,
  variant = 'outlined',
  size = 'medium',
  disabled = false,
}) => {
  const { isExporting, exportError, exportData, clearError } = useExport();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getExportFunction = () => {
    switch (exportType) {
      case 'participants':
        return exportService.exportParticipants.bind(exportService);
      case 'participants-not-assessed':
        return exportService.exportParticipantsNotAssessed.bind(exportService);
      case 'participants-ready-to-assess':
        return exportService.exportParticipantsReadyToAssess.bind(exportService);
      case 'assessors':
        return exportService.exportAssessors.bind(exportService);
      case 'assessments':
        return exportService.exportAssessments.bind(exportService);
      default:
        return exportService.exportParticipants.bind(exportService);
    }
  };

  const handleExport = async (format: 'excel' | 'pdf') => {
    handleClose();

    const options: ExportOptions = {
      format,
      filters: {
        searchQuery,
        filters,
      },
      filename,
    };

    try {
      await exportData(getExportFunction(), options);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <>
      <ButtonGroup variant={variant} size={size}>
        <Button
          startIcon={isExporting ? <CircularProgress size={16} /> : <FileDownloadIcon />}
          onClick={handleClick}
          disabled={disabled || isExporting}
          endIcon={<ExpandMoreIcon />}
        >
          {isExporting ? 'Mengunduh...' : 'Unduh'}
        </Button>
      </ButtonGroup>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleExport('excel')} disabled={isExporting}>
          <ListItemIcon>
            <ExcelIcon color="success" />
          </ListItemIcon>
          <ListItemText>Excel (.xlsx)</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={!!exportError}
        autoHideDuration={6000}
        onClose={clearError}
      >
        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
          {exportError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportButton;
