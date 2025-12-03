"use client";

import { useEffect } from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import { Box, Card, Typography, Avatar, Divider, Grid, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api.config";
import { useUserProfile } from "../../../hooks/useUserProfile";

// Interface untuk response API
interface AdminUser {
  id: number;
  role: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
}

interface AdminProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  user_id: number;
  user: AdminUser;
  created_at: string;
  updated_at: string;
}

interface ApiAdminResponse {
  success: boolean;
  message: string;
  data: AdminProfile;
}

interface AdminFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export default function AdminForm() {
  const { data: user } = useUserProfile();

  // Fetch admin profile dari API
  const { data: response, error, isLoading } = useQuery<ApiAdminResponse>({
    queryKey: ["Admin-profile"],
    queryFn: async () => {
      console.log("Fetching admin profile...");
      const result = await apiClient.get("/api/admins/profile");
      console.log("Admin response:", result.data);
      return result.data;
    },
    staleTime: 30000,
    enabled: !!user,
  });

  useEffect(() => {
    if (response) console.log("Admin data loaded:", response);
    if (error) console.error("Error fetching admin data:", error);
  }, [response, error]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  // Update form ketika data dari API berubah
  useEffect(() => {
    if (response?.data) {
      reset({
        name: response.data.name || "",
        username: response.data.username || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
      });
    }
  }, [response, reset]);

  const handleSave = async (values: AdminFormData) => {
    console.log("Admin Save:", values);

    // Format output JSON:
    // {
    //   "name": "John Doe",
    //   "username": "johndoe",
    //   "email": "john.doe@example.com",
    //   "phone": "+628123456789"
    // }

    // Kirim ke API
    // try {
    //   const response = await apiClient.put("/api/admins/profile", values);
    //   if (response.data.success) {
    //     alert("Data admin berhasil diperbarui!");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Gagal memperbarui data!");
    // }

    alert("Data admin berhasil diperbarui!");
  };

  const handleCancel = () => {
    // Reset ke data dari API
    if (response?.data) {
      reset({
        name: response.data.name || "",
        username: response.data.username || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
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

  const dataAdmin = response?.data;

  if (isLoading) {
    return (
      <DashboardLayout
        userRole="admin"
        userName={user?.name || "Admin"}
        userEmail={user?.email || "admin@quran.app"}
      >
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userRole="admin"
      userName={dataAdmin?.name || user?.name || "Admin"}
      userEmail={dataAdmin?.email || user?.email || "admin@quran.app"}
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
              {dataAdmin?.name || "Admin Sistem"}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {dataAdmin?.user?.role || "admin"}
            </Typography>

            <Box
              mt={1.7}
              px={2.2}
              py={0.7}
              borderRadius={2}
              bgcolor={dataAdmin?.user?.is_active ? "success.main" : "error.main"}
              color="white"
              fontSize={12}
              display="inline-block"
              fontWeight={600}
              sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              {dataAdmin?.user?.is_active ? "AKTIF" : "TIDAK AKTIF"}
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
                name="phone"
                control={control}
                rules={{ required: "Nomor telepon wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nomor Telepon"
                    type="tel"
                    fullWidth
                    required
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={baseStyle}
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
