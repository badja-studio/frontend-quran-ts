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

interface AsesmenResultModalProps {
  open: boolean;
  onClose: () => void;
  pesertaName: string;
  asesorName: string;
  waktuPelaksanaan: string;
  nilaiAkhir: number;
  sections?: SectionItem[];
  categoryScores?: {
    makhraj: number;
    sifat: number;
    ahkam: number;
    mad: number;
    gharib: number;
    kelancaran: number;
    pengurangan: number;
  };
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

        {/* INFO PESERTA */}
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Asesor:</strong> {asesorName}
          </Typography>
          <Typography>
            <strong>Waktu Pelaksanaan:</strong> {waktuPelaksanaan}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Nilai Akhir */}
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

        {/* GRID SECTIONS */}
        <Grid container spacing={3}>
          {(sections ?? []).map((sec, idx) => (
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
                {/* Judul Section + Nilai */}
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
                    {sec.title === "Makharijul Huruf"
                      ? categoryScores?.makhraj.toFixed(2)
                      : sec.title === "Shifatul Huruf"
                      ? categoryScores?.sifat.toFixed(2)
                      : sec.title === "Ahkam Al-Huruf"
                      ? categoryScores?.ahkam.toFixed(2)
                      : sec.title === "Ahkam Al-Mad wa Qashr"
                      ? categoryScores?.mad.toFixed(2)
                      : sec.title === "Gharib"
                      ? categoryScores?.gharib.toFixed(2)
                      : sec.title === "Kelancaran"
                      ? categoryScores?.kelancaran.toFixed(2)
                      : sec.title === "Pengurangan"
                      ? categoryScores?.pengurangan.toFixed(2)
                      : "0.00"}
                  </Typography>
                </Box>

                {/* List Huruf/Nilai */}
                <Grid container spacing={2}>
                  {(sec.list ?? []).map((item, i) => {
                    const huruf = typeof item === "string" ? item : item.simbol;
                    const nilai = typeof item === "string" ? 0 : item.nilai;

                    const isSpecialCategory =
                      sec.title.toLowerCase().includes("kelancaran") ||
                      sec.title.toLowerCase().includes("pengurangan");

                    return (
                      <Grid
                        item
                        xs={isSpecialCategory ? 6 : 3}
                        sm={isSpecialCategory ? 4 : 2}
                        md={isSpecialCategory ? 3 : 1.5}
                        key={i}
                      >
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
                            backgroundColor:
                              isSpecialCategory && nilai > 0
                                ? "#ffebee"
                                : "#fafafa",
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
                                xs: "0.7rem",
                                sm: "0.85rem",
                                md: "1rem",
                              },
                              fontWeight: 500,
                            }}
                          >
                            {huruf}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1.05rem",
                              },
                              fontWeight: "bold",
                              color:
                                isSpecialCategory && nilai > 0
                                  ? "green"
                                  : "inherit",
                            }}
                          >
                            {isSpecialCategory && nilai === 0 ? "" : nilai}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            </Grid>
          ))}
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
