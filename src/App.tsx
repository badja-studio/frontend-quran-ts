import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Card, CardContent, Button } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}15 100%)`,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
            <MenuBookIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h1" component="h1" gutterBottom>
              Quran App
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </Typography>
          </Box>

          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Welcome to Quran App
              </Typography>
              <Typography variant="body1" paragraph>
                This is a modern React TypeScript application with Material-UI and Tailwind CSS.
              </Typography>
              <Typography variant="body1" paragraph>
                Features:
              </Typography>
              <ul className="ml-6 mb-4">
                <li>⚛️ React 18 with TypeScript</li>
                <li>🎨 Material-UI with custom green theme</li>
                <li>🎯 Tailwind CSS for utility styling</li>
                <li>📡 Axios for API calls</li>
                <li>🐳 Docker support for dev and production</li>
                <li>🌍 Environment-based configuration</li>
              </ul>
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                >
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom className="arabic-text" sx={{ textAlign: 'right' }}>
                قُلْ هُوَ اللَّهُ أَحَدٌ
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                Say, "He is Allah, [who is] One"
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
