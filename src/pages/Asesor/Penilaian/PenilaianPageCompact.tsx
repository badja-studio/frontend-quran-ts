import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { makhraj, shifat, ahkamHuruf, madList, gharibList } from "./types";
import ScoreSection from "./ScoreSection";
import HeaderPeserta from "./HeaderPeserta";
import useUserStore from "../../../store/user.store";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api.config";

type Category = "makhraj" | "sifat" | "ahkam" | "mad" | "gharib";
type ScoreAction = "plus" | "minus";
type MistakeMap = Record<string, number>;
type MistakesState = {
  makhraj: MistakeMap;
  sifat: MistakeMap;
  ahkam: MistakeMap;
  mad: MistakeMap;
  gharib: MistakeMap;
};

interface Peserta {
  id: number;
  akun: string;
  nama: string;
  level: string;
  jenjang: string;
  status: string;
  sekolah: string;
}

const PenilaianPageCompact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pesertaId = Number(id);
  const { user } = useUserStore();

  const {
    data: peserta,
    isLoading,
    error,
  } = useQuery<Peserta>({
    queryKey: ["peserta", pesertaId],
    queryFn: async () => {
      const res = await apiClient.get(`/peserta/${pesertaId}`);
      return res.data.data;
    },
    enabled: !!pesertaId,
  });

  const [mistakes, setMistakes] = useState<MistakesState>(() => {
    const mk = makhraj.map((h) => (typeof h === "string" ? h : h.simbol));
    return {
      makhraj: mk.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      sifat: shifat.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      ahkam: ahkamHuruf.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      mad: madList.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
      gharib: gharibList.reduce((a, b) => ({ ...a, [b]: 0 }), {} as MistakeMap),
    };
  });

  const handleScore = (
    category: string,
    key: string,
    type: ScoreAction | string
  ) => {
    const cat = category as Category;
    const action: ScoreAction = type === "minus" ? "minus" : "plus";

    setMistakes((prev) => {
      const current = prev[cat][key] ?? 0;
      const newVal =
        action === "minus" ? current + 1 : Math.max(0, current - 1);

      return {
        ...prev,
        [cat]: {
          ...prev[cat],
          [key]: newVal,
        },
      };
    });
  };

  const getPenalty = (
    category: Category,
    countBefore: number,
    item: string
  ) => {
    switch (category) {
      case "makhraj":
        return countBefore === 0 ? 2 : 0.5;

      case "sifat":
        return countBefore === 0 ? 0.5 : 0.25;

      case "ahkam":
        return countBefore === 0 ? 0.5 : 0.25;

      case "gharib":
        return countBefore === 0 ? 1 : 0.5;

      case "mad":
        if (item === "Mad Thabi’i" || item === "Mad Wajib Muttashil") {
          return countBefore === 0 ? 2 : 0.5;
        }

        return countBefore === 0 ? 1 : 0.5;

      default:
        return 0;
    }
  };

  const totalScore = (category: string): number => {
    const cat = category as Category;
    let score = 100;
    const fields = mistakes[cat];

    let totalMistakesInCategory = 0;

    Object.keys(fields).forEach((item) => {
      const count = fields[item];
      if (!count) return;

      for (let i = 0; i < count; i++) {
        const penalty = getPenalty(cat, totalMistakesInCategory, item);
        score -= penalty;
        totalMistakesInCategory++;
      }
    });

    return Math.max(0, score);
  };

  //   const totalScore = (category: string): number => {
  //     const cat = category as Category;
  //     let score = 100;

  //     Object.entries(mistakes[cat]).forEach(([item, count]) => {
  //       for (let i = 0; i < count; i++) {
  //         const penalty = getPenalty(cat, i, item);
  //         score -= penalty;
  //       }
  //     });

  //     return Math.max(0, score);
  //   };

  const totalAverage = (): string => {
    const list = [
      totalScore("makhraj"),
      totalScore("sifat"),
      totalScore("ahkam"),
      totalScore("mad"),
      totalScore("gharib"),
    ];
    return (list.reduce((a, b) => a + b, 0) / 5).toFixed(2);
  };

  const handleSubmit = async () => {
    if (!peserta || !user) return;

    const assessments = Object.entries(mistakes).flatMap(([kategori, obj]) =>
      Object.entries(obj).map(([huruf, _]) => ({
        peserta_id: peserta.id,
        asesor_id: user.id, // ambil dari user store
        huruf,
        nilai: totalScore(kategori),
        kategori,
      }))
    );

    try {
      const res = await apiClient.post("/assessments/bulk", { assessments });
      console.log("Response bulk:", res.data);
      alert("Penilaian berhasil dikirim!");
    } catch (err) {
      console.error("Error submit penilaian:", err);
    }
  };

  if (isLoading) return <Typography>Loading peserta...</Typography>;
  if (error) return <Typography>Error load peserta</Typography>;
  if (!peserta) return <Typography>Peserta tidak ditemukan</Typography>;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "grey.50", py: 2 }}>
      <Container maxWidth="lg">
        <HeaderPeserta peserta={peserta} totalAverage={totalAverage()} />

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
