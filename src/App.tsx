import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from "./pages/Login";
import GuruDashboard from "./pages/Dashboard/GuruDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import GuruSiswa from "./pages/Dashboard/GuruSiswa";
import PesertaPage from "./pages/Peserta/PesertaPage";
import ListPagesDataPeserta from "./pages/Admin/DataPeserta/list";
import ListPagesDataPesertaSiapAssement from "./pages/Admin/DataPesertaSiapAssesmen/list";
import ListPagesDataPesertaBelomAsesmen from "./pages/Admin/DataBelumAsesmen/list";
import ListPagesDataPesertaHasilAsesmen from "./pages/Admin/DataHasilAsesmen/list";
import ListAsesorPagesDataPesertaSiapAssement from "./pages/Asesor/DataPesertaSiapAssesmen/list";
import ListAsesorPagesDataPesertaBelomAsesmen from "./pages/Asesor/DataBelumAsesmen/list";
import ListAsesorPagesDataPesertaHasilAsesmen from "./pages/Asesor/DataHasilAsesmen/list";
import ListPagesDataAsesor from "./pages/Admin/DataAsesor/list";
import AsesmenForm from "./pages/Asesor/KelolaDataPengguna/FormPengguna";
import AdminForm from "./pages/Admin/KelolaDataPengguna/FormPengguna";
import InputAsesorPage from "./pages/Admin/InputData/input-asesor";
import InputPesertaPage from "./pages/Admin/InputData/input-peserta";
import PenilaianPageCompact from "./pages/Asesor/Penilaian/PenilaianPageCompact";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login - Halaman publik (tidak perlu login) */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Semua halaman lain HARUS login dulu */}
          <Route
            path="/dashboard/admin/kelola-data-pengguna"
            element={
              <ProtectedRoute>
                <AdminForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/input-asesor"
            element={
              <ProtectedRoute>
                <InputAsesorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/input-peserta"
            element={
              <ProtectedRoute>
                <InputPesertaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/data-peserta"
            element={
              <ProtectedRoute>
                <ListPagesDataPeserta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/data-asesor"
            element={
              <ProtectedRoute>
                <ListPagesDataAsesor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/siap-asesmen"
            element={
              <ProtectedRoute>
                <ListPagesDataPesertaSiapAssement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/belum-asesmen"
            element={
              <ProtectedRoute>
                <ListPagesDataPesertaBelomAsesmen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/hasil-asesmen"
            element={
              <ProtectedRoute>
                <ListPagesDataPesertaHasilAsesmen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/siswa"
            element={
              <ProtectedRoute>
                <GuruSiswa />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guru"
            element={
              <ProtectedRoute>
                <GuruDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/asesor/siap-asesmen"
            element={
              <ProtectedRoute>
                <ListAsesorPagesDataPesertaSiapAssement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/asesor/belum-asesmen"
            element={
              <ProtectedRoute>
                <ListAsesorPagesDataPesertaBelomAsesmen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/asesor/hasil-asesmen"
            element={
              <ProtectedRoute>
                <ListAsesorPagesDataPesertaHasilAsesmen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/asesor/penilaian/:id"
            element={
              <ProtectedRoute>
                <PenilaianPageCompact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/asesor/kelola-data-pengguna"
            element={
              <ProtectedRoute>
                <AsesmenForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/peserta"
            element={
              <ProtectedRoute>
                <PesertaPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found - Catch all routes yang tidak ada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
