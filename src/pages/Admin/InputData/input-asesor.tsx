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
  nama: string;
  username: string;
  no_telp: string;
  email: string;
  link_wa: string;
}

export default function InputAsesorPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    nama: "",
    username: "",
    no_telp: "",
    email: "",
    link_wa: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      console.log("Data Asesor:", form);

      alert("Data asesor berhasil disimpan!");

      // Reset form
      setForm({
        nama: "",
        username: "",
        no_telp: "",
        email: "",
        link_wa: "",
      });

      setLoading(false);
    }, 700);
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

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nama Lengkap"
                fullWidth
                name="nama"
                value={form.nama}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                fullWidth
                name="username"
                value={form.username}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="No Telepon"
                fullWidth
                name="no_telp"
                value={form.no_telp}
                onChange={handleChange}
                type="number"
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Link WhatsApp"
                fullWidth
                name="link_wa"
                value={form.link_wa}
                onChange={handleChange}
                placeholder="https://wa.me/628xxxxxxx"
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 2, height: 52 },
                }}
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() =>
                setForm({
                  nama: "",
                  username: "",
                  no_telp: "",
                  email: "",
                  link_wa: "",
                })
              }
            >
              Reset
            </Button>

            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
