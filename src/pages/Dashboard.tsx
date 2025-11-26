import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import {
  People as PeopleIcon,
  MenuBook as MenuBookIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import authService from '../services/authService';

function Dashboard() {
  const userInfo = authService.getUserInfo();
  const userName = userInfo?.name || userInfo?.email || 'User';
  const userRole = userInfo?.roles || 'Assessee';

  const stats = [
    {
      title: 'Total Users',
      value: '150',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      visible: userRole === 'Admin',
    },
    {
      title: 'Surahs',
      value: '114',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      visible: true,
    },
    {
      title: 'Assessments',
      value: '45',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      visible: true,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {userName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You are logged in as <strong>{userRole}</strong>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats
          .filter((stat) => stat.visible)
          .map((stat) => (
            <Grid item xs={12} sm={6} md={4} key={stat.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                    <Typography variant="h3" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This dashboard is under construction. More features coming soon!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Dashboard;
