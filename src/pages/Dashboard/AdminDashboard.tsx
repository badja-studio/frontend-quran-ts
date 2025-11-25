import { Grid, Paper, Typography, Box, Card, CardContent } from "@mui/material";
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ParticipationGroup from "../../components/Chart/ParticipationGroup";
import ProvinceBarChart from "../../components/Chart/ProvinceBarChart";
import ReusableKesalahanBarChart from "../../components/Chart/TinyBarChart";
import ReusablePieChart from "../../components/Chart/PieChart";
import PieChartWithInfo from "../../components/Chart/PieChartWithInfo";

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

// Hardcoded data untuk demo
const stats = [
  {
    title: "Total Pengguna",
    value: "256",
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: "#1976d2",
    change: "+12%",
  },
  {
    title: "Total Guru",
    value: "24",
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    color: "#2e7d32",
    change: "+3",
  },
  {
    title: "Total Kelas",
    value: "18",
    icon: <ClassIcon sx={{ fontSize: 40 }} />,
    color: "#ed6c02",
    change: "+2",
  },
  {
    title: "Siswa Aktif",
    value: "208",
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: "#9c27b0",
    change: "+15%",
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
        <Grid container spacing={3} sx={{ mb: 4, px: 2 }}>
          <ParticipationGroup items={participationData} />
        </Grid>
        <Grid container spacing={3} sx={{ mb: 4 }}>
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
        <Grid container spacing={2}>
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

        {/* Main Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Aktivitas Sistem
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  {
                    action: "Guru baru terdaftar",
                    detail: "Ustadzah Aisyah bergabung sebagai guru",
                    time: "15 menit yang lalu",
                  },
                  {
                    action: "Kelas baru dibuat",
                    detail: "Kelas Tahfidz Tingkat Lanjut oleh Ustadz Ahmad",
                    time: "1 jam yang lalu",
                  },
                  {
                    action: "Update sistem",
                    detail: "Fitur laporan bulanan telah diperbarui",
                    time: "2 jam yang lalu",
                  },
                  {
                    action: "Registrasi siswa",
                    detail: "5 siswa baru mendaftar hari ini",
                    time: "3 jam yang lalu",
                  },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom: index < 3 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {activity.action}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.detail}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  "Tambah Guru Baru",
                  "Buat Kelas Baru",
                  "Lihat Laporan",
                  "Pengaturan Sistem",
                ].map((action, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    <Typography variant="body2">{action}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Status Sistem
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { label: "Server", status: "Online", color: "success.main" },
                  {
                    label: "Database",
                    status: "Online",
                    color: "success.main",
                  },
                  { label: "Storage", status: "78%", color: "warning.main" },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      borderBottom: index < 2 ? "1px solid" : "none",
                      borderColor: "divider",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: item.color,
                        color: "white",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {item.status}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
