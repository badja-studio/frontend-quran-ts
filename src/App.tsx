import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from "./pages/Login";
import GuruDashboard from "./pages/Dashboard/GuruDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import GuruSiswa from "./pages/Dashboard/GuruSiswa";
import PesertaPage from "./pages/Peserta/PesertaPage";
import PenilaianPage from "./pages/Asesor/PenilaianPage";
import ListPagesDataPeserta from "./pages/Admin/DataPeserta/list";
import ListPagesDataPesertaSiapAssement from "./pages/Admin/DataPesertaSiapAssesmen/list";
import ListPagesDataPesertaBelomAsesmen from "./pages/Admin/DataBelumAsesmen/list";
import ListPagesDataPesertaHasilAsesmen from "./pages/Admin/DataHasilAsesmen/list";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* ADMIN */}
          <Route path="/dashboard/data-peserta" element={<ListPagesDataPeserta />} />
          <Route path="/dashboard/siap-asesmen" element={<ListPagesDataPesertaSiapAssement />} />
          <Route path="/dashboard/belum-asesmen" element={<ListPagesDataPesertaBelomAsesmen />} />
          <Route path="/dashboard/hasil-asesmen" element={<ListPagesDataPesertaHasilAsesmen />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* ASESOR atau GURU */}
          <Route path="/dashboard/siswa" element={<GuruSiswa />} />
          <Route path="dashboard/guru" element={<GuruDashboard />} />

          {/* USER */}
          <Route path="/penilaian" element={<PenilaianPage />} />
          <Route path="/peserta" element={<PesertaPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
