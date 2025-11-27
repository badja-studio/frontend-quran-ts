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
import ListAsesorPagesDataPesertaSiapAssement from "./pages/Asesor/DataPesertaSiapAssesmen/list";
import ListAsesorPagesDataPesertaBelomAsesmen from "./pages/Asesor/DataBelumAsesmen/list";
import ListAsesorPagesDataPesertaHasilAsesmen from "./pages/Asesor/DataHasilAsesmen/list";
import ListAsesorPagesDataPesertaSedangAssement from "./pages/Asesor/DataPesertaSedangAssesmen/list";
import ListPagesDataAsesor from "./pages/Admin/DataAsesor/list";
import AsesmenForm from "./pages/Asesor/KelolaDataPengguna/FormPengguna";
import AdminForm from "./pages/Admin/KelolaDataPengguna/FormPengguna";
import InputAsesorPage from "./pages/Admin/InputData/input-asesor";
import InputPesertaPage from "./pages/Admin/InputData/input-peserta";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* ADMIN */}
          <Route
            path="/dashboard/admin/kelola-data-pengguna"
            element={<AdminForm />}
          />
          <Route
            path="/dashboard/admin/input-asesor"
            element={<InputAsesorPage />}
          />
          <Route
            path="/dashboard/admin/input-peserta"
            element={<InputPesertaPage />}
          />
          <Route
            path="/dashboard/data-peserta"
            element={<ListPagesDataPeserta />}
          />
          <Route
            path="/dashboard/data-asesor"
            element={<ListPagesDataAsesor />}
          />
          <Route
            path="/dashboard/siap-asesmen"
            element={<ListPagesDataPesertaSiapAssement />}
          />
          <Route
            path="/dashboard/belum-asesmen"
            element={<ListPagesDataPesertaBelomAsesmen />}
          />
          <Route
            path="/dashboard/hasil-asesmen"
            element={<ListPagesDataPesertaHasilAsesmen />}
          />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* ASESOR atau GURU */}
          <Route path="/dashboard/siswa" element={<GuruSiswa />} />
          <Route path="dashboard/guru" element={<GuruDashboard />} />
          <Route
            path="/dashboard/asesor/siap-asesmen"
            element={<ListAsesorPagesDataPesertaSiapAssement />}
          />
          <Route
            path="/dashboard/asesor/belum-asesmen"
            element={<ListAsesorPagesDataPesertaBelomAsesmen />}
          />
          <Route
            path="/dashboard/asesor/hasil-asesmen"
            element={<ListAsesorPagesDataPesertaHasilAsesmen />}
          />
          <Route
            path="/dashboard/asesor/sedang-asesmen"
            element={<ListAsesorPagesDataPesertaSedangAssement />}
          />
          <Route
            path="/dashboard/asesor/penilaian"
            element={<PenilaianPage />}
          />
          <Route
            path="/dashboard/asesor/kelola-data-pengguna"
            element={<AsesmenForm />}
          />

          {/* USER */}
          <Route path="/peserta" element={<PesertaPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
