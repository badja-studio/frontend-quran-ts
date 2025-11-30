import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import ExportButton from "../../../components/Export/ExportButton";
import AsesmenResultModal from "../../../components/Peserta/AsesmenResultModal";
import { filterConfigs } from "./config-filter";
import dummyDataPeserta, { columnsPeserta } from "./colum-table";

const dataQuiz = {
  makharij: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    { simbol: "ــُ", arti: "Dlammah" },
    { simbol: "ــِـ", arti: "Kasrah" },
    { simbol: "ــَـ", arti: "Fathah" },
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    { simbol: "ــّـ", arti: "Tasydid" },
    { simbol: "ــٌـ", arti: "Dlammatain" },
    { simbol: "ــٍـ", arti: "Kasratain" },
    { simbol: "ــًـ", arti: "Fathatain" },
    { simbol: "ــْـ", arti: "Sukun" },
  ],
  shifat: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
  ],
  ahkamHuruf: [
    "Izhhar",
    "Izhhar Syafawi",
    "Idzgham Bighunnah",
    "Ikhfa’ Syafawi",
    "Idzgham Bilaghunnah",
    "Idzgham Mimi",
    "Ikhfa’",
    "Idzgham Mutajannisain",
    "Iqlab",
    "Idzgham Mutaqarribain",
  ],
  ahkamMad: [
    "Mad Thabi’i",
    "Mad Lazim Kilmi Mutsaqqal",
    "Mad Wajib Muttashil",
    "Mad Lazim Kilmi Mukhaffaf",
    "Mad Jaiz Munfashil",
    "Mad Lazim Harfi Mutsaqqal",
    "Mad Iwadz",
    "Mad Lazim Harfi Mukhaffaf",
    "Mad Lin",
    "Mad Badal",
    "Mad Aridlissukun",
    "Mad Shilah Qashirah",
    "Mad Tamkin",
    "Mad Shilah Thawilah",
    "Mad Farq",
  ],
  gharib: [
    "Iysmam",
    "Imalah",
    "Saktah",
    "Tashil",
    "Naql",
    "Badal",
    "Mad dan Qashr",
  ],
};
interface AsesmenItem {
  asesor: string;
  waktu: string;
  status: string;
  linkWa?: string;
}
export default function ListAsesorPagesDataPesertaHasilAsesmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<AsesmenItem | null>(
    null
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    setFilters(appliedFilters);
  };

  const handleDetailClick = (row: any) => {
    setSelectedAsesmen(row);
    setModalVisible(true);
  };

  // 🔥 Inject handler
  const dataWithHandlers = dummyDataPeserta.map((item) => ({
    ...item,
    onDetailClick: handleDetailClick,
  }));

  return (
    <DashboardLayout
      userRole="asesor"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Data Peserta Selesai Asesmen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lihat hasil dan status peserta yang telah menyelesaikan asesmen
            </Typography>
          </Box>
          <ExportButton 
            exportType="assessments" 
            filters={filters}
            searchQuery={searchQuery}
          />
        </Box>

        <DataTable
          columns={columnsPeserta}
          data={dataWithHandlers}
          initialRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage="Belum ada data peserta"
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari peserta..."
          enableExport={true}
        />

        {selectedAsesmen && (
          <AsesmenResultModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            pesertaName="Ahmad Zaki"
            asesorName="Ustadz Fauzan"
            waktuPelaksanaan="26 Nov 2025"
            nilaiAkhir={97.5}
            sections={[
              { title: "Makharijul Huruf", list: dataQuiz.makharij },
              { title: "Shifatul Huruf", list: dataQuiz.shifat },
              { title: "Ahkam Al-Huruf", list: dataQuiz.ahkamHuruf },
              { title: "Ahkam Al-Mad wa Qashr", list: dataQuiz.ahkamMad },
              { title: "Gharib", list: dataQuiz.gharib },
            ]}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
