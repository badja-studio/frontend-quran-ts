import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import ExportButton from "../../../components/Export/ExportButton";
import { filterConfigs } from "./config-filter";
import dummyDataPeserta, { columnsPeserta } from "./colum-table";

export default function ListAsesorPagesDataPesertaBelomAsesmen() {
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
      userRole="guru"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Data Peserta Belum Asesmen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kelola pendaftaran dan verifikasi data peserta yang belum mengikuti
              asesmen
            </Typography>
          </Box>
          <ExportButton 
            exportType="participants-not-assessed" 
            filters={filters}
            searchQuery={searchQuery}
          />
        </Box>

        <DataTable
          columns={columnsPeserta}
          data={dummyDataPeserta}
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
