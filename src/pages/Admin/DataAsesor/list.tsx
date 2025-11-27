import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { dummyDataAsesor, columnsAsesor } from "./colum-table";

export default function ListPagesDataAsesor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    setFilters(appliedFilters);
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Daftar Rekap Asesor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Pantau dan kelola rekap data asesor serta jumlah peserta yang ditangani
        </Typography>

        <DataTable
          columns={columnsAsesor}
          data={dummyDataAsesor}
          initialRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          // onRowClick={handleRowClick}
          emptyMessage="Belum ada data peserta"
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari peserta (nama, NIS, kelas, dll)..."
          enableExport={true}
        // onExport={handleExport}
        />
      </Box>
    </DashboardLayout>
  );
}
