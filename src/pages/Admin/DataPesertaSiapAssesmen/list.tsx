import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import dummyData, { columnsPeserta } from "./colum-table";
import { DataPersetaSiapAssesmen } from "./type";

export default function ListPagesDataPesertaSiapAssement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<DataPersetaSiapAssesmen[]>(dummyData);
  const [loading] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFiltersApplied = (_appliedFilters: FilterItem[]) => {
    // Filters can be applied here if needed
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Data Peserta Siap Asesmen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Peserta yang telah siap untuk mengikuti asesmen kompetensi
        </Typography>

        <DataTable
          columns={columnsPeserta}
          data={data}
          initialRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage={
            loading ? "Memuat data..." : "Belum ada peserta siap asesmen"
          }
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari peserta (nama, status, sekolah, dll)..."
          enableExport={true}
        />
      </Box>
    </DashboardLayout>
  );
}
