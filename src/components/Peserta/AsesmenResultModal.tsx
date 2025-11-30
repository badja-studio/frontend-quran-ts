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
  width: { xs: "95%", sm: "80%", md: "60%" },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
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
  sections: SectionItem[];
}

const AsesmenResultModal: React.FC<AsesmenResultModalProps> = ({
  open,
  onClose,
  pesertaName,
  asesorName,
  waktuPelaksanaan,
  nilaiAkhir,
  sections,
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

          <Button onClick={onClose}>
            <Close />
          </Button>
        </Box>

        {/* INFO PESERTA */}
        <Typography>
          <strong>Asesor:</strong> {asesorName}
        </Typography>
        <Typography>
          <strong>Waktu Pelaksanaan:</strong> {waktuPelaksanaan}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="success.main" fontWeight="bold">
            Nilai Akhir: {nilaiAkhir.toFixed(1)}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            <strong>Predikat:</strong> Lancar
          </Typography>
        </Grid>

        {/* BAGIAN GRID HURUF */}
        <Card sx={{ p: 2, mt: 3, borderRadius: 3 }}>
          <Grid container spacing={2}>
            {sections.map((sec, idx) => (
              <Card key={idx} sx={{ p: 2, mt: 3, borderRadius: 3 }}>
                <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {sec.title}
                  </Typography>

                  <Typography
                    sx={{
                      background: "#e8f5e9",
                      px: 2,
                      py: "2px",
                      borderRadius: 2,
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    100.00
                  </Typography>
                </Grid>

                <Grid container spacing={2}>
                  {sec.list.map((item, i) => {
                    const huruf = typeof item === "string" ? item : item.simbol;

                    return (
                      <Grid item xs={4} sm={3} md={2} lg={1.5} key={i}>
                        <Card
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            height: "80px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            gap: "4px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.55rem",
                                sm: "0.7rem",
                                md: "0.8rem",
                              },
                              fontWeight: 500,
                              lineHeight: 1.1,
                            }}
                          >
                            {huruf}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.65rem",
                                sm: "0.8rem",
                                md: "0.95rem",
                              },
                              fontWeight: "bold",
                            }}
                          >
                            {typeof item === "string" ? 0 : item.nilai}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            ))}
          </Grid>
        </Card>

        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{ mt: 3, borderRadius: 2 }}
        >
          Tutup
        </Button>
      </Box>
    </Modal>
  );
};

export default AsesmenResultModal;
