import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from "./pages/Login";
import GuruDashboard from "./pages/Dashboard/GuruDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import PesertaPage from "./pages/Peserta/PesertaPage";
import PenilaianPage from "./pages/Asesor/PenilaianPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/penilaian" element={<PenilaianPage />} />
          <Route path="/peserta" element={<PesertaPage />} />
          <Route path="/guru" element={<GuruDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
