import { DataPesertaHasilAssesment } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

// Component untuk Action Menu
const ActionMenu = ({ row }: { row: DataPesertaHasilAssesment }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        console.log("View - No Akun:", row.no_akun);
        navigate(`/admin/data-hasil-asesmen/view/${row.no_akun}`);
        handleClose();
    };

    const handleEdit = () => {
        console.log("Edit - No Akun:", row.no_akun);
        navigate(`/admin/data-hasil-asesmen/edit/${row.no_akun}`);
        handleClose();
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls={open ? 'action-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleView}>View</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
            </Menu>
        </>
    );
};

export const dummyDataPeserta: DataPesertaHasilAssesment[] = [
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
        pendidikan: "S1",
        program_studi: "Pendidikan Matematika",
        perguruan_tinggi: "UNJ",
        jenis_pt: "Negeri",
        tahun_lulus: "2018",
        asesor: "Andi",
        waktu: "2025-01-10",
        nilai_1: 85,
        nilai_2: 90,
        nilai_3: 88,
        nilai_4: 92,
        m_1: 87,
        m_2: 89,
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
        pendidikan: "D3",
        program_studi: "Administrasi Perkantoran",
        perguruan_tinggi: "Polban",
        jenis_pt: "Negeri",
        tahun_lulus: "2016",
        asesor: "Rina",
        waktu: "2025-01-15",
        nilai_1: 78,
        nilai_2: 82,
        nilai_3: 80,
        nilai_4: 85,
        m_1: 81,
        m_2: 83,
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
        pendidikan: "S1",
        program_studi: "PGSD",
        perguruan_tinggi: "UNESA",
        jenis_pt: "Negeri",
        tahun_lulus: "2019",
        asesor: "Dewi",
        waktu: "2025-02-03",
        nilai_1: 92,
        nilai_2: 88,
        nilai_3: 90,
        nilai_4: 87,
        m_1: 89,
        m_2: 91,
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
        pendidikan: "S2",
        program_studi: "Pendidikan Bahasa Indonesia",
        perguruan_tinggi: "UNIMED",
        jenis_pt: "Negeri",
        tahun_lulus: "2020",
        asesor: "Fajar",
        waktu: "2025-02-07",
        nilai_1: 88,
        nilai_2: 91,
        nilai_3: 89,
        nilai_4: 93,
        m_1: 90,
        m_2: 92,
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
        pendidikan: "S1",
        program_studi: "Teknik Informatika",
        perguruan_tinggi: "UGM",
        jenis_pt: "Negeri",
        tahun_lulus: "2021",
        asesor: "Talitha",
        waktu: "2025-03-01",
        nilai_1: 95,
        nilai_2: 92,
        nilai_3: 94,
        nilai_4: 90,
        m_1: 93,
        m_2: 94,
    },
];

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
        id: "nilai_1",
        label: "Nilai 1",
        minWidth: 130,
        align: "center",
    },
    {
        id: "nilai_2",
        label: "Nilai 2",
        minWidth: 130,
        align: "center",
    },
    {
        id: "nilai_3",
        label: "Nilai 3",
        minWidth: 130,
        align: "center",
    },
    {
        id: "nilai_4",
        label: "Nilai 4",
        minWidth: 130,
        align: "center",
    },
    {
        id: "m_1",
        label: "M 1",
        minWidth: 130,
        align: "center",
    },
    {
        id: "m_2",
        label: "M 2",
        minWidth: 130,
        align: "center",
    },
    {
        id: "total",
        label: "Total",
        minWidth: 130,
        align: "center",
        format: (_value: unknown, row: DataPesertaHasilAssesment) => {
            const total = row.nilai_1 + row.nilai_2 + row.nilai_3 + row.nilai_4 + row.m_1 + row.m_2;
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
];

export default dummyDataPeserta;
