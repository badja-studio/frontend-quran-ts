import { CategoryType } from "../Penilaian/type";
export interface DataPersetaHasil extends Record<string, unknown> {
  id: string;
  nik: string;
  username: string;
  email: string;
  no_handphone: string;
  nama: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenjang: string;
  sekolah: string;
  alamat_sekolah: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  status_pegawai: string;
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
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  kelancaran: number;
  pengurangan: number;
  total: number;
  onDetailClick?: (row: DataPersetaHasil) => void;
}

// Category Breakdown interface
export interface CategoryBreakdown {
  category: string;
  initialScore: number;
  errorCount: number;
  totalDeduction: number;
  finalScore: number;
}

export interface ApiAssessor {
  id: string;
  name: string;
  email: string;
  link_grup_wa?: string;
}

export interface ApiParticipant {
  id: string;
  no_akun?: string;
  nip?: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
  jabatan?: string;
  no_handphone: string;
  jenjang?: string;
  level?: string;
  provinsi?: string;
  kota?: string;
  kecamatan: string;
  kelurahhan: string;
  sekolah?: string;
  pendidikan?: string;
  prodi?: string;
  status_pegawai: string;
  perguruan_tinggi?: string;
  jenis_pt?: string;
  tahun_lulus?: number | string;
  jadwal?: string;
  assessor?: {
    id: string;
    name: string;
    email: string;
    link_grup_wa?: string;
  } | null;
  status?: string;
  link_grup_wa?: string;
  scoring?: Scoring;
}
// Scoring Details interface
export interface ScoringDetails {
  categoryBreakdown: {
    MAKHRAJ: CategoryBreakdown;
    SIFAT: CategoryBreakdown;
    AHKAM: CategoryBreakdown;
    MAD: CategoryBreakdown;
    GHARIB: CategoryBreakdown;
    KELANCARAN: CategoryBreakdown;
    PENGURANGAN: CategoryBreakdown;
  };
  totalDeduction: number;
  assessmentCount: number;
  calculatedAt: string;
}

// Scores interface
export interface Scores {
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  kelancaran: number;
  pengurangan: number;
  overall: number;
}

// Scoring interface
export interface Scoring {
  scores: Scores;
  details: ScoringDetails;
}

// User interface untuk response API
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
  no_handphone: string;
  pendidikan?: string;
  perguruan_tinggi?: string;
  fakultas?: string;
  prodi?: string;
  tahun_lulus?: string;
  status_pegawai: string;
  provinsi?: string;
  jenjang?: string;
  sekolah?: string;
  alamat_sekolah?: string;
  kota?: string;
  kecamatan?: string;
  kelurahan?: string;
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
  scoring?: Scoring;
}
export interface ApiAssessmentItem {
  id: string;
  peserta_id: string;
  asesor_id: string;
  huruf: string;
  nilai: string; // biasanya "0.00" atau "1.00"
  kategori: CategoryType;
  createdAt: string;
  updatedAt: string;
  peserta?: ApiParticipant;
  assessor?: ApiAssessor;
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

export interface QuizSection {
  title: string;
  list: (string | { simbol: string; nilai: number })[];
}
