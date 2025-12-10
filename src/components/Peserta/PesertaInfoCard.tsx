import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { DataPeserta } from "../../pages/Peserta/type";

interface Props {
  peserta: DataPeserta;
  onOpenDetail: (data: DataPeserta) => void;
}

const DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const PesertaInfoCard: React.FC<Props> = ({ peserta, onOpenDetail }) => {
  const foto = DEFAULT_PHOTO;

  return (
    <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: "#fff" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Profil Peserta
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {/* FOTO DI KIRI */}
          <Box
            component="img"
            src={foto}
            alt="foto peserta"
            sx={{
              width: 100,
              height: 120,
              borderRadius: 2,
              objectFit: "cover",
              backgroundColor: "#eee",
            }}
          />

          {/* TEKS DIBAGI 2 KOLom */}
          <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
            {/* Kolom Kiri */}
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600}>NIK</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.nik}
              </Typography>

              <Typography fontWeight={600}>Nama</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.nama}
              </Typography>

              <Typography fontWeight={600}>Jenis Kelamin</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.jenis_kelamin}
              </Typography>

              <Typography fontWeight={600}>Provinsi</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.provinsi}
              </Typography>

              <Typography fontWeight={600}>Kota/Kab</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.kota}
              </Typography>
            </Box>

            {/* Kolom Kanan */}
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600}>Kecamatan</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.kecamatan}
              </Typography>

              <Typography fontWeight={600}>Kelurahan/Desa</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.kelurahan}
              </Typography>

              <Typography fontWeight={600}>Status</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.status}
              </Typography>

              <Typography fontWeight={600}>Sekolah</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.sekolah}
              </Typography>

              <Typography fontWeight={600}>Alamat Sekolah</Typography>
              <Typography mb={1} color="text.secondary">
                {peserta.alamat_sekolah}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={() => onOpenDetail(peserta)}
        >
          Lihat Detail Lengkap
        </Button>
      </CardContent>
    </Card>
  );
};

export default PesertaInfoCard;
