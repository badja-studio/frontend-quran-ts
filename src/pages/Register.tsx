import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  MenuItem,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import apiClient, { handleApiError } from "../services/api.config";
import InfiniteSelect from "../components/Register/InfiniteSelect";
import InfiniteAsesorSelect from "../components/Register/InfiniteAsesorSelect";
import {
  RegisterForm,
  RegisterPayload,
  Asesor,
} from "../components/Register/types";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const { control, handleSubmit, watch } = useForm<RegisterForm>({
    defaultValues: {
      no_akun: "",
      nip: "",
      nik: "",
      nama: "",
      email: "",
      no_handphone: "",
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
      sekolah: "",
      alamat_sekolah: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      status_pegawai: "",
      sertifikasi: "",
      tahun_sertifikasi: 0,
      password: "",
      asesor_id: "",
      jadwal: "",
      level: "",
    },
  });
  const sertifikasiValue = watch("sertifikasi");
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
  const [asesorObj, setAsesorObj] = useState<Asesor | null>(null);

  // Mutation register
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await apiClient.post("/api/participants/register", payload);

      return res.data;
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
      navigate("/");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: RegisterForm) => {
    // Buat data yang aman untuk di-log
    const safeLog = { ...data };
    safeLog.password = "*** HIDDEN ***";

    registerMutation.mutate(data);
  };

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
            {/* NIK */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nik"
                control={control}
                rules={{ required: "NIK wajib diisi" }}
                render={({ field }) => (
                  <TextField label="NIK" fullWidth required {...field} />
                )}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password wajib diisi",
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Nama */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nama"
                control={control}
                rules={{ required: "Nama Lengkap wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Nama Lengkap"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Email */}
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
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* No Phone */}
            <Grid item xs={12} md={6}>
              <Controller
                name="no_handphone"
                control={control}
                rules={{
                  required: "No Telepon wajib diisi",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Format nomor telepon tidak valid",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="No Telepon"
                    type="tel"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Tempat Lahir */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tempat_lahir"
                control={control}
                rules={{ required: "Tempat Lahir wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Tempat Lahir"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Tanggal Lahir */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tanggal_lahir"
                control={control}
                rules={{ required: "Tanggal Lahir wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Tanggal Lahir"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Jenis Kelamin */}
            <Grid item xs={12} md={6}>
              <Controller
                name="jenis_kelamin"
                control={control}
                rules={{ required: "Jenis Kelamin wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Jenis Kelamin"
                    select
                    fullWidth
                    required
                    {...field}
                  >
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
                rules={{ required: "Pendidikan Terakhir wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Pendidikan Terakhir"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Perguruan Tinggi */}
            <Grid item xs={12} md={6}>
              <Controller
                name="perguruan_tinggi"
                control={control}
                rules={{ required: "Perguruan Tinggi wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Perguruan Tinggi"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Asal Kampus */}
            {/* <Grid item xs={12} md={6}>
              <Controller
                name="asal_kampus"
                control={control}
                rules={{ required: "Asal Kampus wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Asal Kampus"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid> */}

            {/* Fakultas */}
            <Grid item xs={12} md={6}>
              <Controller
                name="fakultas"
                control={control}
                rules={{ required: "Fakultas wajib diisi" }}
                render={({ field }) => (
                  <TextField label="Fakultas" fullWidth required {...field} />
                )}
              />
            </Grid>

            {/* Prodi */}
            <Grid item xs={12} md={6}>
              <Controller
                name="prodi"
                control={control}
                rules={{ required: "Program Studi wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Program Studi"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Tahun Lulus */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tahun_lulus"
                control={control}
                rules={{ required: "Tahun Lulus wajib diisi" }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    label="Tahun Lulus"
                    fullWidth
                    required
                    type="number"
                    value={value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(val ? parseInt(val, 10) : 0);
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Tingkat */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tingkat_sekolah"
                control={control}
                rules={{ required: "Tingkatan Sekolah wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Tingkatan Sekolah"
                    select
                    fullWidth
                    required
                    {...field}
                  >
                    {["MI", "MTs", "MA"].map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="level"
                control={control}
                rules={{ required: "Mata Pelajaran wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Mata Pelajaran"
                    select
                    fullWidth
                    required
                    {...field}
                  >
                    {[
                      { label: "Al-Qur'an Hadis", value: "Al-Qur'an Hadis" },
                      { label: "Akidah Akhlak", value: "Akidah Akhlak" },
                      { label: "Fiqih", value: "Fiqih" },
                      {
                        label: "Sejarah Kebudayaan Islam (SKI)",
                        value: "Sejarah Kebudayaan Islam (SKI)",
                      },
                      { label: "Bahasa Arab", value: "Bahasa Arab" },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
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
                rules={{ required: "Nama Sekolah wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Nama Sekolah"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Alamat Sekolah */}
            <Grid item xs={12}>
              <Controller
                name="alamat_sekolah"
                control={control}
                rules={{ required: "Alamat Sekolah wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Alamat Sekolah"
                    fullWidth
                    required
                    multiline
                    rows={2}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Pilihan Wilayah */}
            <Grid item xs={12} md={6}>
              <Controller
                name="provinsi"
                control={control}
                rules={{ required: "Provinsi wajib diisi" }}
                render={({ field }) => (
                  <InfiniteSelect
                    label="Provinsi"
                    url="/api/master/provinces"
                    value={provinsiObj}
                    required
                    onChange={(v) => {
                      setProvinsiObj(v);
                      setKabupatenObj(null);
                      setKecamatanObj(null);
                      setDesaObj(null);
                      field.onChange(v?.nama ?? "");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="kota"
                control={control}
                rules={{ required: "Kota / Kabupaten wajib diisi" }}
                render={({ field }) => (
                  <InfiniteSelect
                    label="Kota / Kabupaten"
                    url={
                      provinsiObj
                        ? `/api/master/provinces/${provinsiObj.id}/cities`
                        : ""
                    }
                    value={kabupatenObj}
                    disabled={!provinsiObj}
                    required
                    onChange={(v) => {
                      setKabupatenObj(v);
                      setKecamatanObj(null);
                      setDesaObj(null);
                      field.onChange(v?.nama ?? "");
                    }}
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
                  <InfiniteSelect
                    label="Kecamatan"
                    url={
                      kabupatenObj
                        ? `/api/master/cities/${kabupatenObj.id}/districts`
                        : ""
                    }
                    value={kecamatanObj}
                    disabled={!kabupatenObj}
                    required
                    onChange={(v) => {
                      setKecamatanObj(v);
                      setDesaObj(null);
                      field.onChange(v?.nama ?? "");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="kelurahan"
                control={control}
                rules={{ required: "Desa / Kelurahan wajib diisi" }}
                render={({ field }) => (
                  <InfiniteSelect
                    label="Desa / Kelurahan"
                    url={
                      kecamatanObj
                        ? `/api/master/districts/${kecamatanObj.id}/villages`
                        : ""
                    }
                    value={desaObj}
                    disabled={!kecamatanObj}
                    required
                    onChange={(v) => {
                      setDesaObj(v);
                      field.onChange(v?.nama ?? "");
                    }}
                  />
                )}
              />
            </Grid>

            {/* Jabatan */}
            {/* <Grid item xs={12} md={6}>
              <Controller
                name="jabatan"
                control={control}
                rules={{ required: "Jabatan wajib diisi" }}
                render={({ field }) => (
                  <TextField label="Jabatan" fullWidth required {...field} />
                )}
              />
            </Grid> */}

            {/* Status Pegawai */}
            <Grid item xs={12} md={6}>
              <Controller
                name="status_pegawai"
                control={control}
                rules={{ required: "Status Pegawai wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Status Pegawai"
                    select
                    fullWidth
                    required
                    {...field}
                  >
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
                rules={{ required: "Sertifikasi wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Sertifikasi"
                    select
                    fullWidth
                    required
                    {...field}
                  >
                    <MenuItem value="Sudah">Sudah</MenuItem>
                    <MenuItem value="Belum">Belum</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {sertifikasiValue === "Sudah" && (
              <Grid item xs={12} md={6}>
                <Controller
                  name="tahun_sertifikasi"
                  control={control}
                  rules={{ required: "Tahun Sertifikasi wajib diisi" }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <TextField
                      label="Tahun Sertifikasi"
                      fullWidth
                      required
                      type="number"
                      value={value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val ? parseInt(val, 10) : 0);
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            )}

            {/* Asesor */}
            <Grid item xs={12} md={6}>
              <Controller
                name="asesor_id"
                control={control}
                rules={{ required: "Asesor wajib dipilih" }}
                render={({ field }) => (
                  <InfiniteAsesorSelect
                    label="Pilih Asesor"
                    value={asesorObj}
                    required
                    onChange={(v) => {
                      setAsesorObj(v);
                      field.onChange(v?.id ?? "");
                    }}
                  />
                )}
              />
            </Grid>
            {/* Jadwal */}
            <Grid item xs={12} md={6}>
              <Controller
                name="jadwal"
                control={control}
                rules={{ required: "Jadwal wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    label="Jadwal"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: "2025-12-06", // mulai tanggal 6 Desember
                      max: "2025-12-31", // sampai tanggal 31 Desember
                    }}
                    {...field}
                  />
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

            <Grid item xs={12} mt={2}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Sudah punya akun?{" "}
                  <Button
                    variant="text"
                    onClick={() => navigate("/")}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Login di sini
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
