export interface DataPersetaBelum extends Record<string, unknown> {
  id: string;
  no_akun: string;
  nip: string;
  nama: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  pegawai: string;
  jenjang: string;
  level: string;
  provinsi: string;
  kab_kota: string;
  sekolah: string;
  pendidikan: string;
  prodi: string;
  perguruan_tinggi: string;
  jenis_pt: string;
  tahun_lulus: number;
  jadwal: string;
  asesor: string;
}

export interface User {
  id: string;
  no_akun?: string;
  nip?: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
  usia: number;
  pegawai: string;
  tanggal_lahir?: string;
  jabatan?: string;
  jenjang?: string;
  level?: string;
  provinsi?: string;
  kab_kota?: string;
  sekolah?: string;
  pendidikan?: string;
  prodi?: string;
  perguruan_tinggi?: string;
  jenis_pt?: string;
  tahun_lulus?: number;
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
