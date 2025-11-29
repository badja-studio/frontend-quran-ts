"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import apiClient from "../../../services/api.config";

interface AsesorFormData {
  name: string;
  username: string;
  no_telepon: string;
  email: string;
  link_grup_wa: string;
  akun_id: number;
}

export default function InputAsesorPage() {
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showErrorNotif, setShowErrorNotif] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AsesorFormData>({
    defaultValues: {
      name: "",
      username: "",
      no_telepon: "",
      email: "",
      link_grup_wa: "",
      akun_id: 0,
    },
  });

  const createAsesorMutation = useMutation({
    mutationFn: async (data: AsesorFormData) => {
      const response = await apiClient.post("/api/assessors", data);
      return response.data;
    },
    onSuccess: () => {
      reset(); // Auto-reset form setelah sukses
      setShowSuccessNotif(true); // Show success notification
    },
    onError: () => {
      setShowErrorNotif(true); // Show error notification
    },
  });

  const onSubmit = (data: AsesorFormData) => {
    createAsesorMutation.mutate(data);
  };

  const handleCloseSuccessNotif = () => {
    setShowSuccessNotif(false);
  };

  const handleCloseErrorNotif = () => {
    setShowErrorNotif(false);
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box
        p={4}
        sx={{
          background: "#f7f7f9",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight="700" mb={1}>
            Input Asesor
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Isi informasi lengkap asesor dengan benar.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Nama lengkap wajib diisi",
                    minLength: {
                      value: 3,
                      message: "Nama minimal 3 karakter",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nama Lengkap"
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username wajib diisi",
                    minLength: {
                      value: 3,
                      message: "Username minimal 3 karakter",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username hanya boleh huruf, angka, dan underscore",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      fullWidth
                      required
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="no_telepon"
                  control={control}
                  rules={{
                    required: "No telepon wajib diisi",
                    pattern: {
                      value: /^[0-9+]{10,15}$/,
                      message: "No telepon tidak valid (10-15 digit)",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="No Telepon"
                      fullWidth
                      required
                      error={!!errors.no_telepon}
                      helperText={errors.no_telepon?.message}
                      placeholder="08xxxxxxxxxx"
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
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
                      fullWidth
                      required
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="link_grup_wa"
                  control={control}
                  rules={{
                    required: "Link WhatsApp wajib diisi",
                    pattern: {
                      value: /^https?:\/\/(wa\.me|chat\.whatsapp\.com)\/.+$/,
                      message: "Link WhatsApp tidak valid",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Link WhatsApp"
                      fullWidth
                      required
                      error={!!errors.link_grup_wa}
                      helperText={errors.link_grup_wa?.message}
                      placeholder="https://wa.me/628xxxxxxx"
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="akun_id"
                  control={control}
                  rules={{
                    required: "Akun ID wajib diisi",
                    min: {
                      value: 1,
                      message: "Akun ID harus lebih dari 0",
                    },
                  }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <TextField
                      {...field}
                      label="Akun ID"
                      fullWidth
                      required
                      type="number"
                      value={value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val ? parseInt(val, 10) : 0);
                      }}
                      error={!!errors.akun_id}
                      helperText={errors.akun_id?.message}
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={() => reset()}
                disabled={createAsesorMutation.isPending}
              >
                Reset
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  opacity: createAsesorMutation.isPending ? 0.7 : 1,
                }}
                disabled={createAsesorMutation.isPending}
              >
                {createAsesorMutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </Box>
          </form>
        </Card>

        {/* Success Notification */}
        <Snackbar
          open={showSuccessNotif}
          autoHideDuration={3000}
          onClose={handleCloseSuccessNotif}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSuccessNotif}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Data asesor berhasil disimpan!
          </Alert>
        </Snackbar>

        {/* Error Notification */}
        <Snackbar
          open={showErrorNotif}
          autoHideDuration={4000}
          onClose={handleCloseErrorNotif}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseErrorNotif}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {createAsesorMutation.error instanceof Error
              ? createAsesorMutation.error.message
              : "Terjadi kesalahan saat menyimpan data"}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}
