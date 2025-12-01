import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  Grid,
  MenuItem,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  Autocomplete,
} from "@mui/material";
import {
  useMutation,
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import apiClient, { api, handleApiError } from "../services/api.config";
import InfiniteSelect from "../components/Register/InfiniteSelect";

interface Asesor {
  id: string;
  name: string;
}

type AssessorPage = {
  data: Asesor[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

interface RegisterForm {
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: "L" | "P" | "";
  pendidikan: string;
  kampus: string;
  fakultas: string;
  prodi: string;
  tahunLulus: string;
  tingkat: string;
  sekolah: string;
  alamatSekolah: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  statusPegawai: string;
  sertifikasi: "Sudah" | "Belum" | "";
  tahunSertifikasi: string;
  email: string;
  whatsapp: string;
  mapel:
    | "Al-Qur'an Hadis"
    | "Akidah Akhlak"
    | "Fiqih"
    | "Sejarah Kebudayaan Islam (SKI)"
    | "Bahasa Arab"
    | "";
  asesor: string;
  jadwal: string;
  username: string;
}

const LIMIT = 10;
const jadwalDesember = Array.from({ length: 26 }, (_, i) => 6 + i).map(
  (d) => `2025-12-${String(d).padStart(2, "0")}`
);

export default function Register() {
  const { control, handleSubmit, setValue } = useForm<RegisterForm>({
    defaultValues: {
      nik: "",
      nama: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      pendidikan: "",
      kampus: "",
      fakultas: "",
      prodi: "",
      tahunLulus: "",
      tingkat: "",
      sekolah: "",
      alamatSekolah: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      desa: "",
      statusPegawai: "",
      sertifikasi: "",
      tahunSertifikasi: "",
      email: "",
      whatsapp: "",
      mapel: "",
      asesor: "",
      jadwal: "",
      username: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // Pilihan wilayah
  const [provinsiObj, setProvinsiObj] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  const [kabupatenObj, setKabupatenObj] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  const [kecamatanObj, setKecamatanObj] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  const [desaObj, setDesaObj] = useState<{ id: number; nama: string } | null>(
    null
  );

  // Asesor search
  const [asesorSearch, setAsesorSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(asesorSearch), 500);
    return () => clearTimeout(timer);
  }, [asesorSearch]);

  const fetchAsesors = async (
    context: QueryFunctionContext<readonly unknown[], unknown>
  ): Promise<AssessorPage> => {
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
  } = useInfiniteQuery<AssessorPage, unknown, InfiniteData<AssessorPage>>({
    queryKey: ["asesors-dropdown-update", debouncedSearch],
    queryFn: fetchAsesors,
    initialPageParam: 1,
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

  // Flatten pages -> single array of asesors
  const asesors: Asesor[] = useMemo(() => {
    if (!asesorsPages?.pages) return [];
    const all = asesorsPages.pages.flatMap((p: AssessorPage) => p.data || []);
    const map = new Map<string, Asesor>();
    all.forEach((a: Asesor) => map.set(a.id, a));
    return Array.from(map.values());
  }, [asesorsPages]);

  // Mutation register
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterForm) => {
      const res = await api.post("/api/auth/register", payload);
      return res.data as RegisterForm;
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
      setSuccess(false);
    },
    onError: (err) => {
      setError(handleApiError(err).message);
    },
    onSuccess: (data) => {
      setSuccess(true);
      alert(`Registrasi berhasil: ${data.nama}`);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: RegisterForm) => registerMutation.mutate(data);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 5,
      }}
    >
      <Paper sx={{ p: 4, width: "95%", maxWidth: 900 }}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Form Registrasi
        </Typography>

        {error && (
          <Alert severity="error">Terjadi kesalahan saat menyimpan data.</Alert>
        )}
        {success && <Alert severity="success">Registrasi berhasil!</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12} md={6}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField label="Username" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField label="Email" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* WhatsApp */}
            <Grid item xs={12} md={6}>
              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <TextField label="WhatsApp" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* NIK */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nik"
                control={control}
                render={({ field }) => (
                  <TextField label="NIK" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Nama */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nama"
                control={control}
                render={({ field }) => (
                  <TextField label="Nama Lengkap" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Tempat Lahir */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tempatLahir"
                control={control}
                render={({ field }) => (
                  <TextField label="Tempat Lahir" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Tanggal Lahir */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tanggalLahir"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Tanggal Lahir"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Jenis Kelamin */}
            <Grid item xs={12} md={6}>
              <Controller
                name="jenisKelamin"
                control={control}
                render={({ field }) => (
                  <TextField label="Jenis Kelamin" select fullWidth {...field}>
                    <MenuItem value="L">Laki-laki</MenuItem>
                    <MenuItem value="P">Perempuan</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* Pendidikan */}
            <Grid item xs={12} md={6}>
              <Controller
                name="pendidikan"
                control={control}
                render={({ field }) => (
                  <TextField label="Pendidikan Terakhir" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Kampus */}
            <Grid item xs={12} md={6}>
              <Controller
                name="kampus"
                control={control}
                render={({ field }) => (
                  <TextField label="Asal Kampus" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Fakultas */}
            <Grid item xs={12} md={6}>
              <Controller
                name="fakultas"
                control={control}
                render={({ field }) => (
                  <TextField label="Fakultas" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Prodi */}
            <Grid item xs={12} md={6}>
              <Controller
                name="prodi"
                control={control}
                render={({ field }) => (
                  <TextField label="Program Studi" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Tahun Lulus */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tahunLulus"
                control={control}
                render={({ field }) => (
                  <TextField label="Tahun Lulus" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Tingkat */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tingkat"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Tingkatan Sekolah"
                    select
                    fullWidth
                    {...field}
                  >
                    {["MI", "MTS", "MA"].map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Sekolah */}
            <Grid item xs={12} md={6}>
              <Controller
                name="sekolah"
                control={control}
                render={({ field }) => (
                  <TextField label="Nama Sekolah" fullWidth {...field} />
                )}
              />
            </Grid>

            {/* Alamat Sekolah */}
            <Grid item xs={12}>
              <Controller
                name="alamatSekolah"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Alamat Sekolah"
                    fullWidth
                    multiline
                    rows={2}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Pilihan Wilayah */}
            <Grid item xs={12} md={6}>
              <InfiniteSelect
                label="Provinsi"
                url="/api/master/provinces"
                value={provinsiObj}
                onChange={(v) => {
                  setProvinsiObj(v);
                  setKabupatenObj(null);
                  setKecamatanObj(null);
                  setDesaObj(null);
                  setValue("provinsi", v?.nama ?? "");
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InfiniteSelect
                label="Kota / Kabupaten"
                url={
                  provinsiObj
                    ? `/api/master/provinces/${provinsiObj.id}/cities`
                    : ""
                }
                value={kabupatenObj}
                disabled={!provinsiObj}
                onChange={(v) => {
                  setKabupatenObj(v);
                  setKecamatanObj(null);
                  setDesaObj(null);
                  setValue("kabupaten", v?.nama ?? "");
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InfiniteSelect
                label="Kecamatan"
                url={
                  kabupatenObj
                    ? `/api/master/cities/${kabupatenObj.id}/districts`
                    : ""
                }
                value={kecamatanObj}
                disabled={!kabupatenObj}
                onChange={(v) => {
                  setKecamatanObj(v);
                  setDesaObj(null);
                  setValue("kecamatan", v?.nama ?? "");
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InfiniteSelect
                label="Desa / Kelurahan"
                url={
                  kecamatanObj
                    ? `/api/master/districts/${kecamatanObj.id}/villages`
                    : ""
                }
                value={desaObj}
                disabled={!kecamatanObj}
                onChange={(v) => setValue("desa", v?.nama ?? "")}
              />
            </Grid>

            {/* Status Pegawai */}
            <Grid item xs={12} md={6}>
              <Controller
                name="statusPegawai"
                control={control}
                render={({ field }) => (
                  <TextField label="Status Pegawai" select fullWidth {...field}>
                    {["PNS", "PPPK", "Non PNS"].map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Sertifikasi */}
            <Grid item xs={12} md={6}>
              <Controller
                name="sertifikasi"
                control={control}
                render={({ field }) => (
                  <TextField label="Sertifikasi" select fullWidth {...field}>
                    <MenuItem value="Sudah">Sudah</MenuItem>
                    <MenuItem value="Belum">Belum</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {control._formValues.sertifikasi === "Sudah" && (
              <Grid item xs={12} md={6}>
                <Controller
                  name="tahunSertifikasi"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Tahun Sertifikasi" fullWidth {...field} />
                  )}
                />
              </Grid>
            )}

            {/* Mapel */}
            <Grid item xs={12} md={6}>
              <Controller
                name="mapel"
                control={control}
                render={({ field }) => (
                  <TextField label="Mata Pelajaran" select fullWidth {...field}>
                    {[
                      "Al-Qur'an Hadis",
                      "Akidah Akhlak",
                      "Fiqih",
                      "Sejarah Kebudayaan Islam (SKI)",
                      "Bahasa Arab",
                    ].map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Asesor */}
            <Grid item xs={12} md={6}>
              <Controller
                name="asesor"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={asesors}
                    getOptionLabel={(option) => option?.name || ""}
                    value={asesors.find((a) => a.id === field.value) || null}
                    onChange={(_, newValue) =>
                      field.onChange(newValue?.id || "")
                    }
                    onInputChange={(_, newInputValue) =>
                      setAsesorSearch(newInputValue)
                    }
                    ListboxProps={{
                      onScroll: (
                        event: React.SyntheticEvent<HTMLUListElement>
                      ) => {
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
                        label="Pilih Asesor"
                        placeholder="Ketik nama asesor..."
                      />
                    )}
                    noOptionsText="Tidak ada asesor ditemukan"
                  />
                )}
              />
            </Grid>

            {/* Jadwal */}
            <Grid item xs={12} md={6}>
              <Controller
                name="jadwal"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Pilih Jadwal Asesmen"
                    fullWidth
                    {...field}
                  >
                    {jadwalDesember.map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
