import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import InfoField from "./InfoField";
import { DataPeserta } from "../../pages/Peserta/type";

type PesertaFieldKey =
  | "nik"
  | "nama"
  | "jenis_kelamin"
  | "tempat_lahir"
  | "tanggal_lahir"
  | "provinsi"
  | "kota"
  | "kecamatan"
  | "kelurahan"
  | "status_pegawai"
  | "sertifikat_profesi"
  | "pendidikan"
  | "perguruan_tinggi"
  | "fakultas"
  | "prodi"
  | "tingkat_sekolah"
  | "sekolah"
  | "alamat_sekolah"
  | "level"
  | "status";
interface Props {
  peserta: DataPeserta;
  onEdit?: (updated: DataPeserta) => void;
}

const PesertaInfoCard: React.FC<Props> = ({ peserta, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<DataPeserta>(peserta);

  const tingkatOptions = ["MI", "MTS", "MA"];
  const statusPegawaiOptions = ["PNS", "Non PNS", "PPK"];

  const fields: { key: PesertaFieldKey; label: string; type?: string }[] = [
    { key: "nik", label: "NIK" },
    { key: "nama", label: "Nama Lengkap" },
    { key: "jenis_kelamin", label: "Jenis Kelamin" },
    { key: "tempat_lahir", label: "Tempat Lahir" },
    { key: "tanggal_lahir", label: "Tanggal Lahir", type: "date" },
    { key: "provinsi", label: "Provinsi" },
    { key: "kota", label: "Kabupaten/Kota" },
    { key: "kecamatan", label: "Kecamatan" },
    { key: "kelurahan", label: "Kelurahan/Desa" },
    { key: "status_pegawai", label: "Status Pegawai" },
    { key: "tingkat_sekolah", label: "Tingkatan" },
    { key: "sekolah", label: "Sekolah/Madrasah" },
    { key: "alamat_sekolah", label: "Alamat Sekolah" },
    { key: "level", label: "Mapel Yang Diampu" },
    { key: "status", label: "Status Asesmen" },
  ];

  const handleChange = (key: PesertaFieldKey, value: string) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onEdit?.(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(peserta);
    setIsEditing(false);
  };

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3, position: "relative", backgroundColor: "#fff" }}
    >
      {/* {!isEditing && (
        <Button
          onClick={() => setIsEditing(true)}
          variant="contained"
          color="secondary"
          startIcon={<Edit />}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Edit
        </Button>
      )} */}

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
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.key}>
              {isEditing ? (
                field.key === "tingkat_sekolah" ? (
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label={field.label}
                    value={editData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    {tingkatOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : field.key === "status_pegawai" ? (
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label={field.label}
                    value={editData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    {statusPegawaiOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type={field.type || "text"}
                    label={field.label}
                    value={editData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )
              ) : (
                <InfoField
                  label={field.label}
                  value={
                    peserta[field.key] != null
                      ? String(peserta[field.key])
                      : "-"
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>

        {isEditing && (
          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ textTransform: "none" }}
            >
              Simpan
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{ textTransform: "none" }}
            >
              Batal
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PesertaInfoCard;
