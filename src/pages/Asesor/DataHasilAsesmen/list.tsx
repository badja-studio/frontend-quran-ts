import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import dummyDataPeserta, { columnsPeserta } from "./colum-table";

export default function ListAsesorPagesDataPesertaHasilAsesmen() {
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
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Data Peserta Selesai Asesmen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Lihat hasil dan status peserta yang telah menyelesaikan asesmen
        </Typography>

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
