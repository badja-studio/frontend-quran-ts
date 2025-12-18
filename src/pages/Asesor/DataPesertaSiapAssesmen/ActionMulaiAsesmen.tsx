import { useState, useCallback } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { DataPersetaSiap } from "./type";

interface Props {
  row: DataPersetaSiap;
}

interface ParticipantItem {
  video_url?: string | null;
}

interface ParticipantResponse {
  results?: ParticipantItem[];
}

const GTK_API_BASE_URL = import.meta.env.VITE_GTK_API_BASE_URL;

export default function ActionMulaiAsesmen({ row }: Props) {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  /* =========================
     QUERY: CHECK VIDEO
     ========================= */
  const fetchVideoStatus = useCallback(async (): Promise<boolean> => {
    const res = await axios.get<ParticipantResponse>(
      `${GTK_API_BASE_URL}/api/participants`,
      { params: { teacher_id: row.no_akun } }
    );

    return res.data.results?.some((item) => Boolean(item.video_url)) ?? false;
  }, [row.no_akun]);

  const {
    data: hasVideo = false,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participant-video", row.no_akun],
    queryFn: fetchVideoStatus,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  /* =========================
     HANDLER
     ========================= */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleClick = useCallback(() => {
    if (!hasVideo) {
      setSnackbar({
        open: true,
        message: "Video peserta belum tersedia",
        severity: "error",
      });
      return;
    }

    navigate(`/dashboard/asesor/penilaian/${row.id}`, {
      state: { peserta: row },
    });
  }, [hasVideo, navigate, row]);

  /* =========================
     UI STATE
     ========================= */
  const disabled = isLoading || isError || !hasVideo;

  const label = isLoading
    ? "Memeriksa..."
    : hasVideo
    ? "Mulai Asesmen"
    : "Video Belum Ada";

  const icon = isLoading ? (
    <CircularProgress size={16} color="inherit" />
  ) : hasVideo ? (
    <PlayArrowRoundedIcon />
  ) : (
    <VideocamOffRoundedIcon />
  );

  const tooltipText = isLoading
    ? "Memeriksa video peserta"
    : hasVideo
    ? "Mulai asesmen peserta"
    : "Peserta belum mengirim video";

  /* =========================
     RENDER
     ========================= */
  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <span>
          <Button
            variant="contained"
            size="small"
            disabled={disabled}
            onClick={handleClick}
            startIcon={icon}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              bgcolor: hasVideo ? "primary.main" : "grey.500",
              "&:hover": {
                bgcolor: hasVideo ? "primary.dark" : "grey.500",
              },
              boxShadow: 3,
            }}
          >
            {label}
          </Button>
        </span>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
