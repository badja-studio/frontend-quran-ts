import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  IconButton,
  Box,
  Divider,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  PersonOutline,
  LocationOnOutlined,
  SchoolOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { DataPeserta } from "../../pages/Peserta/type";

interface Props {
  open: boolean;
  onClose: () => void;
  data: DataPeserta | null;
}

const PesertaDetailModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!data) return null;

  const InfoField = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: 0.5,
          display: "block",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          fontWeight: 500,
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );

  const SectionHeader = ({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 2.5,
        pb: 1.5,
        borderBottom: "2px solid",
        borderColor: "primary.main",
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.primary.main, 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ color: "primary.main" }}
      >
        {title}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          pr: 6,
          background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
          color: "white",
          py: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PersonOutline sx={{ fontSize: 28 }} />
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: "1.15rem" }}
            >
              Detail Profil Peserta
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Informasi lengkap data peserta
            </Typography>
          </Box>
        </Box>

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "white",
            background: "rgba(255,255,255,0.1)",
            "&:hover": {
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 3,
          background: "#fafafa",
        }}
      >
        {/* Data Pribadi */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={
              <PersonOutline sx={{ color: "primary.main", fontSize: 20 }} />
            }
            title="Data Pribadi"
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="NIK" value={data.nik} />
              <InfoField label="NIP" value={data.nip} />
              <InfoField label="Email" value={data.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="No. Handphone" value={data.no_handphone} />
              <InfoField label="Tempat Lahir" value={data.tempat_lahir} />
              <InfoField label="Tanggal Lahir" value={data.tanggal_lahir} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Lokasi */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={
              <LocationOnOutlined
                sx={{ color: "primary.main", fontSize: 20 }}
              />
            }
            title="Informasi Lokasi"
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="Provinsi" value={data.provinsi} />
              <InfoField label="Kota/Kabupaten" value={data.kota} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Kecamatan" value={data.kecamatan} />
              <InfoField label="Kelurahan/Desa" value={data.kelurahan} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Informasi Sekolah */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={
              <SchoolOutlined sx={{ color: "primary.main", fontSize: 20 }} />
            }
            title="Informasi Sekolah"
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField
                label="Tingkatan Sekolah"
                value={data.tingkat_sekolah}
              />
              <InfoField label="Nama Sekolah" value={data.sekolah} />
              <InfoField
                label="Mata Pelajaran yang Diampuh"
                value={data.level}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Alamat Sekolah" value={data.alamat_sekolah} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Pendidikan */}
        <Box>
          <SectionHeader
            icon={<WorkOutline sx={{ color: "primary.main", fontSize: 20 }} />}
            title="Riwayat Pendidikan"
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoField label="Pendidikan Terakhir" value={data.pendidikan} />
              <InfoField
                label="Perguruan Tinggi"
                value={data.perguruan_tinggi}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoField label="Program Studi" value={data.prodi} />
              <InfoField
                label="Tahun Lulus"
                value={data.tahun_lulus?.toString()}
              />
              <InfoField label="Sertifikasi" value={data.sertifikat_profesi} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PesertaDetailModal;
