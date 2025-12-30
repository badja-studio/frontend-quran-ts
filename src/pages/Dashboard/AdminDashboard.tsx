import React from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import {
  People as PeopleIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
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
  ScoreDistributionByLevel,
  ScoreDistributionBySubject,
  dashboardService,
} from "../../services/dashboard.service";
import ScoreDistributionPieChart from "../../components/Chart/ScoreDistributionPieChart";
import ScoreDistributionBarChart from "../../components/Chart/ScoreDistributionBarChart";

export default function AdminDashboard() {
  // State untuk filter provinsi
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");

  // Load dashboard data with province filter
  const { data, loading, error, refetch } = useDashboard(selectedProvince || undefined);

  // Load provinces list from API
  const [provinceOptions, setProvinceOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function fetchProvinces() {
      try {
        const provinces = await dashboardService.getProvincesList();
        setProvinceOptions(provinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
    fetchProvinces();
  }, []);

  // Load score distribution data from API
  const [levelScoreData, setLevelScoreData] = React.useState<ScoreDistributionByLevel[]>([]);
  const [mapelScoreData, setMapelScoreData] = React.useState<ScoreDistributionBySubject[]>([]);

  React.useEffect(() => {
    async function fetchScoreDistributions() {
      try {
        const [levelData, subjectData] = await Promise.all([
          dashboardService.getScoreDistributionByLevel(selectedProvince || undefined),
          dashboardService.getScoreDistributionBySubject(selectedProvince || undefined),
        ]);
        setLevelScoreData(levelData);
        setMapelScoreData(subjectData);
      } catch (error) {
        console.error("Error fetching score distributions:", error);
      }
    }
    fetchScoreDistributions();
  }, [selectedProvince]);

  const handleProvinceChange = (event: SelectChangeEvent<string>) => {
    const province = event.target.value;
    setSelectedProvince(province);
  };

  const handleResetFilter = () => {
    setSelectedProvince("");
  };

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

        {/* Filter Section */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#f8f9fa",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <FilterListIcon fontSize="small" color="action" />
                <FormControl fullWidth size="small">
                  <InputLabel id="province-select-label">
                    Filter Provinsi
                  </InputLabel>
                  <Select
                    labelId="province-select-label"
                    id="province-select"
                    value={selectedProvince}
                    label="Filter Provinsi"
                    onChange={handleProvinceChange}
                  >
                    <MenuItem value="">
                      <em>Semua Provinsi</em>
                    </MenuItem>
                    {provinceOptions.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            {selectedProvince && (
              <Grid item xs={12} sm={6} md={8}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ flex: 1 }}
                  >
                    Menampilkan data per Kota/Kabupaten di{" "}
                    <strong>{selectedProvince}</strong>
                  </Typography>
                  <Button
                    size="small"
                    variant="text"
                    color="error"
                    startIcon={<ClearIcon fontSize="small" />}
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
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
          {/* <DynamicBarChart
            title="Persentase Tingkat Kelancaran Al-Quran per Provinsi"
            data={performance.fluencyLevels.map((item) => ({
              ...item,
              pratama: item.kurang_lancar,
              madya: item.mahir,
              mahir: item.lancar,
            }))}
            keys={["pratama", "madya", "mahir"]}
          /> */}
        </Grid>
        <Grid container spacing={3}>
          {/* BAR CHART - FULL WIDTH */}
          <Grid item xs={12}>
            <ScoreDistributionBarChart
              title="Distribusi Tingkat Kelancaran Al-Quran per Provinsi"
              data={performance.fluencyLevels.map((item) => ({
                label: item.name,
                score_0_59: item.kurang_lancar,
                score_60_89: item.mahir,
                score_90_100: item.lancar,
                total: item.kurang_lancar + item.mahir + item.lancar,
              }))}
              height={420}
            />
          </Grid>

          {/* PIE + INFO */}
          <Grid item xs={12} md={4}>
            <ScoreDistributionPieChart
              title="Proporsi Tingkat Kelancaran (Nasional)"
              data={performance.fluencyLevels.map((item) => ({
                label: item.name,
                score_0_59: item.kurang_lancar,
                score_60_89: item.mahir,
                score_90_100: item.lancar,
                total: item.kurang_lancar + item.mahir + item.lancar,
              }))}
              size={260}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Bisa diisi summary / insight */}
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Ringkasan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grafik ini menampilkan distribusi tingkat kelancaran membaca
                Al-Quran peserta per provinsi berdasarkan tiga kategori:
                Pratama, Madya, dan Mahir. Visualisasi ini memberikan gambaran
                komposisi kelancaran peserta di setiap provinsi.
              </Typography>
            </Paper>
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
              DISTRIBUSI NILAI PESERTA PER TINGKAT Pendidikan
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
          {/* Makhraj Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Makhraj Al-Huruf"
              data={errors.makhraj}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.makhraj}
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

          {/* Gharib Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Kalimat Gharib"
              data={errors.gharib}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.gharib}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* Kelancaran Errors */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Kelancaran Membaca Al-Quran"
              data={errors.kelancaran}
              headerColor="#00838F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReusableKesalahanBarChart
              data={errors.kelancaran}
              colors={["#B74B63", "#456D93", "#C59647", "#5E8E8E", "#7D6493"]}
              height={350}
            />
          </Grid>

          {/* Penalties */}
          <Grid item xs={12} md={6}>
            <MetrixGridTable
              title="Pengurangan / Kelayakan Untuk Dinilai"
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
