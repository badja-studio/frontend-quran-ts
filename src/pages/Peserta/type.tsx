export interface Asesor {
  id: string;
  name: string;
  email?: string;
  link_wa?: string;
}

export interface DataPeserta {
  id: string;
  no_akun?: string;
  nip?: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
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
  tahun_lulus?: number | string;
  jadwal?: string;
  asesor?: Asesor | null;
  status?: string;
  link_wa?: string;
}

// Tipe API
export interface ApiAssessor {
  id: string;
  name: string;
  email: string;
  link_wa?: string;
}

export interface ApiParticipant {
  id: string;
  no_akun?: string;
  nip?: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
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
  tahun_lulus?: number | string;
  jadwal?: string;
  assessor?: ApiAssessor;
  status?: string;
  link_wa?: string;
}

export interface QuizSection {
  title: string;
  list: (string | { simbol: string; arti: string })[];
}
