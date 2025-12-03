import { useEffect } from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import {
  Box,
  Typography,
  Divider,
  Card,
  Avatar,
  Grid,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { WhatsApp as WhatsAppIcon } from "@mui/icons-material";
import apiClient from "../../../services/api.config";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useUserProfile } from "../../../hooks/useUserProfile";

// Tipe Assessor
export interface AssessorProfile {
  akun_id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  no_telepon?: string;
  link_grup_wa?: string;
  participants?: unknown[];
  total_peserta_belum_asesmen?: number;
  total_peserta_selesai_asesmen?: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiAssessorResponse {
  success: boolean;
  message: string;
  data: AssessorProfile;
}

interface AsesorFormData {
  name: string;
  username: string;
  email: string;
  no_telepon: string;
  link_grup_wa: string;
}

export default function AsesmenForm() {
  const { data: user } = useUserProfile();

  const { data: response } = useQuery<ApiAssessorResponse>({
    queryKey: ["Assessor-profile"],
    queryFn: async () => {
      console.log("Fetching assessor profile...");
      const result = await apiClient.get("/api/assessors/profile");
      return result.data;
    },
    staleTime: 30000,
    enabled: !!user,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AsesorFormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      no_telepon: "",
      link_grup_wa: "",
    },
  });

  // Update form ketika data dari API berubah
  useEffect(() => {
    if (response?.data) {
      reset({
        name: response.data.name || "",
        username: response.data.username || "",
        email: response.data.email || "",
        no_telepon: response.data.no_telepon || "",
        link_grup_wa: response.data.link_grup_wa || "",
      });
    }
  }, [response, reset]);

  const handleSave = async (values: AsesorFormData) => {
    console.log("Data Baru yang disubmit:", values);

    // Format output JSON:
    // {
    //   "name": "...",
    //   "username": "...",
    //   "email": "...",
    //   "no_telepon": "...",
    //   "link_grup_wa": "..."
    // }

    // Kirim ke API
    // try {
    //   const response = await apiClient.put("/api/assessors/profile", values);
    //   if (response.data.success) {
    //     alert("Data berhasil diperbarui!");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Gagal memperbarui data!");
    // }

    alert("Data berhasil diperbarui!");
  };

  const handleCancel = () => {
    // Reset ke data dari API
    if (response?.data) {
      reset({
        name: response.data.name || "",
        username: response.data.username || "",
        email: response.data.email || "",
        no_telepon: response.data.no_telepon || "",
        link_grup_wa: response.data.link_grup_wa || "",
      });
    }
  };

  const baseStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      background: "#fafafa",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      background: "#fff",
    },
  };

  return (
    <DashboardLayout
      userRole={user?.role === "admin" ? "admin" : "assessor"}
      userName={user?.name || ""}
      userEmail={user?.email || ""}
    >
      <Box>
        <Card
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          }}
        >
          {/* HEADER USER */}
          <Box textAlign="center" mb={3}>
            <Avatar
              sx={{
                width: 110,
                height: 110,
                mx: "auto",
                mb: 1,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                border: "3px solid white",
              }}
            />

            <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: -0.5 }}>
              Asesor Sistem
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {user?.role || "assessor"}
            </Typography>

            <Box
              mt={1.7}
              px={2.2}
              py={0.7}
              borderRadius={2}
              bgcolor="success.main"
              color="white"
              fontSize={12}
              display="inline-block"
              fontWeight={600}
              sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              AKTIF
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* FORM FIELDS */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Nama lengkap wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nama Lengkap"
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={baseStyle}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    required
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={baseStyle}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format email tidak valid",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={baseStyle}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="no_telepon"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nomor Telepon"
                    type="tel"
                    fullWidth
                    error={!!errors.no_telepon}
                    helperText={errors.no_telepon?.message}
                    sx={baseStyle}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="link_grup_wa"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Link Grup WhatsApp"
                    type="url"
                    fullWidth
                    error={!!errors.link_grup_wa}
                    helperText={errors.link_grup_wa?.message}
                    sx={baseStyle}
                    InputProps={{
                      endAdornment: field.value && (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="success"
                            onClick={() => window.open(field.value, '_blank', 'noopener,noreferrer')}
                            aria-label="Buka WhatsApp"
                          >
                            <WhatsAppIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* BUTTON ACTION */}
          <Box
            mt={5}
            display="flex"
            justifyContent="flex-end"
            gap={2}
            sx={{ pt: 3 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Batal
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit(handleSave)}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              }}
            >
              Simpan
            </Button>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
