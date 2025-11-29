import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataPesertaBelomAsesment } from "./type";

export const filterConfigs: FilterConfig<DataPesertaBelomAsesment>[] = [
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
        label: 'Nama Peserta',
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
        key: 'usia',
        label: 'Usia',
        type: 'number',
        operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
    },
    {
        key: 'pegawai',
        label: 'Jabatan',
        type: 'select',
        options: [
            { label: 'Guru', value: 'Guru' },
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
            { label: 'Junior', value: 'Junior' },
            { label: 'Middle', value: 'Middle' },
            { label: 'Senior', value: 'Senior' },
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