import { CategoryType } from "../../utils/utils";

// Tipe asesor
export interface Asesor {
  id: string;
  name: string;
  email?: string;
  link_wa?: string;
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
  link_wa?: string;
}

// API response peserta
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

// Tipe section untuk modal
export interface QuizSection {
  title: string;
  list: (string | { simbol: string; nilai: number })[];
}
