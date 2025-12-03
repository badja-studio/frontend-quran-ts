import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Person, ErrorOutline } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import AsesmenResultModal from "../../components/Peserta/AsesmenResultModal";
import PesertaInfoCard from "../../components/Peserta/PesertaInfoCard";
import AsesmenListCard from "../../components/Peserta/AsesmenListCard";
import apiClient from "../../services/api.config";
import useUserStore from "../../store/user.store";
import {
  DataPeserta,
  ApiParticipant,
  QuizSection,
  ApiAssessmentItem,
} from "./type";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

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
    "ــُ",
    "ــِـ",
    "ــَـ",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    "ــّـ",
    "ــٌـ",
    "ــٍـ",
    "ــًـ",
    "ــْـ",
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
    "Ikhfa’",
    "Iqlab",
    "Izhhar Syafawi",
    "Ikhfa’ Syafawi",
    "Idgham Mutamtsilain ",
    "Idzgham Mutajannisain",
    "Idgham Mutaqaribain",
    "Ghunnah Musyaddadah",
  ],
  mad: [
    "Mad Thabi’i",
    "Mad Wajib Muttashil",
    "Mad Jaiz Munfashil",
    "Mad Iwadz",
    "Mad Lin",
    "Mad Aridlissukun",
    "Mad Tamkin",
    "Mad Farq",
    "Mad Lazim Kilmi Mutsaqqal",
    "Mad Lazim Kilmi Mukhaffaf",
    "Mad Lazim Harfi Mutsaqqal",
    "Mad Lazim Harfi Mukhaffaf",
    "Mad Badal",
    "Mad Shilah Qashirah",
    "Mad Shilah Thawilah",
    "Qashr",
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
  pengurangan: ["Tidak Bisa Baca"],
};

const PesertaPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, error, fetchUser } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<DataPeserta | null>(
    null
  );

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
    queryKey: ["asesmen-detail"],
    queryFn: async () => {
      if (!selectedAsesmen?.id) return null;

      const res = await apiClient.get(
        `/api/assessments/participant/${selectedAsesmen.id}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "If-None-Match": "",
          },
        }
      );

      // API langsung return semua item → tidak perlu loop
      const allData: ApiAssessmentItem[] = res.data.data || [];

      return { data: allData };
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
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
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOpen = (item: DataPeserta) => {
    console.log(selectedAsesmen?.id);
    if (selectedAsesmen?.id === item.id && modalVisible) return;
    setSelectedAsesmen(item);
    setModalVisible(true);
    fetchDetail();
  };
  // const handleEditSave = async (updated: DataPeserta) => {
  //   await apiClient.put(`/api/participants/${updated.id}`, updated);
  //   alert("Data berhasil diperbarui!");
  // };

  const handleLogout = () => {
    // Clear all data from localStorage
    authService.logout();
    navigate("/");
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
          position: "relative",
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

        {/* Tombol Logout */}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      </Box>

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
          <CircularProgress size={60} sx={{ color: "#2E7D32" }} />
          <Typography variant="h6" color="text.secondary">
            Memuat data peserta...
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && !loading && (
        <Alert
          severity="error"
          icon={<ErrorOutline />}
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          Gagal memuat profil pengguna
        </Alert>
      )}
      {queryError && !queryLoading && (
        <Alert
          severity="error"
          icon={<ErrorOutline />}
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          Gagal memuat data peserta
        </Alert>
      )}

      {/* Content */}
      {!loading && !queryLoading && !error && !queryError && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            {asesmenList.length > 0 ? (
              <PesertaInfoCard
                peserta={asesmenList[0]}
              // onEdit={handleEditSave}
              />
            ) : (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Data peserta tidak ditemukan
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            <AsesmenListCard asesmen={asesmenList} onOpen={handleOpen} />
          </Grid>
        </Grid>
      )}

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
