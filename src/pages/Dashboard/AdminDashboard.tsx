import { Grid, Typography, Box } from "@mui/material";
import { People as PeopleIcon } from "@mui/icons-material";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ParticipationGroup from "../../components/Chart/ParticipationGroup";
import ProvinceBarChart from "../../components/Chart/ProvinceBarChart";
import PieChartWithInfo from "../../components/Chart/PieChartWithInfo";
import StatCardGroup from "../../components/Chart/StatCardGroup";
import DynamicBarChart from "../../components/Chart/DynamicBarChart";
import ReusableKesalahanBarChart from "../../components/Chart/TinyBarChart";
import MetrixGridTable from "../../components/Chart/MetrixGridTable";

const participationData = [
  { title: "Partisipan", total: 252750, done: 107244, color: "#1E3A24" }, // Deep Forest Green
  { title: "PAUD/TK", total: 8069, done: 3467, color: "#548B54" }, // Olive Green / Fern Green
  { title: "SD/Sederajat", total: 156792, done: 67854, color: "#2E8B57" }, // Sea Green
  { title: "SMP/Sederajat", total: 48570, done: 19416, color: "#3CB371" }, // Medium Sea Green
  { title: "SMA/Umum", total: 37333, done: 15690, color: "#6B8E23" }, // Olive Drab
  { title: "Pengawas", total: 1883, done: 802, color: "#2E8B57" }, // Dark Sea Green
];

const provinsiData = [
  // --- Sumatera ---
  { name: "Aceh", registered: 4500, participated: 2900 },
  { name: "Sumut", registered: 8900, participated: 5500 },
  { name: "Sumbar", registered: 4100, participated: 2800 },
  { name: "Riau", registered: 5700, participated: 3600 },
  { name: "Jambi", registered: 3900, participated: 2400 },
  { name: "Sumsel", registered: 6800, participated: 4100 },
  { name: "Bengkulu", registered: 2100, participated: 1500 },
  { name: "Lampung", registered: 5500, participated: 3300 },
  { name: "Babel", registered: 1800, participated: 1100 }, // Kep. Bangka Belitung
  { name: "Kepri", registered: 2900, participated: 1900 }, // Kepulauan Riau

  // --- Jawa ---
  { name: "DKI", registered: 5800, participated: 4300 }, // DKI Jakarta
  { name: "Jabar", registered: 12000, participated: 8000 }, // Jawa Barat
  { name: "Jateng", registered: 9500, participated: 6100 }, // Jawa Tengah
  { name: "DIY", registered: 3100, participated: 2500 }, // DI Yogyakarta
  { name: "Jatim", registered: 11000, participated: 7400 }, // Jawa Timur
  { name: "Banten", registered: 4200, participated: 2700 },

  // --- Bali & Nusa Tenggara ---
  { name: "Bali", registered: 3500, participated: 2300 },
  { name: "NTB", registered: 4800, participated: 3200 }, // Nusa Tenggara Barat
  { name: "NTT", registered: 5200, participated: 3100 }, // Nusa Tenggara Timur

  // --- Kalimantan ---
  { name: "Kalbar", registered: 3800, participated: 2600 }, // Kalimantan Barat
  { name: "Kalteng", registered: 2600, participated: 1700 }, // Kalimantan Tengah
  { name: "Kalsel", registered: 3400, participated: 2200 }, // Kalimantan Selatan
  { name: "Kaltim", registered: 4300, participated: 2900 }, // Kalimantan Timur
  { name: "Kaltara", registered: 1500, participated: 900 }, // Kalimantan Utara

  // --- Sulawesi ---
  { name: "Sulut", registered: 3300, participated: 2100 }, // Sulawesi Utara
  { name: "Sulteng", registered: 2700, participated: 1600 }, // Sulawesi Tengah
  { name: "Sulsel", registered: 7100, participated: 4500 }, // Sulawesi Selatan
  { name: "Sultra", registered: 3000, participated: 1800 }, // Sulawesi Tenggara
  { name: "Gorontalo", registered: 1400, participated: 800 },
  { name: "Sulbar", registered: 2000, participated: 1200 }, // Sulawesi Barat

  // --- Maluku & Papua ---
  { name: "Maluku", registered: 2300, participated: 1400 },
  { name: "Malut", registered: 1700, participated: 1000 }, // Maluku Utara
  { name: "Papua", registered: 2500, participated: 1300 },
  { name: "Pabar", registered: 1900, participated: 1000 }, // Papua Barat
  { name: "Pasel", registered: 1100, participated: 500 }, // Papua Selatan
  { name: "Paten", registered: 1200, participated: 600 }, // Papua Tengah
  { name: "Papgun", registered: 900, participated: 400 }, // Papua Pegunungan
  { name: "PBD", registered: 1300, participated: 700 }, // Papua Barat Daya
];

