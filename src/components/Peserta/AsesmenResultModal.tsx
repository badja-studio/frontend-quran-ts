import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "85%", md: "70%" },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 28,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

interface SectionListItem {
  simbol: string;
  nilai: number;
}

interface SectionItem {
  title: string;
  list: (string | SectionListItem)[];
}

type CategoryScoreKey =
  | "makhraj"
  | "sifat"
  | "ahkam"
  | "mad"
  | "gharib"
  | "kelancaran"
  | "pengurangan";

interface CategoryScores {
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  kelancaran: number;
  pengurangan: number;
}

interface AsesmenResultModalProps {
  open: boolean;
  onClose: () => void;
  pesertaName: string;
  asesorName: string;
  waktuPelaksanaan: string;
  nilaiAkhir: number;
  sections?: SectionItem[];
  categoryScores?: CategoryScores;
}

const titleToCategoryMap: Record<string, CategoryScoreKey> = {
  "makharijul huruf": "makhraj",
  "shifatul huruf": "sifat",
  "ahkam al-huruf": "ahkam",
  "ahkam al-mad wa qashr": "mad",
  gharib: "gharib",
  kelancaran: "kelancaran",
  pengurangan: "pengurangan",
};

function getCategoryKey(title: string): CategoryScoreKey | null {
  const lower = title.trim().toLowerCase();
  return titleToCategoryMap[lower] ?? null;
}

const AsesmenResultModal: React.FC<AsesmenResultModalProps> = ({
  open,
  onClose,
  pesertaName,
  asesorName,
  waktuPelaksanaan,
  nilaiAkhir,
  sections = [],
  categoryScores,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderBottom: "2px solid #2E7D32",
            pb: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Hasil Asesmen: {pesertaName}
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: 0 }}>
            <Close />
          </Button>
        </Box>

        {/* INFO */}
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Asesor:</strong> {asesorName}
          </Typography>
          <Typography>
            <strong>Waktu Pelaksanaan:</strong> {waktuPelaksanaan}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* NILAI AKHIR */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              color: "white",
              boxShadow: 6,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Nilai Akhir: {nilaiAkhir.toFixed(1)}
            </Typography>
          </Card>
        </Box>

        {/* GRID */}
        <Grid container spacing={3}>
          {sections.map((sec, idx) => {
            const key = getCategoryKey(sec.title);

            // Filter hanya SectionListItem dengan nilai > 0
            const filtered = sec.list.filter(
              (item): item is SectionListItem =>
                typeof item !== "string" && item.nilai > 0
            );

            // Khusus kelancaran & pengurangan: tampilkan hanya jika ada data, dan jangan tampilkan nilai
            if (
              (key === "kelancaran" || key === "pengurangan") &&
              filtered.length === 0
            ) {
              return null;
            }

            return (
              <Grid item xs={12} key={idx}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8 },
                  }}
                >
                  {/* TITLE + SCORE */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {sec.title}
                    </Typography>

                    {key &&
                      key !== "kelancaran" &&
                      key !== "pengurangan" &&
                      categoryScores && (
                        <Typography
                          sx={{
                            background: "#e8f5e9",
                            px: 2.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontWeight: "bold",
                            color: "green",
                            minWidth: "60px",
                            textAlign: "center",
                          }}
                        >
                          {categoryScores[key]?.toFixed(2)}
                        </Typography>
                      )}
                  </Box>

                  {/* LIST */}
                  <Grid container spacing={2}>
                    {filtered.length === 0 ? (
                      <Typography sx={{ p: 2, opacity: 0.6 }}>
                        Tidak ada kesalahan.
                      </Typography>
                    ) : (
                      filtered.map((item, i) => {
                        const hideValue =
                          key === "kelancaran" || key === "pengurangan";
                        return (
                          <Grid item xs={6} sm={4} md={3} key={i}>
                            <Card
                              variant="outlined"
                              sx={{
                                p: 2,
                                borderRadius: 3,
                                height: "110px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 1,
                                backgroundColor: "#ffebee",
                                boxShadow: 1,
                                transition: "0.3s",
                                "&:hover": {
                                  boxShadow: 4,
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                  },
                                  fontWeight: 600,
                                }}
                              >
                                {item.simbol}
                              </Typography>

                              {!hideValue && (
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "0.9rem",
                                      sm: "1rem",
                                      md: "1.1rem",
                                    },
                                    fontWeight: "bold",
                                    color: "green",
                                  }}
                                >
                                  {item.nilai}
                                </Typography>
                              )}
                            </Card>
                          </Grid>
                        );
                      })
                    )}
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{ mt: 4, borderRadius: 3, py: 1.5 }}
        >
          Tutup
        </Button>
      </Box>
    </Modal>
  );
};

export default AsesmenResultModal;
