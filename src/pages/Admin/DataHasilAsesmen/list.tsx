import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import dummyDataPeserta, { columnsPeserta } from "./colum-table";

export default function ListPagesDataPesertaHasilAsesmen() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
        console.log("Applied Filters:", appliedFilters);
        // TODO: Gunakan filters untuk API call
    };

    return (
        <DashboardLayout userRole="admin" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
            <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Data Peserta Hasil Asesmen
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Lihat hasil dan status peserta yang telah menyelesaikan asesmen
                </Typography>

                <DataTable
                    columns={columnsPeserta}
                    data={dummyDataPeserta}
                    initialRowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    emptyMessage={"Belum ada peserta dengan hasil asesmen"}
                    enableFilter={true}
                    filterConfigs={filterConfigs}
                    onFiltersApplied={handleFiltersApplied}
                    enableSearch={true}
                    searchValue={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Cari peserta (nama, NIS, kelas, dll)..."
                    enableExport={true}
                />
            </Box>
        </DashboardLayout>
    )
}