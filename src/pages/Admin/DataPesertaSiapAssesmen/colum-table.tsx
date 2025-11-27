import { DataPersetaSiapAssesment } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

// Data dummy sesuai dengan kolom table
const dummyData: DataPersetaSiapAssesment[] = [
    {
        id: 1,
        status: "Siap",
        no_akun: "AK001",
        nama: "Ahmad Fauzi",
        jk: "L",
        usia: "35 tahun",
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Senior",
        provinsi: "Jawa Barat",
        kab_kota: "Bandung",
        sekolah: "SMAN 1 Bandung"
    },
    {
        id: 2,
        status: "Siap",
        no_akun: "AK002",
        nama: "Siti Nurhaliza",
        jk: "P",
        usia: "28 tahun",
        pegawai: "Guru",
        jenjang: "SMP",
        level: "Middle",
        provinsi: "Jawa Tengah",
        kab_kota: "Semarang",
        sekolah: "SMPN 5 Semarang"
    },
    {
        id: 3,
        status: "Siap",
        no_akun: "AK003",
        nama: "Budi Santoso",
        jk: "L",
        usia: "42 tahun",
        pegawai: "Kepala Sekolah",
        jenjang: "SD",
        level: "Senior",
        provinsi: "Jawa Timur",
        kab_kota: "Surabaya",
        sekolah: "SDN 12 Surabaya"
    },
    {
        id: 4,
        status: "Menunggu",
        no_akun: "AK004",
        nama: "Dewi Lestari",
        jk: "P",
        usia: "30 tahun",
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Middle",
        provinsi: "DKI Jakarta",
        kab_kota: "Jakarta Selatan",
        sekolah: "SMAN 8 Jakarta"
    },
    {
        id: 5,
        status: "Siap",
        no_akun: "AK005",
        nama: "Rizki Ramadhan",
        jk: "L",
        usia: "26 tahun",
        pegawai: "Guru",
        jenjang: "SMP",
        level: "Junior",
        provinsi: "Banten",
        kab_kota: "Tangerang",
        sekolah: "SMPN 3 Tangerang"
    }
];

export const columnsPeserta: Column<DataPersetaSiapAssesment>[] = [
    {
        id: "status",
        label: "Status",
        minWidth: 100,
        align: "center",
        format: (value) => {
            const status = String(value);
            let color: "success" | "warning" | "error" = "success";
            if (status === "Menunggu") color = "warning";
            else if (status === "Tidak Siap") color = "error";
            return (
                <Chip label={status} size="small" color={color} />
            );
        },
    },
    {
        id: "no_akun",
        label: "No. Akun",
        minWidth: 130,
        align: "center",
    },
    {
        id: "nama",
        label: "Nama",
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
];

export default dummyData;
