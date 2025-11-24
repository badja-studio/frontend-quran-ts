import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Login from './pages/Login';
import GuruDashboard from './pages/Dashboard/GuruDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import GuruSiswa from './pages/Dashboard/GuruSiswa';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/guru" element={<GuruDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/siswa" element={<GuruSiswa />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

