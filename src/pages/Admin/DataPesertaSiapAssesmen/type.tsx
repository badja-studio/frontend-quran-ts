export interface DataPersetaSiapAssesmen extends Record<string, unknown> {
  id: string;
  nik: string;
  username: string;
  email: string;
  nomor_telepon: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenjang: string;
  sekolah: string;
  alamat_sekolah: string;
  provinsi: string;
  kab_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  pendidikan: string;
  perguruan_tinggi: string;
  fakultas: string;
  prodi: string;
  tahun_lulus: number;
  pegawai: string;
  sertifikasi: string;
  tahun_sertifikasi?: string;
  mapel: string;
  jadwal: string;
  asesor: string;
  status: "SIAP_ASSESMEN";
  jenis_kelamin?: string;
}

export interface User {
  id: string;
  username?: string;
  nip?: string;
  nik?: string;
  nama?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: "L" | "P";
  email?: string;
  nomor_telepon: string;
  pendidikan?: string;
  perguruan_tinggi?: string;
  fakultas?: string;
  prodi?: string;
  tahun_lulus?: string;
  provinsi?: string;
  jenjang?: string;
  sekolah?: string;
  alamat_sekolah?: string;
  kab_kota?: string;
  kecamatan?: string;
  desa_kelurahan?: string;
  pegawai?: string;
  sertifikasi?: string;
  tahun_sertifikasi?: string;
  mapel?: string;
  jadwal?: string;
  asesor_id?: string | null;
  status?: string;
  akun_id?: string;
  createdAt?: string;
  updatedAt?: string;
  assessor?: {
    id: string;
    name: string;
    email: string;
  } | null;
  akun?: {
    id: string;
    username: string;
  };
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
