"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useMutation,
  useInfiniteQuery,
  useQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";
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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import apiClient from "../../../services/api.config";
import { useUserProfile } from "../../../hooks/useUserProfile";

interface Asesor {
  id: string;
  name: string;
  username: string;
  email: string;
  no_telepon: string;
  link_grup_wa: string;
}

type AsesorPage = {
  data: Asesor[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

interface AsesorFormData {
  name: string;
  username: string;
  no_telepon: string;
  email: string;
  link_grup_wa: string;
}

const LIMIT = 10;

export default function InputAsesorPage() {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedAsesorId, setSelectedAsesorId] = useState<string | null>(null);
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const [asesorSearch, setAsesorSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: user } = useUserProfile();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(asesorSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [asesorSearch]);

  // Fetch function for assessors
  const fetchAsesors = async (
    context: QueryFunctionContext<readonly unknown[], unknown>
  ): Promise<AsesorPage> => {
    const pageParam = (context.pageParam as number) ?? 1;
    const params = new URLSearchParams();
    params.append("page", String(pageParam));
    params.append("limit", String(LIMIT));
    if (debouncedSearch) params.append("search", debouncedSearch);

    const res = await apiClient.get(`/api/assessors?${params.toString()}`);
    const payload = res.data;

    if (Array.isArray(payload)) {
      return {
        data: payload,
        page: pageParam,
        hasMore: payload.length === LIMIT,
      };
    }

    return {
      data: payload.data ?? [],
      page: payload.page ?? pageParam,
      totalPages: payload.totalPages,
      hasMore:
        typeof payload.hasMore === "boolean" ? payload.hasMore : undefined,
    };
  };

  // Infinite query for assessors
  const {
    data: asesorsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingAsesorList,
  } = useInfiniteQuery<AsesorPage, unknown, InfiniteData<AsesorPage>>({
    queryKey: ["asesors-dropdown-update", debouncedSearch],
    queryFn: fetchAsesors,
    initialPageParam: 1,
    enabled: mode === "edit",
    getNextPageParam: (lastPage, pages) => {
      const current = lastPage.page ?? pages.length ?? 1;

      if (typeof lastPage.totalPages === "number") {
        return current < lastPage.totalPages ? current + 1 : undefined;
      }
      if (typeof lastPage.hasMore === "boolean") {
        return lastPage.hasMore ? current + 1 : undefined;
      }
      return (lastPage.data?.length ?? 0) === LIMIT ? current + 1 : undefined;
    },
  });

  // Fetch asesor detail by ID
  const { data: asesorDetail } = useQuery({
    queryKey: ["asesor-detail-update", selectedAsesorId],
    queryFn: async () => {
      if (!selectedAsesorId) return null;
      const res = await apiClient.get(`/api/assessors/${selectedAsesorId}`);

      // Handle different response structures
      if (res.data?.data) {
        return res.data.data;
      }
      return res.data;
    },
    enabled: !!selectedAsesorId && mode === "edit",
  });

  // Flatten pages -> single array of asesors
  const asesors: Asesor[] = useMemo(() => {
    if (!asesorsPages?.pages) return [];
    const all = asesorsPages.pages.flatMap((p: AsesorPage) => p.data || []);
    const map = new Map<string, Asesor>();
    all.forEach((a: Asesor) => map.set(a.id, a));
    return Array.from(map.values());
  }, [asesorsPages]);

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
    },
  });

  // Auto-fill form when asesor detail is fetched
  useEffect(() => {
    if (mode === "edit" && asesorDetail) {
      const formData = {
        name: asesorDetail.name || "",
        username: asesorDetail.username || "",
        no_telepon: asesorDetail.no_telepon || "",
        email: asesorDetail.email || "",
        link_grup_wa: asesorDetail.link_grup_wa || "",
      };

      reset(formData);
    }
  }, [asesorDetail, mode, reset]);

  const createAsesorMutation = useMutation({
    mutationFn: async (data: AsesorFormData) => {
      const response = await apiClient.post("/api/assessors", data);
      return response.data;
    },
    onSuccess: () => {
      reset();
      setShowSuccessNotif(true);
    },
    onError: () => {
      setShowErrorNotif(true);
    },
  });

  const updateAsesorMutation = useMutation({
    mutationFn: async (data: AsesorFormData) => {
      if (!selectedAsesorId) throw new Error("No asesor selected");
      const response = await apiClient.put(
        `/api/assessors/${selectedAsesorId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      setShowSuccessNotif(true);
    },
    onError: () => {
      setShowErrorNotif(true);
    },
  });

  const onSubmit = (data: AsesorFormData) => {
    if (mode === "edit") {
      updateAsesorMutation.mutate(data);
    } else {
      createAsesorMutation.mutate(data);
    }
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
      userName={`${user?.name}`}
      userEmail={`${user?.email}`}
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
            {mode === "create" ? "Input Asesor" : "Edit Asesor"}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Isi informasi lengkap asesor dengan benar.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Mode Selector */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Mode
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant={mode === "create" ? "contained" : "outlined"}
                  onClick={() => {
                    setMode("create");
                    setSelectedAsesorId(null);
                    reset({
                      name: "",
                      username: "",
                      no_telepon: "",
                      email: "",
                      link_grup_wa: "",
                    });
                  }}
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Create - Tambah Asesor Baru
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant={mode === "edit" ? "contained" : "outlined"}
                  onClick={() => {
                    setMode("edit");
                    setSelectedAsesorId(null);
                    reset({
                      name: "",
                      username: "",
                      no_telepon: "",
                      email: "",
                      link_grup_wa: "",
                    });
                  }}
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Edit - Update Asesor
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Dropdown Pilih Asesor (only in edit mode) */}
          {mode === "edit" && (
            <>
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Pilih Asesor
                </Typography>
                <Autocomplete
                  options={asesors}
                  getOptionLabel={(option) => option.name}
                  value={
                    asesors.find((a) => a.id === selectedAsesorId) || null
                  }
                  onChange={(_, newValue) => {
                    setSelectedAsesorId(newValue?.id || null);
                  }}
                  onInputChange={(_, newInputValue) => {
                    setAsesorSearch(newInputValue);
                  }}
                  loading={isLoadingAsesorList}
                  ListboxProps={{
                    onScroll: (event: React.SyntheticEvent<HTMLUListElement>) => {
                      const listboxNode = event.currentTarget as HTMLElement;
                      if (
                        listboxNode.scrollTop + listboxNode.clientHeight >=
                        listboxNode.scrollHeight - 1 &&
                        hasNextPage &&
                        !isFetchingNextPage
                      ) {
                        fetchNextPage();
                      }
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cari Asesor"
                      placeholder="Ketik nama asesor..."
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingAsesorList ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  noOptionsText="Tidak ada asesor ditemukan"
                />
              </Box>

              <Divider sx={{ my: 3 }} />
            </>
          )}

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
                      message:
                        "Username hanya boleh huruf, angka, dan underscore",
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
                    // pattern: {
                    //   value: /^https?:\/\/(wa\.me|chat\.whatsapp\.com)\/.+$/,
                    //   message: "Link WhatsApp tidak valid",
                    // },
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
                onClick={() => {
                  reset();
                  if (mode === "edit") {
                    setSelectedAsesorId(null);
                  }
                }}
                disabled={
                  createAsesorMutation.isPending ||
                  updateAsesorMutation.isPending
                }
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
                  opacity:
                    createAsesorMutation.isPending ||
                      updateAsesorMutation.isPending
                      ? 0.7
                      : 1,
                }}
                disabled={
                  createAsesorMutation.isPending ||
                  updateAsesorMutation.isPending ||
                  (mode === "edit" && !selectedAsesorId)
                }
              >
                {mode === "create"
                  ? createAsesorMutation.isPending
                    ? "Menyimpan..."
                    : "Simpan"
                  : updateAsesorMutation.isPending
                    ? "Mengupdate..."
                    : "Update"}
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
            {mode === "create"
              ? "Data asesor berhasil disimpan!"
              : "Data asesor berhasil diupdate!"}
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
            {mode === "create"
              ? createAsesorMutation.error instanceof Error
                ? createAsesorMutation.error.message
                : "Terjadi kesalahan saat menyimpan data"
              : updateAsesorMutation.error instanceof Error
                ? updateAsesorMutation.error.message
                : "Terjadi kesalahan saat mengupdate data"}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}
