import React from "react";
import { Modal, Box, Typography, Button, Divider, Card } from "@mui/material";
import { Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%" },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

interface AsesmenResultModalProps {
  open: boolean;
  onClose: () => void;
  pesertaName: string;
  asesorName: string;
  waktuPelaksanaan: string;
  nilaiAkhir: number;
  // Anda bisa menambahkan props untuk data chart/grid di sini
}

const AsesmenResultModal: React.FC<AsesmenResultModalProps> = ({
  open,
  onClose,
  pesertaName,
  asesorName,
  waktuPelaksanaan,
  nilaiAkhir,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderBottom: "2px solid #2E7D32",
          }}
        >
          <Typography id="modal-title" variant="h5" fontWeight="bold">
            Hasil Asesmen: {pesertaName}
          </Typography>
          <Button onClick={onClose}>
            <Close />
          </Button>
        </Box>

        <Box id="modal-description" sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            **Asesor:** {asesorName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            **Waktu Pelaksanaan:** {waktuPelaksanaan}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="h6"
            color="success.main"
            fontWeight="bold"
            gutterBottom
          >
            Nilai Akhir: {nilaiAkhir.toFixed(1)}
          </Typography>

          {/* Placeholder untuk komponen data aktual */}
          <Card sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5" }}>
            <Typography fontWeight="bold">Ringkasan Kelancaran:</Typography>
            <Typography>Kelancaran Membaca Al-Quran: Sangat Baik</Typography>
            <Typography>
              Hukum Mad dan Qashr: Terdapat beberapa kesalahan minor.
            </Typography>
          </Card>
        </Box>

        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{ mt: 4, borderRadius: 2 }}
        >
          Tutup
        </Button>
      </Box>
    </Modal>
  );
};

export default AsesmenResultModal;
