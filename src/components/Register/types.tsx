export interface Asesor {
  id: string;
  name: string;
  username: string;
  no_telepon: string;
  email: string;
  link_grup_wa: string;
  total_peserta_belum_asesmen: number;
  total_peserta_selesai_asesmen: number;
  akun_id: string;
  createdAt?: string;
  updatedAt?: string;
  akun?: {
    id: string;
    username: string;
  };
  participants?: Array<{
    id: string;
    nama: string;
    status: string;
  }>;
  realTimeCounts?: {
    total_assigned: number;
    assessed: number;
    not_assessed: number;
    assessment_progress: number;
    updated_at: string;
  };
}

export type AssessorPage = {
  data: Asesor[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};

export type RegisterPayload = RegisterForm;

export interface RegisterForm {
  no_akun?: string;
  nip?: string;
  nik: string;
  nama: string;
  email: string;
  no_handphone: string;
  jenis_kelamin: "L" | "P";
  tempat_lahir: string;
  tanggal_lahir: string;
  jabatan: string;
  pendidikan: string;
  prodi: string;
  perguruan_tinggi: string;
  asal_kampus: string;
  fakultas: string;
  tahun_lulus: number;
  tingkat_sekolah: string;
  nama_sekolah?: string;
  alamat_sekolah: string;
  provinsi: string;
  kab_kota?: string;
  kecamatan: string;
  sekolah: string;
  desa_kelurahan: string;
  status_pegawai: string;
  sertifikasi: string;
  tahun_sertifikasi: number;
  password: string;
  asesor_id: string;
  jadwal: string;
  kota: string;
  kelurahan: string;
  level: string;
}
