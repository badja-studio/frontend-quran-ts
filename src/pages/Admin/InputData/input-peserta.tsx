"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import DashboardLayout from "../../../components/Dashboard/DashboardLayout";

interface FormState {
  no_akun: string;
  nip: string;
  nama: string;
  jk: string;
  tl: string;
  pegawai: string;
  jenjang: string;
  level: string;
  provinsi: string;
  kab_kota: string;
  sekolah: string;
  pendidikan: string;
  program_studi: string;
  perguruan_tinggi: string;
  jenis_pt: string;
  tahun_lulus: string;
}

export default function InputPesertaPage() {
  const emptyForm: FormState = {
    no_akun: "",
    nip: "",
    nama: "",
    jk: "",
    tl: "",
    pegawai: "",
    jenjang: "",
    level: "",
    provinsi: "",
    kab_kota: "",
    sekolah: "",
    pendidikan: "",
    program_studi: "",
    perguruan_tinggi: "",
    jenis_pt: "",
    tahun_lulus: "",
  };

  const [form, setForm] = useState<FormState>(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log("Data Peserta Tersimpan:", form);
  };

  const resetForm = () => setForm(emptyForm);

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
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Identitas Peserta
          </Typography>

          <Grid container spacing={2}>
            {["no_akun", "nip", "nama", "jk", "tl"].map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, " ")}
                  name={key}
                  value={(form as any)[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Profesi & Lokasi
          </Typography>

          <Grid container spacing={2}>
            {[
              "pegawai",
              "jenjang",
              "level",
              "provinsi",
              "kab_kota",
              "sekolah",
            ].map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, " ")}
                  name={key}
                  value={(form as any)[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Pendidikan
          </Typography>

          <Grid container spacing={2}>
            {[
              "pendidikan",
              "program_studi",
              "perguruan_tinggi",
              "jenis_pt",
              "tahun_lulus",
            ].map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, " ")}
                  name={key}
                  value={(form as any)[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Box mt={4} display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 5,
                py: 1.2,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Simpan
            </Button>

            <Button
              variant="outlined"
              onClick={resetForm}
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
        </Card>
      </Box>
    </DashboardLayout>
  );
}
