import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// Hardcoded data untuk demo
const stats = [
  {
    title: 'Total Pengguna',
    value: '256',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
    change: '+12%',
  },
  {
    title: 'Total Guru',
    value: '24',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
    change: '+3',
  },
  {
    title: 'Total Kelas',
    value: '18',
    icon: <ClassIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02',
    change: '+2',
  },
  {
    title: 'Siswa Aktif',
    value: '208',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
    change: '+15%',
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin" userName="Admin Utama" userEmail="admin@quran.app">
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard Admin
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Kelola semua aspek sistem pembelajaran Quran.
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
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'success.main',
                          fontWeight: 'medium',
                        }}
                      >
                        {stat.change} bulan ini
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
                    action: 'Guru baru terdaftar',
                    detail: 'Ustadzah Aisyah bergabung sebagai guru',
                    time: '15 menit yang lalu',
                  },
                  {
                    action: 'Kelas baru dibuat',
                    detail: 'Kelas Tahfidz Tingkat Lanjut oleh Ustadz Ahmad',
                    time: '1 jam yang lalu',
                  },
                  {
                    action: 'Update sistem',
                    detail: 'Fitur laporan bulanan telah diperbarui',
                    time: '2 jam yang lalu',
                  },
                  {
                    action: 'Registrasi siswa',
                    detail: '5 siswa baru mendaftar hari ini',
                    time: '3 jam yang lalu',
                  },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom: index < 3 ? '1px solid' : 'none',
                      borderColor: 'divider',
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
                  'Tambah Guru Baru',
                  'Buat Kelas Baru',
                  'Lihat Laporan',
                  'Pengaturan Sistem',
                ].map((action, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.dark',
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
                  { label: 'Server', status: 'Online', color: 'success.main' },
                  { label: 'Database', status: 'Online', color: 'success.main' },
                  { label: 'Storage', status: '78%', color: 'warning.main' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      borderBottom: index < 2 ? '1px solid' : 'none',
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: item.color,
                        color: 'white',
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
