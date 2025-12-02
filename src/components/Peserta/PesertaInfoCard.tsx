import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Person, Edit } from "@mui/icons-material";
import InfoField from "./InfoField";
import { DataPeserta } from "../../pages/Peserta/type";

interface Props {
  peserta: DataPeserta;
  onEdit?: () => void;
}

const PesertaInfoCard: React.FC<Props> = ({ peserta, onEdit }) => {
  const fields = [
    { label: "NIK", value: peserta.nik },
    { label: "Nama Lengkap", value: peserta.nama },
    { label: "Jenis Kelamin", value: peserta.jenis_kelamin },
    { label: "Tempat Lahir", value: peserta.tempat_lahir },
    { label: "Tanggal Lahir", value: peserta.tanggal_lahir },
    { label: "Provinsi", value: peserta.provinsi },
    { label: "Kabupaten/Kota", value: peserta.kota },
    { label: "Kecamatan", value: peserta.kecamatan },
    { label: "Kelurahan/Desa", value: peserta.kelurahan },
    { label: "Status Pegawai", value: peserta.status_pegawai },
    { label: "Sertifikasi", value: peserta.sertifikat_profesi },
    { label: "Pendidikan Terakhir", value: peserta.pendidikan },
    { label: "Perguruan Tinggi", value: peserta.perguruan_tinggi },
    { label: "Fakultas", value: peserta.fakultas },
    { label: "Program Studi", value: peserta.prodi },
    { label: "Tingkatan", value: peserta.tingkat_sekolah },
    { label: "Sekolah/Madrasah", value: peserta.sekolah },
    { label: "Alamat Sekolah", value: peserta.alamat_sekolah },
    { label: "Mapel Yang Diampu", value: peserta.level },
    { label: "Status Asesmen", value: peserta.status },
  ];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        position: "relative",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.12)",
        },
        backgroundColor: "#fff",
      }}
    >
      {/* Tombol Edit */}
      {onEdit && (
        <Button
          onClick={onEdit}
          variant="contained"
          color="secondary"
          startIcon={<Edit />}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "secondary.light",
            color: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "#fff",
            },
          }}
        >
          Edit
        </Button>
      )}

      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Person fontSize="small" />
        <Typography variant="subtitle1" fontWeight={600}>
          Profil Peserta
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* INFO 2 KOLON */}
          {fields.map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <InfoField label={field.label} value={field.value || "-"} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PesertaInfoCard;
