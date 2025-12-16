import { Box, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  no_akun: string;
}

interface Participant {
  video_url?: string;
}

interface GtkApiResponse {
  success: boolean;
  results: Participant[];
}

const GTK_API_BASE_URL = import.meta.env.VITE_GTK_API_BASE_URL;

export default function VideoView({ no_akun }: Props) {
  const { data, isLoading, isError } = useQuery<GtkApiResponse>({
    queryKey: ["video-peserta", no_akun],
    queryFn: async () => {
      const res = await axios.get<GtkApiResponse>(
        `${GTK_API_BASE_URL}/api/participants`,
        {
          params: {
            teacher_id: no_akun,
          },
        }
      );
      return res.data;
    },
    enabled: !!no_akun,
    retry: false,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <Box sx={{ position: "fixed", right: 16, top: 100, p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ position: "fixed", right: 16, top: 100, width: 240 }}>
        <Alert severity="error">Gagal mengambil video peserta</Alert>
      </Box>
    );
  }

  const videoUrl = data?.results?.[0]?.video_url;

  if (!videoUrl) {
    return (
      <Box sx={{ position: "fixed", right: 16, top: 100, width: 240 }}>
        <Alert severity="info">Video belum tersedia</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        right: 16,
        top: 100,
        width: 320,
        aspectRatio: "14 / 7",
        bgcolor: "black",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 4,
      }}
    >
      <video
        src={videoUrl}
        controls
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
  );
}
