import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataPersetaSiapAssesmen } from "./type";

export const filterConfigs: FilterConfig<DataPersetaSiapAssesmen>[] = [
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { label: 'Siap', value: 'Siap' },
        ],
    },
    {
        key: 'no_akun',
        label: 'No Akun',
        type: 'text',
        operators: ['equals', 'contains', 'startsWith'],
    },
    {
        key: 'nama',
        label: 'Nama',
        type: 'text',
        operators: ['contains', 'startsWith', 'endsWith'],
    },
    {
        key: 'jk',
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
        type: 'text',
        operators: ['equals', 'contains', 'startsWith'],
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
];