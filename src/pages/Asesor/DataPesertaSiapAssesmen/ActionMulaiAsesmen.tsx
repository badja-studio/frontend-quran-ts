import { useState } from "react";
import {
  Button,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataPersetaSiap } from "./type";

interface Props {
  row: DataPersetaSiap;
}

const GTK_API_BASE_URL = import.meta.env.VITE_GTK_API_BASE_URL;

export default function ActionMulaiAsesmen({ row }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClick = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${GTK_API_BASE_URL}/api/participants`, {
        params: { teacher_id: row.no_akun },
      });

      const videoUrl = res.data?.results?.[0]?.video_url;

      if (!videoUrl) {
        setSnackbar({
          open: true,
          message: "Video peserta belum tersedia",
          severity: "error",
        });
        return;
      }

      navigate(`/dashboard/asesor/penilaian/${row.id}`, {
        state: { peserta: { ...row, no_akun: row.no_akun } },
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Gagal memeriksa video peserta",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="Mulai asesmen peserta" arrow>
        <span>
          <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <PlayArrowRoundedIcon />
              )
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "error.dark", transform: "scale(1.05)" },
              boxShadow: 3,
              transition: "all 0.2s ease-in-out",
            }}
          >
            {loading ? "Memeriksa..." : "Mulai Asesmen"}
          </Button>
        </span>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          icon={<VideocamOffRoundedIcon />}
          sx={{
            width: "100%",
            bgcolor: "error.light",
            color: "white",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
