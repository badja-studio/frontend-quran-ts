import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Paper,
  Container,
  Divider,
} from "@mui/material";

const peserta = {
  akun: "320230003003",
  nama: "Neneng Halimah",
  level: "Guru",
  jenjang: "SMP",
  status: "NON PNS",
  sekolah: "SMP ISLAM TERPADU YASPIDA 2",
};

const huruf = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
];
const ahkamHuruf = ["Izhar", "Idgham", "Iqlab", "Ikhfa"];
const madList = ["Thabi'i", "Wajib", "Jaiz", "Lazim", "Badal"];
const gharibList = ["Isymam", "Naql", "Imalah", "Tashil"];

const ruleSet: Record<string, { firstMinus: number; nextMinus: number }> = {
  makhraj: { firstMinus: 2, nextMinus: 0.5 },
  sifat: { firstMinus: 0.5, nextMinus: 0.25 },
  ahkam: { firstMinus: 0.5, nextMinus: 0.25 },
  madA: { firstMinus: 2, nextMinus: 0.5 },
  madB: { firstMinus: 1, nextMinus: 0.5 },
  gharib: { firstMinus: 1, nextMinus: 0.5 },
};

const PenilaianPageCompact = () => {
  const [mistakes, setMistakes] = useState<
    Record<string, Record<string, number>>
  >({
    makhraj: huruf.reduce((a, h) => ({ ...a, [h]: 0 }), {}),
    sifat: huruf.reduce((a, h) => ({ ...a, [h]: 0 }), {}),
    ahkam: ahkamHuruf.reduce((a, h) => ({ ...a, [h]: 0 }), {}),
    mad: madList.reduce((a, h) => ({ ...a, [h]: 0 }), {}),
    gharib: gharibList.reduce((a, h) => ({ ...a, [h]: 0 }), {}),
  });

  const handleScore = (
    category: string,
    key: string,
    type: "plus" | "minus"
  ) => {
    setMistakes((prev) => {
      const current = prev[category][key];
      const newVal = type === "minus" ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [category]: { ...prev[category], [key]: newVal } };
    });
  };

  const totalScore = (category: string) => {
    const catRule =
      category === "mad"
        ? ruleSet["madA"]
        : ruleSet[category as keyof typeof ruleSet];
    const catMistakes = mistakes[category];
    let score = 100,
      firstDone = false;
    Object.keys(catMistakes).forEach((h) => {
      const count = catMistakes[h];
      for (let i = 0; i < count; i++) {
        score -= firstDone ? catRule.nextMinus : catRule.firstMinus;
        firstDone = true;
      }
    });
    return Math.max(0, score);
  };

  const totalAverage = () =>
    (
      [
        totalScore("makhraj"),
        totalScore("sifat"),
        totalScore("ahkam"),
        totalScore("mad"),
        totalScore("gharib"),
      ].reduce((a, b) => a + b, 0) / 5
    ).toFixed(2);

  const renderGrid = (category: string, list: string[]) => (
    <Grid container spacing={0.5}>
      {list.map((h) => (
        <Grid item xs={2} sm={1.5} key={h}>
          <Paper elevation={1} sx={{ p: 0.5, textAlign: "center" }}>
            <Typography
              fontSize={
                category === "makhraj" || category === "sifat" ? 18 : 12
              }
            >
              {h}
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {mistakes[category][h]}
            </Typography>
            <Box display="flex" justifyContent="center" gap={0.5}>
              <Button
                size="small"
                sx={{ minWidth: 20, minHeight: 20, p: 0, fontSize: 14 }}
                onClick={() => handleScore(category, h, "minus")}
              >
                –
              </Button>
              <Button
                size="small"
                sx={{ minWidth: 20, minHeight: 20, p: 0, fontSize: 14 }}
                onClick={() => handleScore(category, h, "plus")}
              >
                +
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  const renderSection = (title: string, category: string, list: string[]) => (
    <Card sx={{ mb: 1, p: 1, border: "1px solid", borderColor: "grey.300" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0.5}
      >
        <Typography fontWeight={600}>{title}</Typography>
        <Paper
          sx={{
            px: 1,
            py: 0.25,
            bgcolor: "grey.100",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography fontWeight={600} fontSize={14}>
            {totalScore(category).toFixed(2)}
          </Typography>
        </Paper>
      </Box>
      <Divider sx={{ mb: 0.5 }} />
      {renderGrid(category, list)}
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 2 }}>
      <Container maxWidth="lg">
        <Card
          sx={{
            mb: 2,
            p: 1,
            border: "1px solid",
            borderColor: "grey.300",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize={16}>
              {peserta.nama}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {peserta.level} • {peserta.jenjang} • {peserta.status}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {peserta.sekolah}
            </Typography>
          </Box>
          <Paper
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: "grey.100",
              border: "1px solid",
              borderColor: "grey.300",
              textAlign: "center",
            }}
          >
            <Typography fontSize={14} color="text.secondary">
              Rata-rata
            </Typography>
            <Typography fontWeight={600} fontSize={16}>
              {totalAverage()}
            </Typography>
          </Paper>
        </Card>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            {renderSection("Makharijul Huruf", "makhraj", huruf)}
            {renderSection("Ahkamul Huruf", "ahkam", ahkamHuruf)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderSection("Sifatul Huruf", "sifat", huruf)}
            {renderSection("Ahkamul Mad", "mad", madList)}
            {renderSection("Gharib", "gharib", gharibList)}
          </Grid>
        </Grid>

        <Paper
          sx={{ mt: 1, p: 1, border: "1px solid", borderColor: "grey.300" }}
        >
          <Typography fontWeight={600} fontSize={12}>
            Petunjuk:
          </Typography>
          <Typography fontSize={12}>
            Klik tombol <strong>–</strong> untuk tambah kesalahan, tombol{" "}
            <strong>+</strong> untuk kurangi kesalahan.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PenilaianPageCompact;
