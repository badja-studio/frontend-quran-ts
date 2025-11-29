import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  peserta,
  makhraj,
  shifat,
  ahkamHuruf,
  madList,
  gharibList,
} from "./types";

import ScoreSection from "./ScoreSection";
import HeaderPeserta from "./HeaderPeserta";

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

type Rule = { first: number; next: number };
type RuleSet = {
  makhraj: Rule;
  sifat: Rule;
  ahkam: Rule;
  gharib: Rule;
  madA: Rule;
  madB: Rule;
};

const PenilaianPageCompact: React.FC = () => {
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

  const handleSubmit = () => {
    const payload = {
      peserta,
      nilai: {
        makhraj: {
          score: totalScore("makhraj"),
          detail: mistakes.makhraj,
        },
        sifat: {
          score: totalScore("sifat"),
          detail: mistakes.sifat,
        },
        ahkam: {
          score: totalScore("ahkam"),
          detail: mistakes.ahkam,
        },
        mad: {
          score: totalScore("mad"),
          detail: mistakes.mad,
        },
        gharib: {
          score: totalScore("gharib"),
          detail: mistakes.gharib,
        },
      },
      totalAverage: totalAverage(),
    };

    console.log("DATA DIKIRIM:", payload);

    // Contoh redirect:
    // navigate("/hasil", { state: payload });

    // Contoh POST ke API:
    /*
  fetch("/api/kirim-nilai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  */
  };

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
