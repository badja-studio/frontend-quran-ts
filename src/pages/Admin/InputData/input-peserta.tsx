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
  MenuItem,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import apiClient from "../../../services/api.config";
import useUserStore from "../../../store/user.store";
import {
  Peserta,
  PesertaFormData,
  PesertaPage,
} from "./peserta/type";

const LIMIT = 10;

export default function InputPesertaPage() {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedPesertaId, setSelectedPesertaId] = useState<string | null>(
    null
  );

  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const [pesertaSearch, setPesertaSearch] = useState("");
  const [debouncedPesertaSearch, setDebouncedPesertaSearch] = useState("");
  const { user, fetchUser } = useUserStore();

  // Debounce search query for peserta
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPesertaSearch(pesertaSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [pesertaSearch]);

  // Fetch function for participants (peserta)
  const fetchPesertas = async (
    context: QueryFunctionContext<readonly unknown[], unknown>
  ): Promise<PesertaPage> => {
    const pageParam = (context.pageParam as number) ?? 1;
    const params = new URLSearchParams();
    params.append("page", String(pageParam));
    params.append("limit", String(LIMIT));
    if (debouncedPesertaSearch) params.append("search", debouncedPesertaSearch);

    const res = await apiClient.get(`/api/participants?${params.toString()}`);
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

  // Infinite query for participants (peserta)
  const {
    data: pesertasPages,
    fetchNextPage: fetchNextPesertaPage,
    hasNextPage: hasNextPesertaPage,
    isFetchingNextPage: isFetchingNextPesertaPage,
    isLoading: isLoadingPesertaList,
  } = useInfiniteQuery<PesertaPage, unknown, InfiniteData<PesertaPage>>({
    queryKey: ["pesertas-dropdown-update", debouncedPesertaSearch],
    queryFn: fetchPesertas,
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

  // Fetch peserta detail by ID
  const { data: pesertaDetail } = useQuery({
    queryKey: ["peserta-detail-update", selectedPesertaId],
    queryFn: async () => {
      if (!selectedPesertaId) return null;
      const res = await apiClient.get(`/api/participants/${selectedPesertaId}`);

      // Handle different response structures
      if (res.data?.data) {
        return res.data.data;
      }
      return res.data;
    },
    enabled: !!selectedPesertaId && mode === "edit",
  });

  // Flatten pages -> single array of pesertas
  const pesertas: Peserta[] = useMemo(() => {
    if (!pesertasPages?.pages) return [];
    const all = pesertasPages.pages.flatMap((p: PesertaPage) => p.data || []);
    const map = new Map<string, Peserta>();
    all.forEach((p: Peserta) => map.set(p.id, p));
    return Array.from(map.values());
  }, [pesertasPages]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PesertaFormData>({
    defaultValues: {
      no_akun: "",
      nip: "",
      nik: "",
      nama: "",
      jenis_kelamin: "L",
      tempat_lahir: "",
      tanggal_lahir: "",
      jabatan: "",
      pendidikan: "",
      prodi: "",
      perguruan_tinggi: "",
      asal_kampus: "",
      fakultas: "",
      tahun_lulus: 0,
      tingkat_sekolah: "",
      nama_sekolah: "",
      alamat_sekolah: "",
      provinsi: "",
      kab_kota: "",
      kecamatan: "",
      desa_kelurahan: "",
      status_pegawai: "",
      sertifikasi: "",
      tahun_sertifikasi: 0,
      password: "",
    },
  });

  // Auto-fill form when peserta detail is fetched (prioritize pesertaDetail over selectedPeserta)
  useEffect(() => {
    if (mode === "edit" && pesertaDetail) {
      const formData = {
        no_akun: pesertaDetail.no_akun || "",
        nip: pesertaDetail.nip || "",
        nik: pesertaDetail.nik || "",
        nama: pesertaDetail.nama || "",
        jenis_kelamin: (pesertaDetail.jenis_kelamin as "L" | "P") || "L",
        tempat_lahir: pesertaDetail.tempat_lahir || "",
        tanggal_lahir: pesertaDetail.tanggal_lahir || "",
        jabatan: pesertaDetail.jabatan || "",
        pendidikan: pesertaDetail.pendidikan || "",
        prodi: pesertaDetail.prodi || "",
        perguruan_tinggi: pesertaDetail.perguruan_tinggi || "",
        asal_kampus: pesertaDetail.asal_kampus || "",
        fakultas: pesertaDetail.fakultas || "",
        tahun_lulus: pesertaDetail.tahun_lulus || 0,
        tingkat_sekolah: pesertaDetail.tingkat_sekolah || "",
        nama_sekolah: pesertaDetail.nama_sekolah || "",
        alamat_sekolah: pesertaDetail.alamat_sekolah || "",
        provinsi: pesertaDetail.provinsi || "",
        kab_kota: pesertaDetail.kab_kota || "",
        kecamatan: pesertaDetail.kecamatan || "",
        desa_kelurahan: pesertaDetail.desa_kelurahan || "",
        status_pegawai: pesertaDetail.status_pegawai || "",
        sertifikasi: pesertaDetail.sertifikasi || "",
        tahun_sertifikasi: pesertaDetail.tahun_sertifikasi || 0,
        password: pesertaDetail.password || "",
      };

      reset(formData);
    }
  }, [pesertaDetail, mode, reset]);

  const createPesertaMutation = useMutation({
    mutationFn: async (data: PesertaFormData) => {
      const response = await apiClient.post("/api/participants", data);
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

  const updatePesertaMutation = useMutation({
    mutationFn: async (data: PesertaFormData) => {
      if (!selectedPesertaId) throw new Error("No peserta selected");
      const response = await apiClient.put(
        `/api/participants/${selectedPesertaId}`,
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

  const onSubmit = (data: PesertaFormData) => {
    if (mode === "edit") {
      updatePesertaMutation.mutate(data);
    } else {
      createPesertaMutation.mutate(data);
    }
  };

  const handleCloseSuccessNotif = () => {
    setShowSuccessNotif(false);
  };

  const handleCloseErrorNotif = () => {
    setShowErrorNotif(false);
  };

  useEffect(() => {
    fetchUser();
  }, [user, fetchUser]);

  return (
    <DashboardLayout
      userRole="admin"
      userName={`${user?.name}`}
      userEmail={`${user?.email}`}
    >
      <Box
        p={4}
        sx={{
          background: "#f5f6fa",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight="700" mb={3}>
          {mode === "create" ? "Input Data Peserta" : "Edit Data Peserta"}
        </Typography>

        <Card
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
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
                    setSelectedPesertaId(null);
                    reset({
                      no_akun: "",
                      nip: "",
                      nik: "",
                      nama: "",
                      jenis_kelamin: "L",
                      tempat_lahir: "",
                      tanggal_lahir: "",
                      jabatan: "",
                      pendidikan: "",
                      prodi: "",
                      perguruan_tinggi: "",
                      asal_kampus: "",
                      fakultas: "",
                      tahun_lulus: 0,
                      tingkat_sekolah: "",
                      nama_sekolah: "",
                      alamat_sekolah: "",
                      provinsi: "",
                      kab_kota: "",
                      kecamatan: "",
                      desa_kelurahan: "",
                      status_pegawai: "",
                      sertifikasi: "",
                      tahun_sertifikasi: 0,
                      password: "",
                    });
                  }}
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Create - Tambah Peserta Baru
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant={mode === "edit" ? "contained" : "outlined"}
                  onClick={() => {
                    setMode("edit");
                    setSelectedPesertaId(null);
                    reset({
                      no_akun: "",
                      nip: "",
                      nik: "",
                      nama: "",
                      jenis_kelamin: "L",
                      tempat_lahir: "",
                      tanggal_lahir: "",
                      jabatan: "",
                      pendidikan: "",
                      prodi: "",
                      perguruan_tinggi: "",
                      asal_kampus: "",
                      fakultas: "",
                      tahun_lulus: 0,
                      tingkat_sekolah: "",
                      nama_sekolah: "",
                      alamat_sekolah: "",
                      provinsi: "",
                      kab_kota: "",
                      kecamatan: "",
                      desa_kelurahan: "",
                      status_pegawai: "",
                      sertifikasi: "",
                      tahun_sertifikasi: 0,
                      password: "",
                    });
                  }}
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Edit - Update Data Peserta
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Dropdown Pilih Peserta (only in edit mode) */}
          {mode === "edit" && (
            <>
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Pilih Peserta
                </Typography>
                <Autocomplete
                  options={pesertas}
                  getOptionLabel={(option) => option.nama}
                  value={
                    pesertas.find((p) => p.id === selectedPesertaId) || null
                  }
                  onChange={(_, newValue) => {
                    console.log("Selected peserta:", newValue);
                    setSelectedPesertaId(newValue?.id || null);
                  }}
                  onInputChange={(_, newInputValue) => {
                    setPesertaSearch(newInputValue);
                  }}
                  loading={isLoadingPesertaList}
                  ListboxProps={{
                    onScroll: (
                      event: React.SyntheticEvent<HTMLUListElement>
                    ) => {
                      const listboxNode = event.currentTarget as HTMLElement;
                      if (
                        listboxNode.scrollTop + listboxNode.clientHeight >=
                          listboxNode.scrollHeight - 1 &&
                        hasNextPesertaPage &&
                        !isFetchingNextPesertaPage
                      ) {
                        fetchNextPesertaPage();
                      }
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cari Peserta"
                      placeholder="Ketik nama peserta..."
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingPesertaList ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  noOptionsText="Tidak ada peserta ditemukan"
                />
              </Box>

              <Divider sx={{ my: 3 }} />
            </>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Identitas Peserta */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Identitas Peserta
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="no_akun"
                  control={control}
                  rules={{ required: "No Akun wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="No Akun"
                      required
                      error={!!errors.no_akun}
                      helperText={errors.no_akun?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="nip"
                  control={control}
                  rules={{ required: "NIP wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="NIP"
                      required
                      error={!!errors.nip}
                      helperText={errors.nip?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="nik"
                  control={control}
                  rules={{ required: "NIK wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="NIK"
                      required
                      error={!!errors.nik}
                      helperText={errors.nik?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="nama"
                  control={control}
                  rules={{
                    required: "Nama wajib diisi",
                    minLength: { value: 3, message: "Nama minimal 3 karakter" },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nama Lengkap"
                      required
                      error={!!errors.nama}
                      helperText={errors.nama?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="tanggal_lahir"
                  control={control}
                  rules={{ required: "Tanggal Lahir wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tanggal Lahir"
                      required
                      type="date"
                      error={!!errors.tanggal_lahir}
                      helperText={errors.tanggal_lahir?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="jenis_kelamin"
                  control={control}
                  rules={{ required: "Jenis kelamin wajib dipilih" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Jenis Kelamin"
                      required
                      error={!!errors.jenis_kelamin}
                      helperText={errors.jenis_kelamin?.message}
                    >
                      <MenuItem value="L">Laki-laki</MenuItem>
                      <MenuItem value="P">Perempuan</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="tempat_lahir"
                  control={control}
                  rules={{ required: "Tempat lahir wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tempat Lahir"
                      required
                      error={!!errors.tempat_lahir}
                      helperText={errors.tempat_lahir?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Profesi & Lokasi */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Profesi & Lokasi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="provinsi"
                  control={control}
                  rules={{ required: "Provinsi wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Provinsi"
                      required
                      error={!!errors.provinsi}
                      helperText={errors.provinsi?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="kab_kota"
                  control={control}
                  rules={{ required: "Kab/Kota wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Kab/Kota"
                      required
                      error={!!errors.kab_kota}
                      helperText={errors.kab_kota?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="kecamatan"
                  control={control}
                  rules={{ required: "Kecamatan wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Kecamatan"
                      required
                      error={!!errors.kecamatan}
                      helperText={errors.kecamatan?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="desa_kelurahan"
                  control={control}
                  rules={{ required: "Desa/Kelurahan wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Desa/Kelurahan"
                      required
                      error={!!errors.desa_kelurahan}
                      helperText={errors.desa_kelurahan?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="jabatan"
                  control={control}
                  rules={{ required: "Jabatan wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Jabatan"
                      required
                      error={!!errors.jabatan}
                      helperText={errors.jabatan?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="status_pegawai"
                  control={control}
                  rules={{ required: "Status Pegawai wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Status Pegawai"
                      required
                      error={!!errors.status_pegawai}
                      helperText={errors.status_pegawai?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="sertifikasi"
                  control={control}
                  rules={{ required: "sertifikasi wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Sertifikasi"
                      required
                      error={!!errors.sertifikasi}
                      helperText={errors.sertifikasi?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="tahun_sertifikasi"
                  control={control}
                  rules={{ required: "Tahun Sertifikasi wajib diisi" }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tahun Sertifikasi"
                      required
                      type="number"
                      value={value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val ? parseInt(val, 10) : 0);
                      }}
                      error={!!errors.tahun_sertifikasi}
                      helperText={errors.tahun_sertifikasi?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Pendidikan */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Pendidikan
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="pendidikan"
                  control={control}
                  rules={{ required: "Pendidikan wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Pendidikan Terakhir"
                      required
                      error={!!errors.pendidikan}
                      helperText={errors.pendidikan?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="perguruan_tinggi"
                  control={control}
                  rules={{ required: "Perguruan Tinggi wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Perguruan Tinggi"
                      required
                      error={!!errors.perguruan_tinggi}
                      helperText={errors.perguruan_tinggi?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="asal_kampus"
                  control={control}
                  rules={{ required: "Asal Kampus wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Asal Kampus"
                      required
                      error={!!errors.asal_kampus}
                      helperText={errors.asal_kampus?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="fakultas"
                  control={control}
                  rules={{ required: "Fakultas wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Fakultas"
                      required
                      error={!!errors.fakultas}
                      helperText={errors.fakultas?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="prodi"
                  control={control}
                  rules={{ required: "Program Studi wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Program Studi"
                      required
                      error={!!errors.prodi}
                      helperText={errors.prodi?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="tingkat_sekolah"
                  control={control}
                  rules={{ required: "Tingkat Sekolah wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tingkat Sekolah"
                      required
                      error={!!errors.tingkat_sekolah}
                      helperText={errors.tingkat_sekolah?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="nama_sekolah"
                  control={control}
                  rules={{ required: "Nama Sekolah wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nama Sekolah"
                      required
                      error={!!errors.nama_sekolah}
                      helperText={errors.nama_sekolah?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="alamat_sekolah"
                  control={control}
                  rules={{ required: "Alamat Sekolah wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Alamat Sekolah"
                      required
                      error={!!errors.alamat_sekolah}
                      helperText={errors.alamat_sekolah?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="tahun_lulus"
                  control={control}
                  rules={{
                    required: "Tahun lulus wajib diisi",
                    min: { value: 1950, message: "Tahun lulus minimal 1950" },
                    max: {
                      value: new Date().getFullYear(),
                      message: `Tahun lulus maksimal ${new Date().getFullYear()}`,
                    },
                  }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tahun Lulus"
                      required
                      type="number"
                      value={value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val ? parseInt(val, 10) : 0);
                      }}
                      error={!!errors.tahun_lulus}
                      helperText={errors.tahun_lulus?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password wajib diisi", minLength: { value: 6, message: "Password minimal 6 karakter" } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      required
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  createPesertaMutation.isPending ||
                  updatePesertaMutation.isPending ||
                  (mode === "edit" && !selectedPesertaId)
                }
                sx={{
                  px: 5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  opacity:
                    createPesertaMutation.isPending ||
                    updatePesertaMutation.isPending
                      ? 0.7
                      : 1,
                }}
              >
                {mode === "create"
                  ? createPesertaMutation.isPending
                    ? "Menyimpan..."
                    : "Simpan"
                  : updatePesertaMutation.isPending
                  ? "Mengupdate..."
                  : "Update"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  reset();
                  if (mode === "edit") {
                    setSelectedPesertaId(null);
                  }
                }}
                disabled={
                  createPesertaMutation.isPending ||
                  updatePesertaMutation.isPending
                }
                sx={{
                  px: 5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Reset
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
              ? "Data peserta berhasil disimpan!"
              : "Data peserta berhasil diupdate!"}
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
              ? createPesertaMutation.error instanceof Error
                ? createPesertaMutation.error.message
                : "Terjadi kesalahan saat menyimpan data"
              : updatePesertaMutation.error instanceof Error
              ? updatePesertaMutation.error.message
              : "Terjadi kesalahan saat mengupdate data"}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}
