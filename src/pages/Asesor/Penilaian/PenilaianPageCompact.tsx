import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  makhraj,
  shifat,
  ahkamHuruf,
  madList,
  gharibList,
  kelancaran,
  pengurangan,
} from "./dummy";
import ScoreSection from "./ScoreSection";
import HeaderPeserta from "./HeaderPeserta";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../../../services/api.config";
import { CategoryType } from "./type";
import { useUserProfile } from "../../../hooks/useUserProfile";
import ConfirmDialog from "../../../components/Peserta/ModalConfirm";
import VideoView from "./VideoView";

type ScoreAction = "plus" | "minus";
type MistakeMap = Record<string, number>;
type MistakesState = Record<CategoryType, MistakeMap>;

interface PesertaFromTable {
  id: string;
  no_akun: string;
  nip: string;
  nama: string;
  level: string;
  jenjang: string;
  status: string;
  sekolah: string;
}

interface LocationState {
  peserta?: PesertaFromTable;
}

interface PesertaFromApi {
  id: string;
  akun: string;
  nama: string;
  level: string;
  jenjang: string;
  status: string;
  sekolah: string;
}

interface AssessmentHuruf {
  peserta_id: string;
  asesor_id: string;
  huruf: string | null;
  kategori: string;
  nilai: number;
}

interface AssessmentTotals {
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  kelancaran: number;
  pengurangan: number;
}

interface SubmitAssessmentData {
  assessments: AssessmentHuruf[];
  totals: AssessmentTotals;
  avg: number;
}

const categoryWeights: Record<CategoryType, number> = {
  makhraj: 55.5,
  sifat: 14.5,
  ahkam: 8,
  mad: 13.5,
  gharib: 6,
  kelancaran: 2.5,
  pengurangan: 0,
};

