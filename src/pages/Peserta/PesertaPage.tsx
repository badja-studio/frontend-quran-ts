import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import { Person, Edit, Visibility, AccessTime } from "@mui/icons-material";
import AsesmenResultModal from "../../components/Peserta/AsesmenResultModal";

interface AsesmenItem {
  asesor: string;
  waktu: string;
  status: string;
}

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
    status: "selesai asesmen",
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

  const handleClose = () => {
    setModalVisible(false);
    setSelectedAsesmen(null);
  };

  const isAssessmentCompleted = (status: string) =>
    status.toLowerCase().includes("selesai");

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
        {/* DATA PESERTA */}
        <Grid item xs={12} lg={8}>
          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(6px)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Person sx={{ fontSize: { xs: 20, sm: 26, md: 32 } }} />
              <Typography variant="h6" fontWeight="bold">
                Data Peserta
              </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* FOTO */}
                <Grid item xs={12} sm={4}>
                  <Avatar
                    src="/foto.jpg"
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: 260,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                      borderRadius: 3,
                    }}
                  />
                </Grid>

                {/* DETAIL */}
                <Grid item xs={12} sm={8}>
                  {[
                    ["No. Akun", peserta.akun],
                    ["Nama", peserta.nama],
                    ["Jenjang", peserta.jenjang],
                    ["Status", peserta.status],
                    ["Sekolah/Madrasah", peserta.sekolah],
                    ["Kabupaten/Kota", peserta.kabupaten],
                    ["Provinsi", peserta.provinsi],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        {label}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          p: 1,
                          mt: 0.5,
                          borderRadius: 2,
                          background: "#f8f9fa",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}

                  {/* Pendidikan */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Pendidikan Terakhir
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          flex: 1,
                          p: 1,
                          borderRadius: 2,
                          background: "#f8f9fa",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {peserta.pendidikan}
                      </Typography>

                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Edit />}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ASESMEN */}
        <Grid item xs={12} lg={4}>
          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccessTime sx={{ fontSize: { xs: 20, sm: 26, md: 32 } }} />
              <Typography variant="h6" fontWeight="bold">
                Asesmen
              </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
              {asesmen.map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid #ddd",
                    background: "white",
                    transition: "0.3s",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Asesor
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
                    {row.asesor}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Waktu
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {row.waktu}
                  </Typography>

                  {isAssessmentCompleted(row.status) ? (
                    <Button
                      variant="contained"
                      startIcon={<Visibility />}
                      fullWidth
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                      onClick={() => handleOpen(row)}
                    >
                      Lihat Hasil
                    </Button>
                  ) : (
                    <Button variant="outlined" color="error" fullWidth disabled>
                      Belum Asesmen
                    </Button>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* MODAL HASIL ASESMEN */}
      {selectedAsesmen && (
        <AsesmenResultModal
          open={modalVisible}
          onClose={handleClose}
          pesertaName={peserta.nama}
          asesorName={selectedAsesmen.asesor}
          waktuPelaksanaan={selectedAsesmen.waktu}
          nilaiAkhir={87.5} // dummy
        />
      )}
    </Box>
  );
};

export default PesertaPage;
