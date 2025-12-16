import { Box, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  no_akun: string;
}

interface Participant {
  video_url?: string;
}

interface ApiResponse {
  success: boolean;
  results: Participant[];
}

export default function VideoView({ no_akun }: Props) {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["video-peserta", no_akun],
    queryFn: async () => {
      const res = await axios.get<ApiResponse>(
        "https://gtkmadrasah.kemenag.go.id/tbq/api/participants",
        {
          params: {
            teacher_id: no_akun,
          },
        }
      );
      return res.data;
    },
    enabled: Boolean(no_akun),
    retry: 1,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: 100,
          bgcolor: "black",
          borderRadius: 2,
          p: 2,
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: 100,
          width: 240,
        }}
      >
        <Alert severity="error">Gagal mengambil video peserta</Alert>
      </Box>
    );
  }

  const videoUrl = data?.results?.[0]?.video_url;
  console.log(videoUrl);

  if (!videoUrl) {
    return (
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: 100,
          width: 240,
        }}
      >
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
        aspectRatio: "14 / 7", // paksa landscape
        bgcolor: "black",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 4,
      }}
    >
      <video
        src={videoUrl}
        controls
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          backgroundColor: "black",
        }}
      />
    </Box>
  );
}
