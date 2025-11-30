import { DataPesertaHasilAssesment } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import ActionMenu from "./action";

export const columnsPeserta: Column<DataPesertaHasilAssesment>[] = [
    {
        id: "no_akun",
        label: "No. Akun",
        minWidth: 100,
        align: "center",
    },
    {
        id: "nip",
        label: "NIP",
        minWidth: 130,
        align: "center",
    },
    {
        id: "nama",
        label: "Nama Peserta",
        minWidth: 200,
        format: (value) => {
            const nama = String(value);
            return (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                        {nama.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                        {nama}
                    </Typography>
                </Box>
            );
        },
    },
    {
        id: "jenis_kelamin",
        label: "Jenis Kelamin",
        minWidth: 120,
        align: "center",
        format: (value) => {
            const jenis_kelamin = String(value);
            return (
                <Chip
                    label={jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                    size="small"
                    color={jenis_kelamin === "L" ? "primary" : "secondary"}
                />
            );
        },
    },
    {
        id: "usia",
        label: "Usia",
        minWidth: 130,
        align: "center",
    },
    {
        id: "pegawai",
        label: "Pegawai",
        minWidth: 120,
        align: "center",
        format: (value) => {
            return (
                <Chip
                    label={String(value)}
                    size="small"
                    color="info"
                    variant="outlined"
                />
            );
        },
    },
    {
        id: "jenjang",
        label: "Jenjang",
        minWidth: 100,
        align: "center",
        format: (value) => {
            return (
                <Chip
                    label={String(value)}
                    size="small"
                    color="primary"
                />
            );
        },
    },
    {
        id: "level",
        label: "Level",
        minWidth: 100,
        align: "center",
        format: (value) => {
            const level = String(value);
            let color: "success" | "warning" | "info" = "info";
            if (level === "Senior") color = "success";
            else if (level === "Middle") color = "warning";
            return (
                <Chip label={level} size="small" color={color} />
            );
        },
    },
    {
        id: "provinsi",
        label: "Provinsi",
        minWidth: 150,
    },
    {
        id: "kab_kota",
        label: "Kab/Kota",
        minWidth: 150,
    },
    {
        id: "sekolah",
        label: "Sekolah",
        minWidth: 200,
    },
    {
        id: "pendidikan",
        label: "Pendidikan",
        minWidth: 100,
        align: "center",
        format: (value) => {
            return (
                <Chip
                    label={String(value)}
                    size="small"
                    color="secondary"
                    variant="outlined"
                />
            );
        },
    },
    {
        id: "program_studi",
        label: "Program Studi",
        minWidth: 200,
    },
    {
        id: "perguruan_tinggi",
        label: "Perguruan Tinggi",
        minWidth: 180,
    },
    {
        id: "jenis_pt",
        label: "Jenis PT",
        minWidth: 100,
        align: "center",
    },
    {
        id: "tahun_lulus",
        label: "Tahun Lulus",
        minWidth: 110,
        align: "center",
    },
    {
        id: "asesor",
        label: "Asesor",
        minWidth: 130,
        align: "center",
    },
    {
        id: "waktu",
        label: "Waktu",
        minWidth: 130,
        align: "center",
        format: (value) => {
            const date = new Date(String(value));
            return date.toLocaleDateString("id-ID");
        },
    },
    {
        id: "makhraj",
        label: "Nilai Makhraj",
        minWidth: 130,
        align: "center",
    },
    {
        id: "sifat",
        label: "Nilai Sifat",
        minWidth: 130,
        align: "center",
    },
    {
        id: "ahkam",
        label: "Nilai Ahkam",
        minWidth: 130,
        align: "center",
    },
    {
        id: "mad",
        label: "Nilai Mad",
        minWidth: 130,
        align: "center",
    },
    {
        id: "gharib",
        label: "Nilai Gharib",
        minWidth: 130,
        align: "center",
    },
    {
        id: "total",
        label: "Total",
        minWidth: 130,
        align: "center",
        format: (_value: unknown, row: DataPesertaHasilAssesment) => {
            const total = row.makhraj + row.sifat + row.ahkam + row.mad + row.gharib;
            return (
                <Chip
                    label={total}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                />
            );
        },
    },
    {
        id: "action",
        label: "Action",
        minWidth: 150,
        align: "center",
        format: (_value: unknown, row: DataPesertaHasilAssesment) => {
            return <ActionMenu row={row} />;
        },
    },
]
