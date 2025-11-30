import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
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
import { CategoryType } from "../../../utils/utils";

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

const PenilaianPageCompact: React.FC = () => {
  const { id: participantId } = useParams<{ id: string }>();
  const { user } = useUserStore();
  const location = useLocation();
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
      makhraj: mk.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      sifat: shifat.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      ahkam: ahkamHuruf.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      mad: madList.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      gharib: gharibList.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      kelancaran: kelancaran.reduce(
        (a, b) => ({ ...a, [b]: 0 }),
        {} as MistakeMap
      ),
      pengurangan: PenguranganNilai.reduce(
        (a, b) => ({ ...a, [b]: 0 }),
        {} as MistakeMap
      ),
    };
  });

  const [kelancaranValue, setKelancaranValue] = useState<string | null>(null);
  const [penguranganValue, setPenguranganValue] = useState<string | null>(null);

  const handleScore = (
    category: CategoryType,
    key: string,
    type: ScoreAction
  ) => {
    setMistakes((prev) => {
      const current = prev[category][key] ?? 0;
      const newVal = type === "minus" ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [category]: { ...prev[category], [key]: newVal } };
    });
  };

  const getPenalty = (
    category: CategoryType,
    countBefore: number,
    item: string
  ) => {
    switch (category) {
      case "makhraj":
        return countBefore === 0 ? 2 : 0.5;
      case "sifat":
      case "ahkam":
        return countBefore === 0 ? 0.5 : 0.25;
      case "gharib":
        return countBefore === 0 ? 1 : 0.5;
      case "mad":
        if (item === "Mad Thabi’i" || item === "Mad Wajib Muttashil")
          return countBefore === 0 ? 2 : 0.5;
        return countBefore === 0 ? 1 : 0.5;
      default:
        return 0;
    }
  };

  const totalScore = (category: CategoryType): number => {
    let score = 100;
    let totalMistakesInCategory = 0;
    const fields = mistakes[category];

    Object.keys(fields).forEach((item) => {
      const count = fields[item];
      for (let i = 0; i < count; i++) {
        score -= getPenalty(category, totalMistakesInCategory, item);
        totalMistakesInCategory++;
      }
    });

    return Math.max(0, score);
  };

  const totalAverage = (): number => {
    if (penguranganValue === "Tidak Bisa Membaca") return 0;

    let avg =
      [
        totalScore("makhraj"),
        totalScore("sifat"),
        totalScore("ahkam"),
        totalScore("mad"),
        totalScore("gharib"),
      ].reduce((a, b) => a + b, 0) / 5;

    if (penguranganValue === "Kelebihan Waktu") avg = Math.max(0, avg - 25);
    return Number(avg.toFixed(2));
  };

  const handleSubmit = async () => {
    if (!pesertaFromTable || !user) return;

    const assessmentsHuruf = Object.entries(mistakes).flatMap(
      ([kategori, obj]) =>
        Object.entries(obj).map(([huruf, count]) => ({
          peserta_id: pesertaFromTable.id,
          asesor_id: user.id,
          huruf,
          kategori,
          nilai: count > 0 ? 1 : 0,
        }))
    );

    console.log("Assessments yang akan dikirim:", assessmentsHuruf);

    try {
      const res = await apiClient.post("/api/assessments/bulk", {
        assessments: assessmentsHuruf,
      });
      console.log("Response dari server:", res.data);
      alert("Penilaian berhasil dikirim!");
    } catch (err) {
      console.error("Error submit penilaian:", err);
      alert("Gagal mengirim penilaian");
    }
  };

  if (isLoading) return <Typography>Loading peserta...</Typography>;
  if (error) return <Typography>Peserta tidak ditemukan!</Typography>;
  if (!pesertaFromTable)
    return <Typography>Peserta tidak ditemukan</Typography>;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "grey.50", py: 2 }}>
      <Container maxWidth="lg">
        <HeaderPeserta
          peserta={{
            ...pesertaFromTable,
            akun: pesertaFromTable.no_akun,
          }}
          totalAverage={totalAverage().toLocaleString()}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ScoreSection
              title="Makharijul Huruf"
              category="makhraj"
              list={makhraj.map((h) => (typeof h === "string" ? h : h.simbol))}
              mistakes={mistakes}
              handleScore={handleScore}
              totalScore={totalScore}
            />
            <ScoreSection
              title="Ahkamul Huruf"
              category="ahkam"
              list={ahkamHuruf}
              mistakes={mistakes}
              handleScore={handleScore}
              totalScore={totalScore}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ScoreSection
              title="Sifatul Huruf"
              category="sifat"
              list={shifat}
              mistakes={mistakes}
              handleScore={handleScore}
              totalScore={totalScore}
            />
            <ScoreSection
              title="Ahkamul Mad"
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
            <ScoreSection
              title="Kelancaran Saat Membaca"
              category="kelancaran"
              list={kelancaran}
              isSelect
              selectedValue={kelancaranValue}
              onSelect={setKelancaranValue}
            />
            <ScoreSection
              title="Pengurangan Nilai Peserta"
              category="pengurangan"
              list={PenguranganNilai}
              isSelect
              selectedValue={penguranganValue}
              onSelect={setPenguranganValue}
            />
          </Grid>
        </Grid>

        <Paper
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "grey.100",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography fontWeight={700}>Petunjuk:</Typography>
          <Typography>
            Klik tombol – untuk tambah kesalahan, tombol + untuk mengurangi
            kesalahan.
          </Typography>
        </Paper>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            sx={{ px: 4, py: 1.2, fontWeight: 700 }}
          >
            Submit Penilaian
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PenilaianPageCompact;
