import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataPersetaBelum } from "./type";

export const filterConfigs: FilterConfig<DataPersetaBelum>[] = [
  { key: "nik", label: "NIK", type: "text", operators: ["equals", "contains"] },
  {
    key: "username",
    label: "Username",
    type: "text",
    operators: ["contains", "startsWith", "endsWith"],
  },
  {
    key: "email",
    label: "Email",
    type: "text",
    operators: ["contains", "startsWith", "endsWith"],
  },
  {
    key: "nomor_telepon",
    label: "Nomor Telepon",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "nama",
    label: "Nama",
    type: "text",
    operators: ["contains", "startsWith", "endsWith"],
  },
  {
    key: "jenis_kelamin",
    label: "Jenis Kelamin",
    type: "select",
    options: [
      { label: "Laki-laki", value: "L" },
      { label: "Perempuan", value: "P" },
    ],
  },
  {
    key: "tempat_lahir",
    label: "Tempat Lahir",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  { key: "tanggal_lahir", label: "Tanggal Lahir", type: "date" },
  {
    key: "jenjang",
    label: "Jenjang",
    type: "select",
    options: [
      { label: "MI", value: "MI" },
      { label: "MTs", value: "MTs" },
      { label: "MA", value: "MA" },
    ],
  },
  {
    key: "sekolah",
    label: "Nama Sekolah",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "alamat_sekolah",
    label: "Alamat Sekolah",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "provinsi",
    label: "Provinsi",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "kab_kota",
    label: "Kab/Kota",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "kecamatan",
    label: "Kecamatan",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "desa_kelurahan",
    label: "Desa/Kelurahan",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "pendidikan",
    label: "Pendidikan",
    type: "select",
    options: [
      { label: "D3", value: "D3" },
      { label: "D4", value: "D4" },
      { label: "S1", value: "S1" },
      { label: "S2", value: "S2" },
      { label: "S3", value: "S3" },
    ],
  },
  {
    key: "perguruan_tinggi",
    label: "Perguruan Tinggi",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "fakultas",
    label: "Fakultas",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "prodi",
    label: "Program Studi",
    type: "text",
    operators: ["contains", "startsWith"],
  },
  {
    key: "tahun_lulus",
    label: "Tahun Lulus",
    type: "text",
    operators: ["equals", "contains"],
  },
  {
    key: "pegawai",
    label: "Status Pegawai",
    type: "select",
    options: [
      { label: "PNS", value: "PNS" },
      { label: "PPPK", value: "PPPK" },
      { label: "Non PNS", value: "Non PNS" },
    ],
  },
  {
    key: "sertifikasi",
    label: "Sertifikasi",
    type: "select",
    options: [
      { label: "Sudah", value: "Sudah" },
      { label: "Belum", value: "Belum" },
    ],
  },
  {
    key: "tahun_sertifikasi",
    label: "Tahun Sertifikasi",
    type: "text",
    operators: ["equals", "contains"],
  },
  {
    key: "mapel",
    label: "Mata Pelajaran",
    type: "select",
    options: [
      { label: "Al-Qur'an Hadis", value: "Al-Qur'an Hadis" },
      { label: "Akidah Akhlak", value: "Akidah Akhlak" },
      { label: "Fiqih", value: "Fiqih" },
      {
        label: "Sejarah Kebudayaan Islam (SKI)",
        value: "Sejarah Kebudayaan Islam (SKI)",
      },
      { label: "Bahasa Arab", value: "Bahasa Arab" },
    ],
  },
  { key: "jadwal", label: "Jadwal", type: "date" },
  {
    key: "asesor",
    label: "Asesor",
    type: "text",
    operators: ["contains", "startsWith"],
  },
];