const jenisKelaminData = [
  { name: "Laki-laki", value: 12400 },
  { name: "Perempuan", value: 15800 },
];
const statusPegawaiData = [
  { name: "PNS", value: 8200 },
  { name: "Non-PNS", value: 12000 },
];
const jenjangSekolahData = [
  { name: "PAUD/TK", value: 8069 },
  { name: "SD", value: 156792 },
  { name: "SMP", value: 48570 },
  { name: "SMA", value: 37333 },
];
const statusKampusData = [
  { name: "Negeri", value: 5400 },
  { name: "Swasta", value: 7400 },
];

const dataDashboard = [
  {
    value: "87,87",
    label: "Rata² Nilai Peserta",
    color: "#1B5E20",
    icon: <PeopleIcon />,
  },
  {
    value: "87,16",
    label: "Rata² PAUD/TK",
    color: "#FFC107",
    icon: <PeopleIcon />,
  },
  {
    value: "87,52",
    label: "Rata² SD",
    color: "#D32F2F",
    icon: <PeopleIcon />,
  },
  {
    value: "88,61",
    label: "Rata² SMP",
    color: "#1565C0",
    icon: <PeopleIcon />,
  },
  {
    value: "88,64",
    label: "Rata² SMA/Umum",
    color: "#546E7A",
    icon: <PeopleIcon />,
  },
  {
    value: "88,11",
    label: "Rata² Pengawas",
    color: "#E64A19",
    icon: <PeopleIcon />,
  },
];

const kelancaranData = [
  // Total setiap provinsi = 100%
  // --- Pulau Jawa ---
  { name: "Jabar", lancar: 60, mahir: 30, kurang_lancar: 10 },
  { name: "Jateng", lancar: 55, mahir: 35, kurang_lancar: 10 },
  { name: "Jatim", lancar: 65, mahir: 25, kurang_lancar: 10 },
  { name: "DKI", lancar: 70, mahir: 20, kurang_lancar: 10 },
  { name: "Banten", lancar: 50, mahir: 35, kurang_lancar: 15 },

  // --- Sumatera & Kalimantan ---
  { name: "Sumut", lancar: 45, mahir: 40, kurang_lancar: 15 },
  { name: "Sumsel", lancar: 40, mahir: 45, kurang_lancar: 15 },
  { name: "Riau", lancar: 58, mahir: 32, kurang_lancar: 10 },
  { name: "Lampung", lancar: 35, mahir: 40, kurang_lancar: 25 },
  { name: "Kaltim", lancar: 68, mahir: 20, kurang_lancar: 12 },

  // --- Sulawesi, Bali, & NTT ---
  { name: "Sulsel", lancar: 52, mahir: 38, kurang_lancar: 10 },
  { name: "Sulut", lancar: 63, mahir: 27, kurang_lancar: 10 },
  { name: "Bali", lancar: 75, mahir: 15, kurang_lancar: 10 },
  { name: "NTB", lancar: 48, mahir: 42, kurang_lancar: 10 },
  { name: "NTT", lancar: 30, mahir: 45, kurang_lancar: 25 },

  // --- Provinsi Lain ---
  { name: "Papua", lancar: 25, mahir: 50, kurang_lancar: 25 },
  { name: "DIY", lancar: 72, mahir: 23, kurang_lancar: 5 },
];

const dataProvinsi = [
  { name: "Jabar", terendah: 72.4, rata: 87.16, tertinggi: 98.2 },
  { name: "Jateng", terendah: 70.1, rata: 85.33, tertinggi: 96.5 },
  { name: "Jatim", terendah: 69.5, rata: 84.88, tertinggi: 97.8 },
];

const makharijKesalahanData = [
  { name: "ع", total: 18500 },
  { name: "غ", total: 20500 },
  { name: "خ", total: 25500 },
  { name: "د", total: 30000 },
  { name: "ط", total: 30500 },
  { name: "ق", total: 39500 },
  { name: "ك", total: 47000 },
  { name: "ف", total: 36500 },
  { name: "م", total: 20000 },
  { name: "ل", total: 26000 },
];

