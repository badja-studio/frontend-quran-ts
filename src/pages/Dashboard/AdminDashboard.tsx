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
