import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import Kemenag from "../../assets/kemenag.png";
import { ErrorOutline, LogoutOutlined } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsesmenResultModal from "../../components/Peserta/AsesmenResultModal";
import PesertaInfoCard from "../../components/Peserta/PesertaInfoCard";
import AsesmenListCard from "../../components/Peserta/AsesmenListCard";
import apiClient from "../../services/api.config";
import { useUserProfile } from "../../hooks/useUserProfile";
import {
  DataPeserta,
  ApiParticipant,
  QuizSection,
  ApiAssessmentItem,
} from "./type";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import PesertaDetailModal from "../../components/Peserta/PesertaDetailModal";

// Data quiz default
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
    "Dlammah",
    "Kasrah",
    "Fathah",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    "Tasydid",
    "Dlammatain",
    "Kasratain",
    "Fathatain",
    "Sukun",
  ],
  sifat: [
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
  ahkam: [
    "Tanaffus",
    "Izhhar",
    "Idzgham Bighunnah",
    "Idzgham Bilaghunnah",
    "Ikhfa'",
    "Iqlab",
    "Izhhar Syafawi",
    "Ikhfa' Syafawi",
    "Idgham Mutamtsilain ",
    "Idzgham Mutajannisain",
    "Idgham Mutaqaribain",
    "Ghunnah Musyaddadah",
  ],
  mad: [
    "Mad Thabi'i",
    "Mad Wajib Muttashil",
    "Mad Jaiz Munfashil",
    "Mad Iwadz",
    "Mad Lin",
    "Mad Aridlissukun",
    "Mad Tamkin",
    "Mad Farq",
    "Mad LK Mutsaqqal",
    "Mad LK Mukhaffaf",
    "Mad LH Mutsaqqal",
    "Mad LH Mukhaffaf",
    "Mad Badal",
    "Mad Shilah Qashirah",
    "Mad Shilah Thawilah",
    "Ziyadatul Mad",
  ],
  gharib: [
    "Iysmam",
    "Imalah",
    "Tashil",
    "Ibdal",
    "Naql",
    "Badal",
    "Nun Washal",
  ],
  kelancaran: ["Tidak Lancar", "Kurang Lancar"],
  pengurangan: [
    "Tidak Bisa Membaca",
    "Suara Tidak Ada",
    "Video Rusak",
    "Terindikasi Dubbing",
    "Video Tidak Ada Gambar",
    "Ayat yg Dibaca Tidak Sesuai",
  ],
};

const PesertaPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading: loading, error } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<DataPeserta | null>(
    null
  );
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailPeserta, setDetailPeserta] = useState<DataPeserta | null>(null);

  const endpoint =
    user?.role === "admin"
      ? "/api/admin/profile"
      : user?.role === "assessor"
      ? "/api/assessors/profile"
      : "/api/participants/profile";

  // Query daftar peserta
  const {
    data: response,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery<{ data: ApiParticipant | ApiParticipant[] }>({
    queryKey: ["participants", endpoint],
    queryFn: async () => {
      if (!endpoint) return { data: [] };
      const res = await apiClient.get(endpoint);
      return res.data;
    },
    staleTime: 30000,
    enabled: !!user,
  });

  // Transform API ke DataPeserta
  const transformUser = (
    user: ApiParticipant & { akun_id?: string }
  ): DataPeserta => ({
    id: user.id,
    no_akun: user.no_akun || "-",
    nik: user.nik || "-",
    email: user.email || "-",
    no_handphone: user.no_handphone || "-",
    nama: user.nama || "-",
    jenis_kelamin: user.jenis_kelamin || "L",
    tempat_lahir: user.tempat_lahir || "-",
    tanggal_lahir: user.tanggal_lahir || "-",
    jabatan: user.jabatan || "-",
    jenjang: user.jenjang || "-",
    level: user.level || "-",
    provinsi: user.provinsi || "-",
    kecamatan: user.kecamatan || "-",
    kelurahan: user.kelurahan || "-",
    kota: user.kota || "-",
    alamat_sekolah: user.alamat_sekolah || "-",
    fakultas: user.fakultas || "-",
    tingkat_sekolah: user.tingkat_sekolah || "-",
    sertifikat_profesi: user.sertifikat_profesi || "-",
    status_pegawai: user.status_pegawai || "-",
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
          link_grup_wa: user.assessor.link_grup_wa,
          no_telepon: user.assessor.no_telepon,
        }
      : null,
    status: user.status || "-",
    link_grup_wa: user.link_grup_wa || "-",
    makhraj: user.scoring?.scores.makhraj || 0,
    sifat: user.scoring?.scores.sifat || 0,
    ahkam: user.scoring?.scores.ahkam || 0,
    mad: user.scoring?.scores.mad || 0,
    kelancaran: user.scoring?.scores.kelancaran || 0,
    gharib: user.scoring?.scores.gharib || 0,
    pengurangan: user.scoring?.scores.pengurangan || 0,
    total: user.scoring?.scores.overall || 0,
    akun: {
      id: user.akun_id || "",
      username: user.no_akun || "",
    },
    scoring: user.scoring || null,
  });

  const asesmenList: DataPeserta[] = response?.data
    ? Array.isArray(response.data)
      ? response.data.map(transformUser)
      : [transformUser(response.data)]
    : [];

  // Query detail asesmen peserta
  const { data: asesmenDetail, refetch: fetchDetail } = useQuery({
    queryKey: ["asesmen-detail", selectedAsesmen?.id],
    queryFn: async ({ queryKey }) => {
      const [, participantId] = queryKey;
      if (!participantId) return { data: [] };

      const res = await apiClient.get(
        `/api/assessments/participant/${participantId}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      return { data: res.data.data || [] };
    },
    enabled: false,
  });

  // Transform detail API ke sections
  const mapDetailToSections = (
    detail: { data: ApiAssessmentItem[] } | null | undefined
  ) => {
    const defaultSections = [
      { title: "Makharijul Huruf", list: dataQuiz.makharij },
      { title: "Shifatul Huruf", list: dataQuiz.sifat },
      { title: "Ahkam Al-Huruf", list: dataQuiz.ahkam },
      { title: "Ahkam Al-Mad wa Qashr", list: dataQuiz.mad },
      { title: "Gharib", list: dataQuiz.gharib },
      { title: "Kelancaran", list: dataQuiz.kelancaran },
      { title: "Pengurangan", list: dataQuiz.pengurangan },
    ];

    if (!detail?.data) return defaultSections;

    const grouped: Record<string, { simbol: string; nilai: number }[]> = {};

    detail.data.forEach((item: ApiAssessmentItem) => {
      if (!grouped[item.kategori]) grouped[item.kategori] = [];
      grouped[item.kategori].push({
        simbol: item.huruf,
        nilai: parseFloat(item.nilai),
      });
    });

    return defaultSections.map((sec) => {
      const key = sec.title.toLowerCase().includes("makharij")
        ? "makhraj"
        : sec.title.toLowerCase().includes("shifat")
        ? "sifat"
        : sec.title.toLowerCase().includes("ahkam al-huruf")
        ? "ahkam"
        : sec.title.toLowerCase().includes("mad")
        ? "mad"
        : sec.title.toLowerCase().includes("gharib")
        ? "gharib"
        : sec.title.toLowerCase().includes("kelancaran")
        ? "kelancaran"
        : sec.title.toLowerCase().includes("pengurangan")
        ? "pengurangan"
        : "";

      if (!key || !grouped[key]) return sec;

      const list = sec.list.map((item) => {
        const simbol = typeof item === "string" ? item : item.simbol;
        const found = grouped[key].find((i) => i.simbol === simbol);
        return { simbol, nilai: found?.nilai ?? 0 };
      });

      return { ...sec, list };
    });
  };
  const safeSections = mapDetailToSections(asesmenDetail) || [];

  const handleOpen = (item: DataPeserta) => {
    setSelectedAsesmen(item);
    setModalVisible(true);
    setTimeout(() => {
      fetchDetail();
    }, 0);
  };

  const handleLogout = () => {
    authService.logout();
    queryClient.clear();
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      {/* COMPACT HEADER */}
      <Paper
        elevation={0}
        sx={{
          background: "#2E7D32",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              py: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Left: Logos + Title */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1.5}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 1.5,
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0.75,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 1.5,
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0.75,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={Kemenag}
                    alt="Kemenag"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Stack>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    lineHeight: 1.2,
                  }}
                >
                  Portal Insan Al-Qur'an
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                  }}
                >
                  Direktorat GTK-Madrasah • Kementerian Agama
                </Typography>
              </Box>
            </Stack>

            {/* Right: Status + Logout */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Chip
                label="Peserta"
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 28,
                  display: { xs: "none", sm: "flex" },
                }}
              />
              <Button
                onClick={handleLogout}
                variant="contained"
                size="small"
                startIcon={<LogoutOutlined sx={{ fontSize: 18 }} />}
                sx={{
                  background: "rgba(239, 68, 68, 0.9)",
                  color: "white",
                  px: 2,
                  py: 0.75,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1.5,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": {
                    background: "rgba(220, 38, 38, 0.95)",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Logout
                </Box>
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>

      {/* CONTENT */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Loading */}
        {(loading || queryLoading) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              gap: 2,
            }}
          >
            <CircularProgress size={50} sx={{ color: "#16a34a" }} />
            <Typography variant="body1" color="text.secondary">
              Memuat data peserta...
            </Typography>
          </Box>
        )}

        {/* Error */}
        {error && !loading && (
          <Alert
            severity="error"
            icon={<ErrorOutline />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Gagal memuat profil pengguna
          </Alert>
        )}
        {queryError && !queryLoading && (
          <Alert
            severity="error"
            icon={<ErrorOutline />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Gagal memuat data peserta
          </Alert>
        )}

        {/* Content */}
        {!loading && !queryLoading && !error && !queryError && (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              {asesmenList.length > 0 ? (
                <PesertaInfoCard
                  peserta={asesmenList[0]}
                  onOpenDetail={(data) => {
                    setDetailPeserta(data);
                    setDetailVisible(true);
                  }}
                />
              ) : (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Data peserta tidak ditemukan
                  </Typography>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              <AsesmenListCard asesmen={asesmenList} onOpen={handleOpen} />
            </Grid>
          </Grid>
        )}
      </Container>

      <PesertaDetailModal
        open={detailVisible}
        onClose={() => setDetailVisible(false)}
        data={detailPeserta}
      />

      {/* Modal */}
      {selectedAsesmen && (
        <AsesmenResultModal
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          pesertaName={selectedAsesmen.nama || "Peserta"}
          asesorName={selectedAsesmen.asesor?.name || "Ustadz/ah"}
          waktuPelaksanaan={selectedAsesmen.jadwal || "26 Nov 2025"}
          nilaiAkhir={selectedAsesmen?.total || 0}
          sections={safeSections}
          categoryScores={{
            makhraj: selectedAsesmen.makhraj || 0,
            sifat: selectedAsesmen.sifat || 0,
            ahkam: selectedAsesmen.ahkam || 0,
            mad: selectedAsesmen.mad || 0,
            gharib: selectedAsesmen.gharib || 0,
            kelancaran: selectedAsesmen.kelancaran || 0,
            pengurangan: selectedAsesmen.pengurangan || 0,
          }}
        />
      )}
    </Box>
  );
};

export default PesertaPage;
