import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { DataPeserta } from "../../pages/Peserta/type";
import {
  PersonOutline,
  LocationOnOutlined,
  SchoolOutlined,
  InfoOutlined,
} from "@mui/icons-material";

interface Props {
  peserta: DataPeserta;
  onOpenDetail: (data: DataPeserta) => void;
}

const DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const PesertaInfoCard: React.FC<Props> = ({ peserta, onOpenDetail }) => {
  const foto = DEFAULT_PHOTO;

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          fontWeight: 500,
          mt: 0.5,
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        background: "white",
      }}
    >
      {/* Header with Gradient */}
      <Box
        sx={{
          background: "#2E7D32",
          color: "white",
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonOutline sx={{ fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem" }}>
            Profil Peserta
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Informasi data peserta asesmen
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Photo & Primary Info Section */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            {/* Photo */}
            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={foto}
                alt="foto peserta"
                sx={{
                  width: 110,
                  height: 130,
                  borderRadius: 2,
                  objectFit: "cover",
                  border: "3px solid",
                  borderColor: "divider",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Chip
                label={peserta.status}
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: 24,
                  background:
                    peserta.status === "Aktif" ? "#22c55e" : "#94a3b8",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </Box>

            {/* Primary Info */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 0.5,
                      fontSize: "1.4rem",
                    }}
                  >
                    {peserta.nama}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ mb: 1 }}
                  >
                    <Chip
                      label={peserta.nik}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        height: 26,
                      }}
                    />
                    <Chip
                      label={
                        peserta.jenis_kelamin === "L"
                          ? "Laki-laki"
                          : "Perempuan"
                      }
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        height: 26,
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Divider />

          {/* Location Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocationOnOutlined
                sx={{ fontSize: 20, color: "primary.main" }}
              />
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="text.primary"
              >
                Informasi Lokasi
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <InfoRow label="Provinsi" value={peserta.provinsi ?? "-"} />
                <InfoRow label="Kota/Kabupaten" value={peserta.kota ?? "-"} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoRow label="Kecamatan" value={peserta.kecamatan} />
                <InfoRow label="Kelurahan/Desa" value={peserta.kelurahan} />
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* School Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SchoolOutlined sx={{ fontSize: 20, color: "primary.main" }} />
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="text.primary"
              >
                Informasi Sekolah
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <InfoRow label="Nama Sekolah" value={peserta.sekolah ?? "-"} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoRow
                  label="Alamat Sekolah"
                  value={peserta.alamat_sekolah}
                />
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<InfoOutlined />}
            onClick={() => onOpenDetail(peserta)}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              py: 1,
              borderRadius: 2,
              background: "#2E7D32",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(22, 163, 74, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Lihat Detail Lengkap
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PesertaInfoCard;
