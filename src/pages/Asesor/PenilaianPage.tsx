import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";

const peserta = {
  akun: "320230003003",
  nama: "Neneng Halimah",
  level: "Guru",
  jenjang: "SMP",
  status: "NON PNS",
  sekolah: "SMP ISLAM TERPADU YASPIDA 2",
  kabupaten: "KABUPATEN SUKABUMI",
  provinsi: "JAWA BARAT",
  pendidikan: "S1 Pendidikan Agama Islam",
};

const PenilaianPage: React.FC = () => {
  const [nilaiHuruf, setNilaiHuruf] = useState<string[]>([]);
  const [nilaiMad, setNilaiMad] = useState<string[]>([]);
  const [nilaiGharib, setNilaiGharib] = useState<string[]>([]);

  const huruf = [
    "ا",
    "ب",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    "ن",
    "ه",
    "و",
    "ي",
  ];

  const mad = [
    "Mad Thabi‘i",
    "Mad Wajib Muttasil",
    "Mad Jaiz Munfasil",
    "Mad Badal",
    "Mad Lazim Harfi",
    "Mad Lazim Kalimi",
    "Mad ‘Aridh Lissukun",
    "Mad Lin",
    "Mad Shilah Qashirah",
    "Mad Shilah Tawilah",
    "Mad Tamkin",
  ];

  const gharib = ["Imalah", "Isymam", "Saktah", "Tashil", "Naql", "Badal"];

  const handleToggle = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = () => {
    alert(
      `Nilai Huruf: ${nilaiHuruf.join(", ")}\nNilai Mad: ${nilaiMad.join(
        ", "
      )}\nNilai Gharib: ${nilaiGharib.join(", ")}`
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* KIRI: Data Peserta */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Peserta
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <strong>Akun:</strong> {peserta.akun}
              </Typography>
              <Typography>
                <strong>Nama:</strong> {peserta.nama}
              </Typography>
              <Typography>
                <strong>Level:</strong> {peserta.level}
              </Typography>
              <Typography>
                <strong>Jenjang:</strong> {peserta.jenjang}
              </Typography>
              <Typography>
                <strong>Status:</strong> {peserta.status}
              </Typography>
              <Typography>
                <strong>Sekolah:</strong> {peserta.sekolah}
              </Typography>
              <Typography>
                <strong>Kabupaten:</strong> {peserta.kabupaten}
              </Typography>
              <Typography>
                <strong>Provinsi:</strong> {peserta.provinsi}
              </Typography>
              <Typography>
                <strong>Pendidikan:</strong> {peserta.pendidikan}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* KANAN: Form Penilaian */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Form Penilaian
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1">Huruf Hijaiyah</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                {huruf.map((h) => (
                  <FormControlLabel
                    key={h}
                    control={
                      <Checkbox
                        checked={nilaiHuruf.includes(h)}
                        onChange={() =>
                          handleToggle(h, nilaiHuruf, setNilaiHuruf)
                        }
                      />
                    }
                    label={h}
                    sx={{ width: "25%" }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1">Ahkamul Mad</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                {mad.map((m) => (
                  <FormControlLabel
                    key={m}
                    control={
                      <Checkbox
                        checked={nilaiMad.includes(m)}
                        onChange={() => handleToggle(m, nilaiMad, setNilaiMad)}
                      />
                    }
                    label={m}
                    sx={{ width: "33%" }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1">Gharib</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                {gharib.map((g) => (
                  <FormControlLabel
                    key={g}
                    control={
                      <Checkbox
                        checked={nilaiGharib.includes(g)}
                        onChange={() =>
                          handleToggle(g, nilaiGharib, setNilaiGharib)
                        }
                      />
                    }
                    label={g}
                    sx={{ width: "33%" }}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Penilaian
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PenilaianPage;
