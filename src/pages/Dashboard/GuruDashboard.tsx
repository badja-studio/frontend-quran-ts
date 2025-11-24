import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// Hardcoded data untuk demo
const stats = [
  {
    title: 'Total Siswa',
    value: '45',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    title: 'Kelas Aktif',
    value: '3',
    icon: <BookIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
  },
  {
    title: 'Tugas Aktif',
    value: '8',
    icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02',
  },
  {
    title: 'Rata-rata Nilai',
    value: '85',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
  },
];

export default function GuruDashboard() {
  return (
    <DashboardLayout userRole="guru" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard Guru
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Selamat datang di dashboard guru, kelola kelas dan siswa Anda.
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom variant="body2">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        color: stat.color,
                        opacity: 0.8,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activities */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Aktivitas Terbaru
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  'Muhammad Ali mengumpulkan tugas Surat Al-Fatihah',
                  'Fatimah Zahra menyelesaikan hafalan Juz 30',
                  'Ahmad Ibrahim bertanya tentang tajwid',
                  'Khadijah binti Ahmad mengumpulkan tugas',
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom: index < 3 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2">{activity}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {index + 1} jam yang lalu
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Tugas Menunggu
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { name: 'Hafalan Al-Baqarah', count: 12 },
                  { name: 'Tajwid Dasar', count: 8 },
                  { name: 'Tafsir Surat Yasin', count: 5 },
                ].map((task, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom: index < 2 ? '1px solid' : 'none',
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2">{task.name}</Typography>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption">{task.count}</Typography>
                    </Box>
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
