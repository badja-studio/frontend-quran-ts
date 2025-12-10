import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataPeserta } from "../../pages/Peserta/type";

interface Props {
  open: boolean;
  onClose: () => void;
  data: DataPeserta | null;
}

const PesertaDetailModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!data) return null;

  const fields = [
    { label: "NIK", value: data.nik },
    { label: "NIP", value: data.nip },
    { label: "Email", value: data.email },
    { label: "No. Handphone", value: data.no_handphone },
    { label: "Tempat Lahir", value: data.tempat_lahir },
    { label: "Tanggal Lahir", value: data.tanggal_lahir },
    { label: "Alamat Sekolah", value: data.alamat_sekolah },
    { label: "Provinsi", value: data.provinsi },
    { label: "Kota", value: data.kota },
    { label: "Kecamatan", value: data.kecamatan },
    { label: "Kelurahan", value: data.kelurahan },
    { label: "Tingkatan Sekolah", value: data.tingkat_sekolah },
    { label: "Sekolah", value: data.sekolah },
    { label: "Mata Pelajaran yang Diampuh", value: data.level },
    { label: "Pendidikan", value: data.pendidikan },
    { label: "Perguruan Tinggi", value: data.perguruan_tinggi },
    { label: "Prodi", value: data.prodi },
    { label: "Tahun Lulus", value: data.tahun_lulus },
    { label: "Sertifikasi", value: data.sertifikat_profesi },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        Detail Profil Peserta
        {/* Tombol X — selalu muncul */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "grey.700",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {fields.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Typography fontWeight="bold">{item.label}</Typography>
              <Typography color="text.secondary">
                {item.value || "-"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PesertaDetailModal;
