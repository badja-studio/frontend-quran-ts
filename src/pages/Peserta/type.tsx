import { CategoryType } from "../Asesor/Penilaian/type";

export interface Asesor {
  id: string;
  name: string;
  email?: string;
  link_grup_wa?: string;
  no_telepon: string;
}
export interface Akun {
  id: string;
  username: string;
}

export interface DataPeserta {
  id: string;
  no_akun?: string;
  nip?: string;
  email?: string;
  nik: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jabatan?: string;
  jenjang?: string;
  level?: string;
  provinsi?: string;
  kota?: string;
  kecamatan: string;
  kelurahan: string;
  sekolah?: string;
  pendidikan?: string;
  prodi?: string;
  perguruan_tinggi?: string;
  status_pegawai?: string;
  sertifikat_profesi?: string;
  jenis_pt?: string;
  tahun_lulus?: number | string;
  alamat_sekolah: string;
  fakultas: string;
  tingkat_sekolah: string;
  jadwal?: string;
  asesor?: Asesor | null;
  status?: string;
  link_grup_wa?: string;
  no_handphone?: string;
  no_telepon?: string;
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  kelancaran: number;
  pengurangan: number;
  total: number;
  scoring?: Scoring | null;
  akun?: Akun | null;
}

// Type for valid field keys in DataPeserta
export type PesertaFieldKey = keyof DataPeserta;

// API response peserta
export interface ApiAssessor {
  id: string;
  name: string;
  email: string;
  link_grup_wa?: string;
  no_telepon: string;
}

export interface ApiParticipant {
  id: string;
  no_akun?: string;
  nik: string;
  nip?: string;
  email?: string;
  nama: string;
  jenis_kelamin?: "L" | "P";
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jabatan?: string;
  jenjang?: string;
  level?: string;
  provinsi?: string;
  kota?: string;
  kecamatan: string;
  kelurahan: string;
  status_pegawai: string;
  sertifikat_profesi: string;
  sekolah?: string;
  alamat_sekolah: string;
  fakultas: string;
  tingkat_sekolah: string;
  pendidikan?: string;
  prodi?: string;
  perguruan_tinggi?: string;
  jenis_pt?: string;
  tahun_lulus?: number | string;
  jadwal?: string;
  assessor?: {
    id: string;
    name: string;
    email: string;
    link_grup_wa?: string;
    no_telepon: string;
  } | null;
  status?: string;
  no_telepon: string;
  no_handphone: string;
  link_grup_wa?: string;
  scoring?: Scoring;
}

// Tipe item asesmen
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

// Tipe response API asesmen
export interface ApiAssessmentResponse {
  success: boolean;
  message: string;
  data: ApiAssessmentItem[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
export interface CategoryBreakdown {
  category: string;
  initialScore: number;
  errorCount: number;
  totalDeduction: number;
  finalScore: number;
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

// Tipe section untuk modal
export interface QuizSection {
  title: string;
  list: (string | { simbol: string; nilai: number })[];
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: ApiParticipant[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
