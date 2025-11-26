import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Person, Edit } from "@mui/icons-material";
import InfoField from "./InfoField";

interface Props {
  peserta: any;
}

const PesertaInfoCard: React.FC<Props> = ({ peserta }) => {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(6px)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Person />
        <Typography variant="h6" fontWeight="bold">
          Data Peserta
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Avatar
              src="/foto.jpg"
              variant="rounded"
              sx={{
                width: "100%",
                height: 260,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                borderRadius: 3,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <InfoField label="No. Akun" value={peserta.akun} />
            <InfoField label="Nama" value={peserta.nama} />
            <InfoField label="Jenjang" value={peserta.jenjang} />
            <InfoField label="Status" value={peserta.status} />
            <InfoField label="Sekolah/Madrasah" value={peserta.sekolah} />
            <InfoField label="Kabupaten/Kota" value={peserta.kabupaten} />
            <InfoField label="Provinsi" value={peserta.provinsi} />

            {/* Pendidikan Terakhir */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
              >
                Pendidikan Terakhir
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: 2,
                    background: "#f8f9fa",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {peserta.pendidikan}
                </Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Edit />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PesertaInfoCard;
