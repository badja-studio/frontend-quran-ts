import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import {
  People as PeopleIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ParticipationGroup from "../../components/Chart/ParticipationGroup";
import ProvinceBarChart from "../../components/Chart/ProvinceBarChart";
import PieChartWithInfo from "../../components/Chart/PieChartWithInfo";
import StatCardGroup from "../../components/Chart/StatCardGroup";
import DynamicBarChart from "../../components/Chart/DynamicBarChart";
import ReusableKesalahanBarChart from "../../components/Chart/TinyBarChart";
import MetrixGridTable from "../../components/Chart/MetrixGridTable";
import { useDashboard } from "../../hooks/useDashboard";
import {
  AverageScoreData,
  ParticipationByLevel,
} from "../../services/dashboard.service";
import ScoreDistributionPieChart from "../../components/Chart/ScoreDistributionPieChart";
import ScoreDistributionBarChart from "../../components/Chart/ScoreDistributionBarChart";

export default function AdminDashboard() {
  const { data, loading, error, refetch } = useDashboard();

  // Transform average scores data to match the expected format
  const transformAverageScores = (
    scores: AverageScoreData[]
  ): AverageScoreData[] => {
    return scores.map((score, index) => ({
      ...score,
      color:
        index === 0
          ? "#1B5E20"
          : score.label.includes("PAUD")
          ? "#FFC107"
          : score.label.includes("SD")
          ? "#D32F2F"
          : score.label.includes("SMP")
          ? "#1565C0"
          : score.label.includes("SMA")
          ? "#546E7A"
          : "#E64A19", // Default for Pengawas
      icon: <PeopleIcon />,
    }));
  };

  // Transform participation data with colors
  const transformParticipationData = (
    participation: ParticipationByLevel[]
  ) => {
    const colorMap: { [key: string]: string } = {
      Partisipan: "#1E3A24",
      "PAUD/TK": "#548B54",
      "SD/Sederajat": "#2E8B57",
      "SMP/Sederajat": "#3CB371",
      "SMA/Umum": "#6B8E23",
      Pengawas: "#2E8B57",
    };

    return participation.map((item) => ({
      ...item,
      color: colorMap[item.title] || "#2E8B57",
    })) as Array<ParticipationByLevel & { color: string }>;
  };

  if (loading) {
    return (
      <DashboardLayout
        userRole="admin"
        userName="Admin Utama"
        userEmail="admin@quran.app"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress size={60} />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
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
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={refetch}
                startIcon={<RefreshIcon />}
              >
                Coba Lagi
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </DashboardLayout>
    );
  }

  const { overview, performance, errors, provinces } = data;

  // Data contoh untuk UI - nanti akan diganti dengan data dari DB
  // Data lengkap 38 provinsi di Indonesia
  const provinceScoreData = [
    {
      nama_provinsi: "JAWA TIMUR",
      jml_0_59: 11114,
      jml_60_89: 24967,
      jml_90_100: 19779,
      total_peserta: 55860,
    },
    {
      nama_provinsi: "JAWA TENGAH",
      jml_0_59: 6518,
      jml_60_89: 20966,
      jml_90_100: 12456,
      total_peserta: 39940,
    },
    {
      nama_provinsi: "JAWA BARAT",
      jml_0_59: 4547,
      jml_60_89: 9617,
      jml_90_100: 5521,
      total_peserta: 19685,
    },
    {
      nama_provinsi: "SULAWESI SELATAN",
      jml_0_59: 2444,
      jml_60_89: 4984,
      jml_90_100: 2245,
      total_peserta: 9673,
    },
    {
      nama_provinsi: "NUSA TENGGARA BARAT",
      jml_0_59: 2260,
      jml_60_89: 3552,
      jml_90_100: 2456,
      total_peserta: 8268,
    },
    {
      nama_provinsi: "KALIMANTAN SELATAN",
      jml_0_59: 1221,
      jml_60_89: 4234,
      jml_90_100: 2501,
      total_peserta: 7956,
    },
    {
      nama_provinsi: "BANTEN",
      jml_0_59: 1445,
      jml_60_89: 2715,
      jml_90_100: 1983,
      total_peserta: 6143,
    },
    {
      nama_provinsi: "SUMATERA UTARA",
      jml_0_59: 2043,
      jml_60_89: 2637,
      jml_90_100: 1282,
      total_peserta: 5962,
    },
    {
      nama_provinsi: "RIAU",
      jml_0_59: 1554,
      jml_60_89: 2137,
      jml_90_100: 1315,
      total_peserta: 5006,
    },
    {
      nama_provinsi: "LAMPUNG",
      jml_0_59: 1525,
      jml_60_89: 2006,
      jml_90_100: 986,
      total_peserta: 4517,
    },
    {
      nama_provinsi: "DKI JAKARTA",
      jml_0_59: 821,
      jml_60_89: 1927,
      jml_90_100: 1241,
      total_peserta: 3989,
    },
    {
      nama_provinsi: "JAMBI",
      jml_0_59: 981,
      jml_60_89: 1495,
      jml_90_100: 879,
      total_peserta: 3355,
    },
    {
      nama_provinsi: "KALIMANTAN TENGAH",
      jml_0_59: 791,
      jml_60_89: 1595,
      jml_90_100: 809,
      total_peserta: 3195,
    },
    {
      nama_provinsi: "KALIMANTAN BARAT",
      jml_0_59: 846,
      jml_60_89: 1389,
      jml_90_100: 902,
      total_peserta: 3137,
    },
    {
      nama_provinsi: "SUMATERA BARAT",
      jml_0_59: 1282,
      jml_60_89: 1067,
      jml_90_100: 714,
      total_peserta: 3063,
    },
    {
      nama_provinsi: "SULAWESI TENGAH",
      jml_0_59: 628,
      jml_60_89: 1214,
      jml_90_100: 559,
      total_peserta: 2401,
    },
    {
      nama_provinsi: "ACEH",
      jml_0_59: 477,
      jml_60_89: 1154,
      jml_90_100: 515,
      total_peserta: 2146,
    },
    {
      nama_provinsi: "KALIMANTAN TIMUR",
      jml_0_59: 404,
      jml_60_89: 912,
      jml_90_100: 759,
      total_peserta: 2075,
    },
    {
      nama_provinsi: "NUSA TENGGARA TIMUR",
      jml_0_59: 570,
      jml_60_89: 921,
      jml_90_100: 393,
      total_peserta: 1884,
    },
    {
      nama_provinsi: "SULAWESI BARAT",
      jml_0_59: 606,
      jml_60_89: 902,
      jml_90_100: 359,
      total_peserta: 1867,
    },
    {
      nama_provinsi: "BENGKULU",
      jml_0_59: 569,
      jml_60_89: 744,
      jml_90_100: 256,
      total_peserta: 1569,
    },
    {
      nama_provinsi: "SUMATERA SELATAN",
      jml_0_59: 416,
      jml_60_89: 640,
      jml_90_100: 367,
      total_peserta: 1423,
    },
    {
      nama_provinsi: "BALI",
      jml_0_59: 129,
      jml_60_89: 528,
      jml_90_100: 452,
      total_peserta: 1109,
    },
    {
      nama_provinsi: "GORONTALO",
      jml_0_59: 243,
      jml_60_89: 485,
      jml_90_100: 155,
      total_peserta: 883,
    },
    {
      nama_provinsi: "SULAWESI UTARA",
      jml_0_59: 372,
      jml_60_89: 359,
      jml_90_100: 118,
      total_peserta: 849,
    },
    {
      nama_provinsi: "KEPULAUAN RIAU",
      jml_0_59: 108,
      jml_60_89: 403,
      jml_90_100: 274,
      total_peserta: 785,
    },
    {
      nama_provinsi: "SULAWESI TENGGARA",
      jml_0_59: 156,
      jml_60_89: 281,
      jml_90_100: 180,
      total_peserta: 617,
    },
    {
      nama_provinsi: "KEPULAUAN BANGKA BELITUNG",
      jml_0_59: 119,
      jml_60_89: 320,
      jml_90_100: 168,
      total_peserta: 607,
    },
    {
      nama_provinsi: "PAPUA BARAT",
      jml_0_59: 89,
      jml_60_89: 264,
      jml_90_100: 130,
      total_peserta: 483,
    },
    {
      nama_provinsi: "PAPUA",
      jml_0_59: 92,
      jml_60_89: 245,
      jml_90_100: 104,
      total_peserta: 441,
    },
    {
      nama_provinsi: "KALIMANTAN UTARA",
      jml_0_59: 91,
      jml_60_89: 179,
      jml_90_100: 105,
      total_peserta: 375,
    },
    {
      nama_provinsi: "MALUKU",
      jml_0_59: 86,
      jml_60_89: 169,
      jml_90_100: 62,
      total_peserta: 317,
    },
    {
      nama_provinsi: "DI YOGYAKARTA",
      jml_0_59: 52,
      jml_60_89: 119,
      jml_90_100: 105,
      total_peserta: 276,
    },
    {
      nama_provinsi: "MALUKU UTARA",
      jml_0_59: 69,
      jml_60_89: 87,
      jml_90_100: 38,
      total_peserta: 194,
    },
    {
      nama_provinsi: "PAPUA SELATAN",
      jml_0_59: 45,
      jml_60_89: 78,
      jml_90_100: 32,
      total_peserta: 155,
    },
    {
      nama_provinsi: "PAPUA TENGAH",
      jml_0_59: 38,
      jml_60_89: 65,
      jml_90_100: 27,
      total_peserta: 130,
    },
    {
      nama_provinsi: "PAPUA PEGUNUNGAN",
      jml_0_59: 41,
      jml_60_89: 71,
      jml_90_100: 28,
      total_peserta: 140,
    },
    {
      nama_provinsi: "PAPUA BARAT DAYA",
      jml_0_59: 35,
      jml_60_89: 58,
      jml_90_100: 24,
      total_peserta: 117,
    },
  ];

  const levelScoreData = [
    {
      tingkat: "PAUD/TK",
      jml_0_59: 150,
      jml_60_89: 300,
      jml_90_100: 200,
      total: 650,
    },
    {
      tingkat: "SD/Sederajat",
      jml_0_59: 500,
      jml_60_89: 1200,
      jml_90_100: 800,
      total: 2500,
    },
    {
      tingkat: "SMP/Sederajat",
      jml_0_59: 400,
      jml_60_89: 900,
      jml_90_100: 600,
      total: 1900,
    },
    {
      tingkat: "SMA/Umum",
      jml_0_59: 300,
      jml_60_89: 700,
      jml_90_100: 500,
      total: 1500,
    },
  ];

  const mapelScoreData = [
    {
      mata_pelajaran: "Guru Kelas MI",
      jml_0_59: 26875,
      jml_60_89: 56713,
      jml_90_100: 27720,
      total_peserta: 111308,
    },
    {
      mata_pelajaran: "Akidah Akhlak",
      jml_0_59: 4491,
      jml_60_89: 9487,
      jml_90_100: 5951,
      total_peserta: 19929,
    },
    {
      mata_pelajaran: "Al-Quran Hadis",
      jml_0_59: 3642,
      jml_60_89: 7797,
      jml_90_100: 8073,
      total_peserta: 19512,
    },
    {
      mata_pelajaran: "Bahasa Arab",
      jml_0_59: 2914,
      jml_60_89: 7005,
      jml_90_100: 8287,
      total_peserta: 18206,
    },
    {
      mata_pelajaran: "Fikih",
      jml_0_59: 3807,
      jml_60_89: 8190,
      jml_90_100: 6100,
      total_peserta: 18097,
    },
    {
      mata_pelajaran: "Sejarah Kebudayaan Islam",
      jml_0_59: 2939,
      jml_60_89: 6022,
      jml_90_100: 4036,
      total_peserta: 12997,
    },
  ];

  if (!overview || !performance || !errors || !provinces) {
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
          <Alert severity="warning">
            Data dashboard tidak lengkap. Silakan refresh halaman.
          </Alert>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin Utama"
      userEmail="admin@quran.app"
    >
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Dashboard Admin
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kelola semua aspek sistem pembelajaran Quran.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refetch}
            disabled={loading}
          >
            Refresh Data
          </Button>
        </Box>

        {/* Participation Statistics */}
        <Box sx={{ mb: 4, px: 2 }}>
          <ParticipationGroup
            items={transformParticipationData(overview.participationByLevel)}
          />
        </Box>

        {/* Province Participation Chart */}
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
            data={overview.participationByProvince}
            barColor1="#1C3AA9"
            barColor2="#800020"
          />
        </Grid>

        {/* Demographics Charts */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo data={overview.demographics.gender} size={260} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo
              data={overview.demographics.employeeStatus}
              size={260}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo
              data={overview.participationByLevel.map((item) => ({
                name: item.title,
                value: item.total,
              }))}
              size={260}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChartWithInfo
              data={overview.demographics.institutionType}
              size={260}
            />
          </Grid>
        </Grid>

        {/* Average Scores Cards */}
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
          <StatCardGroup
            items={transformAverageScores(overview.averageScores)}
          />
        </Grid>
        {/* Province Achievement */}
        <Grid item xs={12} md={6}>
          <DynamicBarChart
            title="Capaian Nilai Ujian Peserta per Provinsi"
            data={performance.provinceAchievement.map((item) => ({
              ...item,
              [item.name]: item.name, // Add index signature requirement
            }))}
            keys={["terendah", "tertinggi", "rata"]}
          />
        </Grid>

        {/* Fluency Levels */}
        <Grid item xs={12} md={6}>
          <DynamicBarChart
            title="Persentase Tingkat Kelancaran Al-Quran per Provinsi"
            data={performance.fluencyLevels.map((item) => ({
              ...item,
              pratama: item.kurang_lancar,
              madya: item.mahir,
              mahir: item.lancar,
            }))}
            keys={["pratama", "madya", "mahir"]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ScoreDistributionBarChart
            title="Distribusi Nilai Peserta per Provinsi"
            data={provinceScoreData.map((item) => ({
              label: item.nama_provinsi,
              score_0_59: item.jml_0_59,
              score_60_89: item.jml_60_89,
              score_90_100: item.jml_90_100,
              total: item.total_peserta,
            }))}
            height={400}
          />
        </Grid>

        {/* Distribusi Nilai per Provinsi - Full Width */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <ScoreDistributionPieChart
              title="Proporsi Kategori Nilai"
              data={provinceScoreData.map((item) => ({
                label: item.nama_provinsi,
                score_0_59: item.jml_0_59,
                score_60_89: item.jml_60_89,
                score_90_100: item.jml_90_100,
                total: item.total_peserta,
              }))}
              size={400}
            />
          </Grid>
        </Grid>

        {/* Distribusi Nilai per Tingkat */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              fontSize={20}
              align="center"
              sx={{ mb: 2 }}
            >
              DISTRIBUSI NILAI PESERTA PER TINGKAT
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreDistributionPieChart
              title="Proporsi Kategori Nilai"
              data={levelScoreData.map((item) => ({
                label: item.tingkat,
                score_0_59: item.jml_0_59,
                score_60_89: item.jml_60_89,
                score_90_100: item.jml_90_100,
                total: item.total,
              }))}
              size={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreDistributionBarChart
              title="Detail per Tingkat"
              data={levelScoreData.map((item) => ({
                label: item.tingkat,
                score_0_59: item.jml_0_59,
                score_60_89: item.jml_60_89,
                score_90_100: item.jml_90_100,
                total: item.total,
              }))}
              height={400}
            />
          </Grid>
        </Grid>

        {/* Distribusi Nilai per Mata Pelajaran */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              fontSize={20}
              align="center"
              sx={{ mb: 2 }}
            >
              DISTRIBUSI NILAI PESERTA PER MATA PELAJARAN
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreDistributionPieChart
              title="Proporsi Kategori Nilai"
              data={mapelScoreData.map((item) => ({
                label: item.mata_pelajaran,
                score_0_59: item.jml_0_59,
                score_60_89: item.jml_60_89,
                score_90_100: item.jml_90_100,
                total: item.total_peserta,
              }))}
              size={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreDistributionBarChart
              title="Detail per Mata Pelajaran"
              data={mapelScoreData.map((item) => ({
                label: item.mata_pelajaran,
                score_0_59: item.jml_0_59,
                score_60_89: item.jml_60_89,
                score_90_100: item.jml_90_100,
                total: item.total_peserta,
              }))}
              height={400}
            />
          </Grid>
        </Grid>
        {/* Performance Charts */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Makharij Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Makharij Al-Huruf"
              data={errors.makharij}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.makharij}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* Sifat Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Shifat Al-Huruf"
              data={errors.sifat}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.sifat}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* Ahkam Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Ahkam Al-Huruf"
              data={errors.ahkam}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.ahkam}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* Mad Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Ahkam Al-Mad wa Qashr"
              data={errors.mad}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.mad}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* kesalahan */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Kelancaran Membaca Al-Quran"
              data={errors.penalties}
              headerColor="#00838F"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.penalties}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
          {/* Penalties */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Kelayakan Untuk Dinilai"
              data={errors.penalties}
              headerColor="#00838F"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.penalties}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
