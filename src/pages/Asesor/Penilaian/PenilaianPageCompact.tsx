import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  makhraj,
  shifat,
  ahkamHuruf,
  madList,
  gharibList,
  kelancaran,
  PenguranganNilai,
} from "./dummy";
import ScoreSection from "./ScoreSection";
import HeaderPeserta from "./HeaderPeserta";
import useUserStore from "../../../store/user.store";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api.config";
import { CategoryType, CATEGORY } from "../../../utils/utils";

// ===================== TYPES =====================
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

// ===================== CATEGORY WEIGHTS =====================
const categoryWeights: Record<CategoryType, number> = {
  [CATEGORY.MAKHRAJ]: 55.5,
  [CATEGORY.SIFAT]: 14.5,
  [CATEGORY.AHKAM]: 8,
  [CATEGORY.MAD]: 13.5,
  [CATEGORY.GHARIB]: 6,
  [CATEGORY.KELANCARAN]: 2.5,
  [CATEGORY.PENGURANGAN]: 0, // ✅ sekarang valid
};

// ===================== COMPONENT =====================
const PenilaianPageCompact: React.FC = () => {
  const { id: participantId } = useParams<{ id: string }>();
  const { user } = useUserStore();
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
    const mk = makhraj.map((h) => (typeof h === "string" ? h : h.simbol));
    return {
      [CATEGORY.MAKHRAJ]: mk.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      [CATEGORY.SIFAT]: shifat.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      [CATEGORY.AHKAM]: ahkamHuruf.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      [CATEGORY.MAD]: madList.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      [CATEGORY.GHARIB]: gharibList.reduce((a, b) => ({ ...a, [b]: 0 }), {}),
      [CATEGORY.KELANCARAN]: kelancaran.reduce(
        (a, b) => ({ ...a, [b]: 0 }),
        {}
      ),
      [CATEGORY.PENGURANGAN]: PenguranganNilai.reduce(
        (a, b) => ({ ...a, [b]: 0 }),
        {}
      ),
    };
  });

  const [kelancaranValue, setKelancaranValue] = useState<string | null>(null);
  const [penguranganValue, setPenguranganValue] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  // ===================== HANDLER =====================
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

  const getPenalty = (category: CategoryType, index: number, item: string) => {
    if (category === CATEGORY.AHKAM) {
      switch (item) {
        case "Tanaffus":
          return index === 0 ? 2 : 0.5;
        case "Izhhar":
          return index === 0 ? 1 : 0.5;
        case "Idzgham Bighunnah":
        case "Idzgham Bilaghunnah":
        case "Ikhfa’":
        case "Iqlab":
        case "Izhhar Syafawi":
        case "Ikhfa’ Syafawi":
        case "Idgham Mutamtsilain":
        case "Idzgham Mutajannisain":
        case "Idzgham Mutaqaribain":
        case "Ghunnah Musyaddadah":
          return index === 0 ? 0.5 : 0.25;
        default:
          return 0;
      }
    }

    if (category === CATEGORY.MAD) {
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
        case "Mad Lazim Kilmi Mutsaqqal":
        case "Mad Lazim Kilmi Mukhaffaf":
        case "Mad Lazim Harfi Mutsaqqal":
        case "Mad Lazim Harfi Mukhaffaf":
          return index === 0 ? 1 : 0.5;
        case "Qashr":
          return index === 0 ? 2 : 0.5;
        default:
          return 0;
      }
    }

    switch (category) {
      case CATEGORY.MAKHRAJ:
        return index === 0 ? 2 : 0.5;
      case CATEGORY.SIFAT:
      case CATEGORY.GHARIB:
        return index === 0 ? 0.5 : 0.25;
      default:
        return 0;
    }
  };

  const getKelancaranPenalty = () => {
    if (kelancaranValue === "Tidak Lancar") return 3;
    if (kelancaranValue === "Kurang Lancar") return 2;
    return 0;
  };

  // ===================== SCORE CALCULATIONS =====================
  const totalScore = (category: CategoryType): number => {
    if (penguranganValue === "Tidak Bisa Membaca") return 0;

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
      totalScore(CATEGORY.MAKHRAJ) +
      totalScore(CATEGORY.SIFAT) +
      totalScore(CATEGORY.AHKAM) +
      totalScore(CATEGORY.MAD) +
      totalScore(CATEGORY.GHARIB);

    const kelScore = kelancaranValue
      ? categoryWeights[CATEGORY.KELANCARAN] - getKelancaranPenalty()
      : categoryWeights[CATEGORY.KELANCARAN];

    total += kelScore;

    return Math.min(100, Number(total.toFixed(2)));
  };

  // ===================== SUBMIT =====================
  const handleSubmit = async () => {
    if (!pesertaFromTable || !user) return;

    const assessmentsHuruf = Object.entries(mistakes).flatMap(
      ([kategori, obj]) =>
        Object.entries(obj).map(([huruf, count]) => ({
          peserta_id: pesertaFromTable.id,
          asesor_id: user.id,
          huruf,
          kategori,
          nilai: count,
        }))
    );

    const totals: Record<CategoryType, number> = {
      [CATEGORY.MAKHRAJ]: totalScore(CATEGORY.MAKHRAJ),
      [CATEGORY.SIFAT]: totalScore(CATEGORY.SIFAT),
      [CATEGORY.AHKAM]: totalScore(CATEGORY.AHKAM),
      [CATEGORY.MAD]: totalScore(CATEGORY.MAD),
      [CATEGORY.GHARIB]: totalScore(CATEGORY.GHARIB),
      [CATEGORY.KELANCARAN]: kelancaranValue
        ? categoryWeights[CATEGORY.KELANCARAN] - getKelancaranPenalty()
        : categoryWeights[CATEGORY.KELANCARAN],
      [CATEGORY.PENGURANGAN]: 0,
    };

    const avg = totalOverall();

    try {
      const response = await apiClient.post("/api/assessments/bulk", {
        assessments: assessmentsHuruf,
        totals,
        avg,
      });

      console.log("Response API:", response.data);
      console.log("Nilai per huruf:", assessmentsHuruf);
      console.log("Total nilai per kategori:", totals);
      console.log("Total keseluruhan:", avg);

      alert("Penilaian berhasil dikirim!");
      navigate("/dashboard/asesor/hasil-asesmen");
    } catch (err) {
      console.error("Error saat submit:", err);
      alert("Gagal mengirim penilaian!");
    }
  };

  if (isLoading) return <Typography>Loading peserta...</Typography>;
  if (error) return <Typography>Peserta tidak ditemukan!</Typography>;
  if (!pesertaFromTable)
    return <Typography>Peserta tidak ditemukan</Typography>;

  // ===================== RENDER =====================
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "grey.50", py: 2 }}>
      <Box sx={{ width: "100%", px: 2 }}>
        <HeaderPeserta
          peserta={{ ...pesertaFromTable, akun: pesertaFromTable.no_akun }}
          totalAverage={totalOverall().toLocaleString()}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ScoreSection
                title="Makharij Al-Huruf"
                category={CATEGORY.MAKHRAJ}
                list={makhraj.map((h) =>
                  typeof h === "string" ? h : h.simbol
                )}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Ahkam Al-Huruf"
                category={CATEGORY.AHKAM}
                list={ahkamHuruf}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Kelancaran Saat Membaca"
                category={CATEGORY.KELANCARAN}
                list={kelancaran}
                isSelect
                selectedValue={kelancaranValue}
                onSelect={(value) =>
                  locked
                    ? null
                    : setKelancaranValue(
                        kelancaranValue === value ? null : value
                      )
                }
              />
              <ScoreSection
                title="Pengurangan Nilai Peserta"
                category={CATEGORY.PENGURANGAN}
                list={PenguranganNilai}
                isSelect
                selectedValue={penguranganValue}
                onSelect={(value) => {
                  if (value === "Tidak Bisa Membaca") {
                    if (penguranganValue === "Tidak Bisa Membaca") {
                      setPenguranganValue(null);
                      setLocked(false);
                    } else {
                      setPenguranganValue("Tidak Bisa Membaca");
                      setLocked(true);
                    }
                  } else {
                    setPenguranganValue(
                      penguranganValue === value ? null : value
                    );
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ScoreSection
                title="Sifatul Al-Huruf"
                category={CATEGORY.SIFAT}
                list={shifat}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Ahkam Al-Mad wal Qashr"
                category={CATEGORY.MAD}
                list={madList}
                mistakes={mistakes}
                handleScore={handleScore}
                totalScore={totalScore}
              />
              <ScoreSection
                title="Gharib"
                category={CATEGORY.GHARIB}
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
            onClick={handleSubmit}
            sx={{ px: 4, py: 1.2, fontWeight: 700 }}
          >
            Submit Penilaian
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PenilaianPageCompact;
