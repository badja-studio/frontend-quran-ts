import { DataPesertaBelomAsesment } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const dummyDataPeserta: DataPesertaBelomAsesment[] = [
    {
        id: 1,
        no_akun: "A001",
        nip: "1987654321",
        nama: "Budi Santoso",
        jk: "L",
        usia: 35,
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Senior",
        provinsi: "DKI Jakarta",
        kab_kota: "Jakarta Selatan",
        sekolah: "SMA Negeri 8",
        jadwal: "2025-01-10",
        asesor: "Andi",
    },
    {
        id: 2,
        no_akun: "A002",
        nip: "1987654322",
        nama: "Siti Rahma",
        jk: "P",
        usia: 32,
        pegawai: "Staf TU",
        jenjang: "SMP",
        level: "Junior",
        provinsi: "Jawa Barat",
        kab_kota: "Bandung",
        sekolah: "SMP Negeri 3",
        jadwal: "2025-01-15",
        asesor: "Rina",
    },
    {
        id: 3,
        no_akun: "A003",
        nip: "1987654323",
        nama: "Agus Kurniawan",
        jk: "L",
        usia: 38,
        pegawai: "Guru",
        jenjang: "SD",
        level: "Middle",
        provinsi: "Jawa Timur",
        kab_kota: "Surabaya",
        sekolah: "SDN 01 Ketintang",
        jadwal: "2025-02-03",
        asesor: "Dewi",
    },
    {
        id: 4,
        no_akun: "A004",
        nip: "1987654324",
        nama: "Nur Aisyah",
        jk: "P",
        usia: 29,
        pegawai: "Guru",
        jenjang: "SMA",
        level: "Junior",
        provinsi: "Sumatera Utara",
        kab_kota: "Medan",
        sekolah: "SMA Negeri 5",
        jadwal: "2025-02-07",
        asesor: "Fajar",
    },
    {
        id: 5,
        no_akun: "A005",
        nip: "1987654325",
        nama: "Rizky Pratama",
        jk: "L",
        usia: 30,
        pegawai: "Staf IT",
        jenjang: "SMP",
        level: "Middle",
        provinsi: "DI Yogyakarta",
        kab_kota: "Yogyakarta",
        sekolah: "SMP Muhammadiyah 4",
        jadwal: "2025-03-01",
        asesor: "Talitha",
    },
];

export const columnsPeserta: Column<DataPesertaBelomAsesment>[] = [
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
    {
        id: "jadwal",
        label: "Jadwal",
        minWidth: 130,
        align: "center",
        format: (value) => {
            const date = new Date(String(value));
            return date.toLocaleDateString("id-ID");
        },
    },
    {
        id: "asesor",
        label: "Asesor",
        minWidth: 130,
        align: "center",
    },
];

export default dummyDataPeserta;
