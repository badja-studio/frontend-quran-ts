import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { Person, Edit, Visibility, AccessTime } from "@mui/icons-material";

const PesertaPage: React.FC = () => {
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

  const asesmen = [
    {
      asesor: "Liana Masruroh",
      waktu: "27/08/2025 19:26–19:28",
      status: "Lihat Hasil",
    },
  ];

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
        <Person
          sx={{
            fontSize: { xs: 20, sm: 26, md: 32 },
          }}
        />

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
            {/* HEADER CARD */}
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
              <Person
                sx={{
                  fontSize: { xs: 20, sm: 26, md: 32 },
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                }}
              >
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
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
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

                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}

                  {/* Pendidikan + Edit */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
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
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
                      >
                        {peserta.pendidikan}
                      </Typography>

                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Edit />}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: 2,
                          px: 3,
                        }}
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
              <AccessTime
                sx={{
                  fontSize: { xs: 20, sm: 26, md: 32 },
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                }}
              >
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
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 8px 18px rgba(0,150,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    Asesor
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 1.5,
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {row.asesor}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    Waktu
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {row.waktu}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    fullWidth
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                      py: 1.2,

                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {row.status}
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PesertaPage;
