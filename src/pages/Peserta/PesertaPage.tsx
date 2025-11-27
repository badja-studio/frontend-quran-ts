import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import AsesmenResultModal from "../../components/Peserta/AsesmenResultModal";
import PesertaInfoCard from "../../components/Peserta/PesertaInfoCard";
import AsesmenListCard from "../../components/Peserta/AsesmenListCard";

interface AsesmenItem {
  asesor: string;
  waktu: string;
  status: string;
  linkWa?: string;
}

const dataQuiz = {
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

const peserta = {
  akun: "320230003003",
  nama: "Neneng Halimah",
  level: "Guru",
  jenjang: "SMP",
  status: "NON PNS",
  sekolah: "SMP ISLAM TERPADU YASPIDA 2",
  kabupaten: "KABUPATEN SUKABUMI",
  provinsi: "JAWA BARAT",
  pendidikan: "S1 Pendidikan Agama Islam",
};

const asesmen: AsesmenItem[] = [
  {
    asesor: "Liana Masruroh",
    waktu: "27/08/2025 19:26–19:28",
    status: "belum asesmen",
    linkWa: "https://chat.whatsapp.com/xxxxxx",
  },
];

const PesertaPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<AsesmenItem | null>(
    null
  );

  const handleOpen = (asesmen: AsesmenItem) => {
    setSelectedAsesmen(asesmen);
    setModalVisible(true);
  };

  // const handleClose = () => {
  //   setModalVisible(false);
  //   setSelectedAsesmen(null);
  // };

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
          <PesertaInfoCard peserta={peserta} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <AsesmenListCard asesmen={asesmen} onOpen={handleOpen} />
        </Grid>
      </Grid>

      {selectedAsesmen && (
        <AsesmenResultModal
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          pesertaName="Ahmad Zaki"
          asesorName="Ustadz Fauzan"
          waktuPelaksanaan="26 Nov 2025"
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
