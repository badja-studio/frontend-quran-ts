import { CategoryType } from "../../utils/utils";

// Tipe asesor
export interface Asesor {
  id: string;
  name: string;
  email?: string;
  link_grup_wa?: string;
}

// Tipe peserta
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
  link_grup_wa?: string;
  makhraj: number;
  sifat: number;
  ahkam: number;
  mad: number;
  gharib: number;
  total: number;
}

// API response peserta
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
