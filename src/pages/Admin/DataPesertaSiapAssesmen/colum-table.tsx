import { DataPersetaSiapAssesmen } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const dummyDataPeserta: DataPersetaSiapAssesmen[] = [
    {
        id: 1,
        status: "Siap",
        no_akun: "A001",
        nama: "Budi Santoso",
        jk: "L",
        usia: "35",
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Senior",
        provinsi: "DKI Jakarta",
        kab_kota: "Jakarta Selatan",
        sekolah: "SMA Negeri 8",
    },
    {
        id: 2,
        status: "Siap",
        no_akun: "A002",
        nama: "Siti Rahma",
        jk: "P",
        usia: "32",
        pegawai: "Staf TU",
        jenjang: "SMP",
        level: "Junior",
        provinsi: "Jawa Barat",
        kab_kota: "Bandung",
        sekolah: "SMP Negeri 3",
    },
    {
        id: 3,
        status: "Siap",
        no_akun: "A003",
        nama: "Agus Kurniawan",
        jk: "L",
        usia: "38",
        pegawai: "Guru",
        jenjang: "SD",
        level: "Middle",
        provinsi: "Jawa Timur",
        kab_kota: "Surabaya",
        sekolah: "SDN 01 Ketintang",
    },
    {
        id: 4,
        status: "Siap",
        no_akun: "A004",
        nama: "Nur Aisyah",
        jk: "P",
        usia: "29",
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Junior",
        provinsi: "Sumatera Utara",
        kab_kota: "Medan",
        sekolah: "SMA Negeri 5",
    },
    {
        id: 5,
        status: "Siap",
        no_akun: "A005",
        nama: "Rizky Pratama",
        jk: "L",
        usia: "30",
        pegawai: "Staf IT",
        jenjang: "SMP",
        level: "Middle",
        provinsi: "DI Yogyakarta",
        kab_kota: "Yogyakarta",
        sekolah: "SMP Muhammadiyah 4",
    },
];

export const columnsPeserta: Column<DataPersetaSiapAssesmen>[] = [
    {
        id: "status",
        label: "Status",
        minWidth: 100,
        align: "center",
        format: (value) => {
            const status = String(value);
            return (
                <Chip
                    label={status}
                    size="small"
                    color="success"
                />
            );
        },
    },
    {
        id: "no_akun",
        label: "No. Akun",
        minWidth: 100,
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
        id: "jk",
        label: "Jenis Kelamin",
        minWidth: 120,
        align: "center",
        format: (value) => {
            const jk = String(value);
            return (
                <Chip
                    label={jk === "L" ? "Laki-laki" : "Perempuan"}
                    size="small"
                    color={jk === "L" ? "primary" : "secondary"}
                />
            );
        },
    },
    {
        id: "usia",
        label: "Usia",
        minWidth: 80,
        align: "center",
    },
    {
        id: "pegawai",
        label: "Jabatan",
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
];

export default dummyDataPeserta;