const sifatulHurufKesalahanData = [
  { name: "ع", total: 35000 },
  { name: "غ", total: 41000 },
  { name: "خ", total: 18000 },
  { name: "د", total: 29500 },
  { name: "ط", total: 20000 },
  { name: "ق", total: 45000 }, // Nilai tertinggi
  { name: "ك", total: 33000 },
  { name: "ف", total: 15500 }, // Nilai terendah
  { name: "م", total: 27500 },
  { name: "ل", total: 39000 },
];

const ahkamAlHurufKesalahanData = [
  { name: "Ghünnah Musyaddadah", total: 52000 },
  { name: "Idzghâm Bilaghünnah", total: 58000 },
  { name: "Idzghâm Mutamassilain", total: 8000 },
  { name: "Idzghâm Mutaqâribain", total: 10500 },
  { name: "Ikhfâ", total: 68000 }, // Nilai Tertinggi
  { name: "Iqlâb", total: 6500 },
  { name: "Idzhâr Syafawi", total: 27000 },
  { name: "Idzghâm Mimi", total: 12000 },
  { name: "Ikhfâ Syafawi", total: 17000 },
  { name: "Tanâfus", total: 32000 },
];
const madWaQashrKesalahanData = [
  { name: "Mad Aridlissukun", total: 10000 },
  { name: "Mad Iwadh", total: 21000 },
  { name: "Mad Jaiz Muntashil", total: 28000 },
  { name: "Mad Lazim Harfi Musaqqal", total: 65000 }, // Nilai Tertinggi
  { name: "Mad Lazim Kilmi Mukhaffaf", total: 19000 },
  { name: "Mad Shilah Qashira", total: 10000 },
  { name: "Mad Thabi'i", total: 60000 },
  { name: "Mad Wajib Muttashil", total: 35000 },
  { name: "Qashr", total: 40000 },
  { name: "Ziyadatul Mad", total: 55000 },
];

const penguranganNilaiData = [
  {
    name: "Kelebihan Waktu",
    total: 0.28,
  },
  {
    name: "Tidak Bisa Membaca",
    total: 0.12, // Representasi 0.12%
  },
];
export default function AdminDashboard() {
  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin Utama"
      userEmail="admin@quran.app"
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard Admin
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Kelola semua aspek sistem pembelajaran Quran.
        </Typography>
        {/* Statistics Cards */}
        <Grid
          container
          spacing={3}
          sx={{ mb: 4, px: 2, justifyContent: "center", alignItems: "center" }}
        >
          <ParticipationGroup items={participationData} />
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ mb: 4, justifyContent: "center", alignContent: "center" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              fontSize={20}
              justifyContent="center"
              align="center"
              sx={{ px: 2 }}
            >
              PARTISIPASI PESERTA BERDASARKAN PROVINSI
            </Typography>
          </Grid>
          <ProvinceBarChart
            data={provinsiData}
            barColor1="#1C3AA9"
            barColor2="#800020"
          />
        </Grid>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo data={jenisKelaminData} size={260} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo data={statusPegawaiData} size={260} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo data={jenjangSekolahData} size={260} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo data={statusKampusData} size={260} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{
            p: 4,
            px: 2,
            pl: 5,
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <StatCardGroup items={dataDashboard} />
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* ===== ROW 1 ===== */}
          <Grid item xs={12} md={6}>
            <DynamicBarChart
              title="Capaian Nilai Ujian Peserta per Provinsi"
              data={dataProvinsi}
              keys={["terendah", "tertinggi", "rata"]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DynamicBarChart
              title="Persentase Tingkat Kelancaran Al-Quran per Provinsi"
              data={kelancaranData}
              keys={["kurang_lancar", "lancar", "mahir"]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Makharij Al-Huruf"
              data={makharijKesalahanData}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={makharijKesalahanData}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Shifat Al-Huruf"
              data={sifatulHurufKesalahanData}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={sifatulHurufKesalahanData}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Ahkam Al-Huruf"
              data={ahkamAlHurufKesalahanData}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={ahkamAlHurufKesalahanData}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Ahkam Al-Mad wa Qashr"
              data={madWaQashrKesalahanData}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={madWaQashrKesalahanData}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Pengurangan Nilai Peserta"
              data={penguranganNilaiData}
              headerColor="#00838F"
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
