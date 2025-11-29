import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import AsesmenResultModal from "../../components/Peserta/AsesmenResultModal";
import PesertaInfoCard from "../../components/Peserta/PesertaInfoCard";
import AsesmenListCard from "../../components/Peserta/AsesmenListCard";
import apiClient, { handleApiError } from "../../services/api.config";
import useUserStore from "../../store/user.store";
import { DataPeserta, ApiParticipant, QuizSection } from "./type";

const dataQuiz: Record<string, QuizSection["list"]> = {
  makharij: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    { simbol: "ــُ", arti: "Dlammah" },
    { simbol: "ــِـ", arti: "Kasrah" },
    { simbol: "ــَـ", arti: "Fathah" },
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    { simbol: "ــّـ", arti: "Tasydid" },
    { simbol: "ــٌـ", arti: "Dlammatain" },
    { simbol: "ــٍـ", arti: "Kasratain" },
    { simbol: "ــًـ", arti: "Fathatain" },
    { simbol: "ــْـ", arti: "Sukun" },
  ],
  shifat: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
  ],
  ahkamHuruf: [
    "Izhhar",
    "Izhhar Syafawi",
    "Idzgham Bighunnah",
    "Ikhfa’ Syafawi",
    "Idzgham Bilaghunnah",
    "Idzgham Mimi",
    "Ikhfa’",
    "Idzgham Mutajannisain",
    "Iqlab",
    "Idzgham Mutaqarribain",
  ],
  ahkamMad: [
    "Mad Thabi’i",
    "Mad Lazim Kilmi Mutsaqqal",
    "Mad Wajib Muttashil",
    "Mad Lazim Kilmi Mukhaffaf",
    "Mad Jaiz Munfashil",
    "Mad Lazim Harfi Mutsaqqal",
    "Mad Iwadz",
    "Mad Lazim Harfi Mukhaffaf",
    "Mad Lin",
    "Mad Badal",
    "Mad Aridlissukun",
    "Mad Shilah Qashirah",
    "Mad Tamkin",
    "Mad Shilah Thawilah",
    "Mad Farq",
  ],
  gharib: [
    "Iysmam",
    "Imalah",
    "Saktah",
    "Tashil",
    "Naql",
    "Badal",
    "Mad dan Qashr",
  ],
};

const PesertaPage: React.FC = () => {
  const { user, loading, error, fetchUser } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<DataPeserta | null>(
    null
  );
  useEffect(() => {
    console.log("Fetching user profile...");
    fetchUser()
      .then(() => console.log("User fetched successfully"))
      .catch((err) => console.error("Error fetching user:", err));
  }, [fetchUser]);

  // Pilih endpoint berdasarkan role user
  const endpoint =
    user?.role === "admin"
      ? "/api/admin/profile"
      : user?.role === "assessor"
      ? "/api/assessors/profile"
      : "/api/participants/profile";
  console.log("Selected API endpoint based on role:", endpoint);
  const { data: response } = useQuery<{
    data: ApiParticipant | ApiParticipant[];
  }>({
    queryKey: ["participants", endpoint],
    queryFn: async () => {
      if (!endpoint) return { data: [] };
      const result = await apiClient.get(endpoint);
      return result.data;
    },
    staleTime: 30000,
    enabled: !!user,
  });

  // transform API data ke DataPeserta
  const transformUser = (user: ApiParticipant): DataPeserta => ({
    id: user.id,
    no_akun: user.no_akun || "-",
    nip: user.nip || "-",
    nama: user.nama || "-",
    jenis_kelamin: user.jenis_kelamin || "L",
    tempat_lahir: user.tempat_lahir || "-",
    jabatan: user.jabatan || "-",
    jenjang: user.jenjang || "-",
    level: user.level || "-",
    provinsi: user.provinsi || "-",
    kab_kota: user.kab_kota || "-",
    sekolah: user.sekolah || "-",
    pendidikan: user.pendidikan || "-",
    prodi: user.prodi || "-",
    perguruan_tinggi: user.perguruan_tinggi || "-",
    jenis_pt: user.jenis_pt || "-",
    tahun_lulus: user.tahun_lulus || "-",
    jadwal: user.jadwal || "-",
    asesor: user.assessor
      ? {
          id: user.assessor.id,
          name: user.assessor.name,
          email: user.assessor.email,
          link_wa: user.assessor.link_wa,
        }
      : null,
    status: user.status || "-",
    link_wa: user.link_wa || "-",
  });

  const asesmenList: DataPeserta[] = response?.data
    ? Array.isArray(response.data)
      ? response.data.map(transformUser)
      : [transformUser(response.data)]
    : [];

  console.log("Transformed asesmenList:", asesmenList);

  const handleOpen = (asesmen: DataPeserta) => {
    setSelectedAsesmen(asesmen);
    setModalVisible(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f0f4f8",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
          color: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Person sx={{ fontSize: { xs: 20, sm: 26, md: 32 } }} />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 1,
            letterSpacing: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          }}
        >
          Profil Peserta
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {asesmenList.length > 0 ? (
            <PesertaInfoCard peserta={asesmenList[0]} />
          ) : (
            <Typography>Loading data peserta...</Typography>
          )}
        </Grid>

        <Grid item xs={12} lg={4}>
          <AsesmenListCard asesmen={asesmenList} onOpen={handleOpen} />
        </Grid>
      </Grid>

      {selectedAsesmen && (
        <AsesmenResultModal
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          pesertaName={selectedAsesmen.nama || "Peserta"}
          asesorName={selectedAsesmen.asesor?.name || "Ustadz/ah"}
          waktuPelaksanaan={selectedAsesmen.jadwal || "26 Nov 2025"}
          nilaiAkhir={97.5}
          sections={[
            { title: "Makharijul Huruf", list: dataQuiz.makharij },
            { title: "Shifatul Huruf", list: dataQuiz.shifat },
            { title: "Ahkam Al-Huruf", list: dataQuiz.ahkamHuruf },
            { title: "Ahkam Al-Mad wa Qashr", list: dataQuiz.ahkamMad },
            { title: "Gharib", list: dataQuiz.gharib },
          ]}
        />
      )}
    </Box>
  );
};

export default PesertaPage;