const PenilaianPageCompact: React.FC = () => {
  const { id: participantId } = useParams<{ id: string }>();
  const { data: user } = useUserProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const pesertaFromTable = (location.state as LocationState)?.peserta;

  const { isLoading, error } = useQuery<PesertaFromApi>({
    queryKey: ["peserta", participantId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/assessments/participant/${participantId}`
      );
      return res.data.data;
    },
    enabled: !!participantId,
  });

  const [mistakes, setMistakes] = useState<MistakesState>(() => {
    return {
      makhraj: makhraj.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      sifat: shifat.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      ahkam: ahkamHuruf.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      mad: madList.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      gharib: gharibList.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      kelancaran: kelancaran.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      pengurangan: pengurangan.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
    };
  });
  const [kelancaranPenalty, setKelancaranPenalty] = useState<number>(0);
  const [penguranganPenaltyValue, setPenguranganPenaltyValue] =
    useState<number>(0);
  const [kelancaranValue, setKelancaranValue] = useState<string | null>(null);
  const [penguranganValue, setPenguranganValue] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleScore = (
    category: CategoryType,
    key: string,
    type: ScoreAction
  ) => {
    setMistakes((prev) => {
      const current = prev[category][key] ?? 0;
      const newVal = type === "minus" ? current + 1 : Math.max(0, current - 1);

      return {
        ...prev,
        [category]: { ...prev[category], [key]: newVal },
      };
    });
  };

  const getPenalty = (
    category: CategoryType,
    index: number,
    item: string
  ): number => {
    if (category === "ahkam") {
      switch (item) {
        case "Tanaffus":
          return index === 0 ? 1 : 0.5;
        case "Izhhar":
          return index === 0 ? 1 : 0.5;
        case "Ghunnah Musyaddadah":
          return index === 0 ? 1 : 0.5;
        case "Idzgham Bighunnah":
        case "Idzgham Bilaghunnah":
        case "Ikhfa’":
        case "Iqlab":
        case "Izhhar Syafawi":
        case "Ikhfa’ Syafawi":
        case "Idgham Mutamtsilain":
        case "Idzgham Mutajannisain":
        case "Idgham Mutaqaribain":
          return index === 0 ? 0.5 : 0.25;
        default:
          return 0;
      }
    }

    if (category === "mad") {
      switch (item) {
        case "Mad Thabi’i":
          return index === 0 ? 2 : 0.5;
        case "Mad Wajib Muttashil":
          return index === 0 ? 1 : 0.5;
        case "Mad Jaiz Munfashil":
        case "Mad Iwadz":
        case "Mad Lin":
        case "Mad Aridlissukun":
        case "Mad Tamkin":
        case "Mad Farq":
        case "Mad Badal":
        case "Mad Shilah Qashirah":
        case "Mad Shilah Thawilah":
          return index === 0 ? 0.5 : 0.25;
        case "Mad LK Mutsaqqal":
        case "Mad LK Mukhaffaf":
        case "Mad LH Mutsaqqal":
        case "Mad LH Mukhaffaf":
          return index === 0 ? 1 : 0.5;
        case "Qashr":
          return index === 0 ? 2 : 0.5;
        default:
          return 0;
      }
    }

    switch (category) {
      case "makhraj":
        return index === 0 ? 1.5 : 0.5;
      case "sifat":
        return index === 0 ? 0.5 : 0.25;
      case "gharib":
        return index === 0 ? 1 : 0.5;
      default:
        return 0;
    }
  };

  const getKelancaranPenalty = () => {
    if (kelancaranValue === "Tidak Lancar") return 2.5;
    if (kelancaranValue === "Kurang Lancar") return 2;
    return 0;
  };

  const totalScore = (category: CategoryType): number => {
    if (penguranganValue === "Tidak Bisa Membaca") {
      return 0;
    }

    const maxScore = categoryWeights[category] || 0;
    const fields = mistakes[category] || {};
    let deduction = 0;
    Object.keys(fields).forEach((item) => {
      const count = fields[item];
      for (let i = 0; i < count; i++) {
        deduction += getPenalty(category, i, item);
      }
    });
    return Math.max(0, Math.min(maxScore, maxScore - deduction));
  };

  const totalOverall = (): number => {
    if (penguranganValue === "Tidak Bisa Membaca") return 10;

    let total =
      totalScore("makhraj") +
      totalScore("sifat") +
      totalScore("ahkam") +
      totalScore("mad") +
      totalScore("gharib");

    const kelScore = kelancaranValue
      ? categoryWeights.kelancaran - getKelancaranPenalty()
      : categoryWeights.kelancaran;
    total += kelScore;

    return Math.min(100, Number(total.toFixed(2)));
  };

  const submitAssessmentMutation = useMutation({
    mutationFn: async (data: SubmitAssessmentData) => {
      const response = await apiClient.post("/api/assessments/bulk", data);
      return response.data;
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Penilaian berhasil dikirim!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard/asesor/siap-asesmen");
      }, 1500);
    },
    onError: (err) => {
      console.error("Error saat submit:", err);
      setSnackbar({
        open: true,
        message: "Gagal mengirim penilaian! Silakan coba lagi.",
        severity: "error",
      });
    },
  });

  const handleSubmit = () => {
    if (!pesertaFromTable || !user) return;

    const assessmentsHuruf = [
      ...Object.entries(mistakes).flatMap(([kategori, obj]) =>
        Object.entries(obj)
          .filter(([, count]) => count > 0)
          .map(([huruf, count]) => ({
            peserta_id: pesertaFromTable.id,
            asesor_id: user.id,
            huruf,
            kategori,
            nilai: count,
          }))
      ),
      ...(kelancaranPenalty > 0
        ? [
            {
              peserta_id: pesertaFromTable.id,
              asesor_id: user.id,
              huruf: kelancaranValue,
              kategori: "kelancaran",
              nilai: kelancaranPenalty,
            },
          ]
        : []),
      ...(penguranganPenaltyValue > 0
        ? [
            {
              peserta_id: pesertaFromTable.id,
              asesor_id: user.id,
              huruf: penguranganValue,
              kategori: "pengurangan",
              nilai: penguranganPenaltyValue,
            },
          ]
        : []),
    ];

    const totals = {
      makhraj: totalScore("makhraj"),
      sifat: totalScore("sifat"),
      ahkam: totalScore("ahkam"),
      mad: totalScore("mad"),
      gharib: totalScore("gharib"),
      kelancaran: categoryWeights.kelancaran - kelancaranPenalty,
      pengurangan: penguranganPenaltyValue,
    };

    const avg = totalOverall();

    submitAssessmentMutation.mutate({
      assessments: assessmentsHuruf,
      totals,
      avg,
    });
  };

  if (isLoading) return <Typography>Loading peserta...</Typography>;
  if (error) return <Typography>Peserta tidak ditemukan!</Typography>;
  if (!pesertaFromTable)
    return <Typography>Peserta tidak ditemukan</Typography>;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "grey.50", py: 2 }}>
      <Box sx={{ width: "100%", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <IconButton
            onClick={() => navigate("/dashboard/asesor/siap-asesmen")}
            sx={{
              bgcolor: "white",
              "&:hover": { bgcolor: "grey.100" },
              boxShadow: 1,
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Penilaian Peserta
          </Typography>
        </Box>

        <HeaderPeserta
          peserta={{ ...pesertaFromTable, akun: pesertaFromTable.no_akun }}
          totalAverage={totalOverall().toLocaleString()}
        />
        <Grid>
          <VideoView />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ScoreSection
                title="Makharij Al-Huruf"
                category="makhraj"
                list={makhraj}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Ahkam Al-Huruf"
                category="ahkam"
                list={ahkamHuruf}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Kelancaran Saat Membaca"
                category="kelancaran"
                list={kelancaran}
                isSelect
                selectedValue={kelancaranValue}
                onSelect={(value) => {
                  setKelancaranValue(value === kelancaranValue ? null : value);

                  const penalty =
                    value === "Tidak Lancar"
                      ? 3
                      : value === "Kurang Lancar"
                      ? 2
                      : 0;

                  setKelancaranPenalty(value === kelancaranValue ? 0 : penalty);
                }}
              />
              <ScoreSection
                title="Pengurangan Nilai Peserta"
                category="pengurangan"
                list={pengurangan}
                isSelect
                selectedValue={penguranganValue}
                onSelect={(value) => {
                  if (locked && value !== "Tidak Bisa Membaca") return;
                  if (value === "Tidak Bisa Membaca") {
                    if (penguranganValue === "Tidak Bisa Membaca") {
                      setPenguranganValue(null);
                      setPenguranganPenaltyValue(0);
                      setLocked(false);
                    } else {
                      setPenguranganValue("Tidak Bisa Membaca");
                      setPenguranganPenaltyValue(90);
                      setLocked(true);
                    }
                    return;
                  }
                  const selected = value === penguranganValue ? null : value;
                  setPenguranganValue(selected);

                  const numericPenalty = selected ? Number(selected) : 0;
                  setPenguranganPenaltyValue(numericPenalty);
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ScoreSection
                title="Sifatul Al-Huruf"
                category="sifat"
                list={shifat}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Ahkam Al-Mad wal Qashr"
                category="mad"
                list={madList}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Gharib"
                category="gharib"
                list={gharibList}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
            </Box>
          </Grid>
        </Grid>

        <Paper
          sx={{
            mt: 3,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "grey.100",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography fontWeight={700}>Petunjuk:</Typography>
          <Typography>
            Klik tombol – untuk menambah kesalahan, + untuk mengurangi. Pilih
            "Tidak Bisa Membaca" untuk langsung mengurangi 90 poin. Klik lagi
            untuk membatalkan.
          </Typography>
        </Paper>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenConfirm(true)}
            disabled={submitAssessmentMutation.isPending}
            sx={{ px: 4, py: 1.2, fontWeight: 700 }}
          >
            {submitAssessmentMutation.isPending
              ? "Mengirim..."
              : "Submit Penilaian"}
          </Button>
        </Box>
      </Box>
      <ConfirmDialog
        open={openConfirm}
        title="Konfirmasi Penilaian"
        message="Apakah kamu yakin ingin mengirim penilaian untuk peserta ini? Penilaian yang dikirim tidak bisa diubah lagi."
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          handleSubmit();
        }}
        confirmText="Ya, Kirim"
        cancelText="Batal"
        colorConfirm="error"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PenilaianPageCompact;
