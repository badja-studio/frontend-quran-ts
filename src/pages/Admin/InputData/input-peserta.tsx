"use client";
import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useMutation,
  useInfiniteQuery,
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
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import apiClient from "../../../services/api.config";

interface Asesor {
  id: string;
  name: string;
  email: string;
}

// Tambahkan tipe response halaman assessor
type AssessorPage = {
  data: Asesor[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

interface PesertaFormData {
  no_akun: string;
  nip: string;
  nama: string;
  jenis_kelamin: "L" | "P";
  tempat_lahir: string;
  jabatan: string;
  jenjang: string;
  level: string;
  provinsi: string;
  kab_kota: string;
  sekolah: string;
  pendidikan: string;
  prodi: string;
  perguruan_tinggi: string;
  jenis_pt: string;
  tahun_lulus: number;
  jadwal: string;
  akun_id: number;
  asesor_id?: string | null;
  usia?: number;
  pegawai: string;
}

const LIMIT = 10;

export default function InputPesertaPage() {
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const [asesorSearch, setAsesorSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(asesorSearch);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [asesorSearch]);

  // normalizing fetch function supaya aman terhadap berbagai format response
  // terima context sebagai any agar cocok dengan signature queryFn react-query
  const fetchAssesors = async (
    context: QueryFunctionContext<readonly unknown[], unknown>
  ): Promise<AssessorPage> => {
    const pageParam = (context.pageParam as number) ?? 1;
    const params = new URLSearchParams();
    params.append("page", String(pageParam));
    params.append("limit", String(LIMIT));
    if (debouncedSearch) params.append("search", debouncedSearch);

    const res = await apiClient.get(`/api/assessors?${params.toString()}`);
    const payload = res.data;

    // jika backend langsung mengembalikan array
    if (Array.isArray(payload)) {
      return {
        data: payload,
        page: pageParam,
        hasMore: payload.length === LIMIT,
      };
    }

    // jika backend sudah mengembalikan objek paging
    return {
      data: payload.data ?? [],
      page: payload.page ?? pageParam,
      totalPages: payload.totalPages,
      hasMore:
        typeof payload.hasMore === "boolean" ? payload.hasMore : undefined,
    };
  };

  // gunakan object-style overload agar cocok dengan versi @tanstack/react-query yang terpakai
  const {
    data: asesorsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<AssessorPage, unknown, InfiniteData<AssessorPage>>({
    queryKey: ["asesors", debouncedSearch],
    queryFn: fetchAssesors,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // gunakan page dari lastPage atau jumlah pages sebagai fallback
      const current = lastPage.page ?? pages.length ?? 1;

      if (typeof lastPage.totalPages === "number") {
        return current < lastPage.totalPages ? current + 1 : undefined;
      }
      if (typeof lastPage.hasMore === "boolean") {
        return lastPage.hasMore ? current + 1 : undefined;
      }
      // fallback: jika jumlah item == LIMIT kemungkinan ada halaman berikutnya
      return (lastPage.data?.length ?? 0) === LIMIT ? current + 1 : undefined;
    },
  });

  // Flatten pages -> single array of asesors
  const asesors: Asesor[] = useMemo(() => {
    if (!asesorsPages?.pages) return [];
    // dedupe by id just in case
    const all = asesorsPages.pages.flatMap((p: AssessorPage) => p.data || []);
    const map = new Map<string, Asesor>();
    all.forEach((a: Asesor) => map.set(a.id, a));
    return Array.from(map.values());
  }, [asesorsPages]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PesertaFormData>({
    defaultValues: {
      no_akun: "",
      nip: "",
      nama: "",
      jenis_kelamin: "L",
      tempat_lahir: "",
      jabatan: "",
      jenjang: "",
      level: "",
      provinsi: "",
      kab_kota: "",
      sekolah: "",
      pendidikan: "",
      prodi: "",
      perguruan_tinggi: "",
      jenis_pt: "",
      tahun_lulus: 0,
      jadwal: new Date().toISOString(),
      asesor_id: null,
    },
  });

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

  const onSubmit = (data: PesertaFormData) => {
    createPesertaMutation.mutate(data);
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
          background: "#f5f6fa",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight="700" mb={3}>
          Input Data Peserta
        </Typography>

        <Card
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
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
                  name="usia"
                  control={control}
                  rules={{
                    required: "Usia wajib diisi",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Usia"
                      required
                      type="number"
                      error={!!errors.usia}
                      helperText={errors.usia?.message}
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
                  name="pegawai"
                  control={control}
                  rules={{
                    required: "Pegawai wajib diisi",
                    minLength: {
                      value: 3,
                      message: "Pegawai minimal 3 karakter",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Pegawai"
                      required
                      error={!!errors.pegawai}
                      helperText={errors.pegawai?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="jenjang"
                  control={control}
                  rules={{ required: "Jenjang wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Jenjang"
                      required
                      error={!!errors.jenjang}
                      helperText={errors.jenjang?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: "Level wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Level"
                      required
                      error={!!errors.level}
                      helperText={errors.level?.message}
                    />
                  )}
                />
              </Grid>

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
                  name="sekolah"
                  control={control}
                  rules={{ required: "Sekolah wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Sekolah"
                      required
                      error={!!errors.sekolah}
                      helperText={errors.sekolah?.message}
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
                      label="Pendidikan"
                      required
                      error={!!errors.pendidikan}
                      helperText={errors.pendidikan?.message}
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
                  name="jenis_pt"
                  control={control}
                  rules={{ required: "Jenis PT wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Jenis PT"
                      required
                      error={!!errors.jenis_pt}
                      helperText={errors.jenis_pt?.message}
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
                  name="jadwal"
                  control={control}
                  rules={{ required: "Jadwal wajib diisi" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Jadwal"
                      required
                      type="date"
                      error={!!errors.jadwal}
                      helperText={errors.jadwal?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="asesor_id"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={asesors}
                      getOptionLabel={(option) => option?.name || ""}
                      value={asesors.find((a) => a.id === value) || null}
                      onChange={(_, newValue) => {
                        onChange(newValue?.id || null);
                      }}
                      onInputChange={(_, newInputValue) => {
                        setAsesorSearch(newInputValue);
                      }}
                      ListboxProps={{
                        onScroll: (
                          event: React.SyntheticEvent<HTMLUListElement>
                        ) => {
                          const listboxNode =
                            event.currentTarget as HTMLElement;
                          // when scrolled to bottom, try to fetch next page
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
                          label="Pilih Asesor"
                          placeholder="Ketik nama asesor..."
                          error={!!errors.asesor_id}
                          helperText={errors.asesor_id?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                      noOptionsText="Tidak ada asesor ditemukan"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={createPesertaMutation.isPending}
                sx={{
                  px: 5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  opacity: createPesertaMutation.isPending ? 0.7 : 1,
                }}
              >
                {createPesertaMutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                disabled={createPesertaMutation.isPending}
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
            Data peserta berhasil disimpan!
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
            {createPesertaMutation.error instanceof Error
              ? createPesertaMutation.error.message
              : "Terjadi kesalahan saat menyimpan data"}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}
