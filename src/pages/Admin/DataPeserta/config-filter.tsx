import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataPerseta } from "./type";

export const filterConfigs: FilterConfig<DataPerseta>[] = [
    {
        key: 'no_akun',
        label: 'No Akun',
        type: 'text',
        operators: ['equals', 'contains', 'startsWith'],
    },
    {
        key: 'nip',
        label: 'NIP',
        type: 'text',
        operators: ['equals', 'contains', 'startsWith'],
    },
    {
        key: 'nama',
        label: 'Nama Peseerta',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'jenis_kelamin',
        label: 'Jenis Kelamin',
        type: 'select',
        options: [
            { label: 'Laki-laki', value: 'L' },
            { label: 'Perempuan', value: 'P' },
        ],
    },
    {
        key: 'tempat_lahir',
        label: 'Tempat Lahir',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'jabatan',
        label: 'Jabatan',
        type: 'select',
        options: [
            { label: 'Guru Agama Islam', value: 'Guru Agama Islam' },
            { label: 'Staf TU', value: 'Staf TU' },
            { label: 'Staf IT', value: 'Staf IT' },
        ],
    },
    {
        key: 'jenjang',
        label: 'Jenjang',
        type: 'select',
        options: [
            { label: 'SD', value: 'SD' },
            { label: 'SMP', value: 'SMP' },
            { label: 'SMA', value: 'SMA' },
        ],
    },
    {
        key: 'level',
        label: 'Level',
        type: 'select',
        options: [
            { label: 'Pemula', value: 'Pemula' },
            { label: 'Menengah', value: 'Menengah' },
            { label: 'Lanjut', value: 'Lanjut' },
        ],
    },
    {
        key: 'provinsi',
        label: 'Provinsi',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'kab_kota',
        label: 'Kab/Kota',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'sekolah',
        label: 'Sekolah',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'pendidikan',
        label: 'Pendidikan',
        type: 'select',
        options: [
            { label: 'D3', value: 'D3' },
            { label: 'S1', value: 'S1' },
            { label: 'S2', value: 'S2' },
        ],
    },
    {
        key: 'prodi',
        label: 'Program Studi',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'perguruan_tinggi',
        label: 'Perguruan Tinggi',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'jenis_pt',
        label: 'Jenis PT',
        type: 'select',
        options: [
            { label: 'Negeri', value: 'Negeri' },
            { label: 'Swasta', value: 'Swasta' },
        ],
    },
    {
        key: 'tahun_lulus',
        label: 'Tahun Lulus',
        type: 'number',
        operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
    },
    {
        key: 'jadwal',
        label: 'Jadwal',
        type: 'date',
    },
    {
        key: 'asesor',
        label: 'Asesor',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
];