export interface DataAsesor extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  no_telepon: string;
  email: string;
  link_grup_wa: string;
  total_peserta_belum_asesmen: number;
  total_peserta_selesai_asesmen: number;
  akun_id: number;
}

export interface AssessorResponse {
  success: boolean;
  message: string;
  data: Assessor[];
  pagination: Pagination;
}

export interface Assessor {
  id: number;
  name: string;
  username: string;
  no_telepon: string;
  email: string;
  link_grup_wa: string;
  total_peserta_belum_asesmen: number;
  total_peserta_selesai_asesmen: number;
  akun_id: number;
  user: AssessorUser;
  participants: Participant[];
}

export interface AssessorUser {
  id: number;
  username: string;
  role: string;
}

export interface Participant {
  id: number;
  nama: string;
  nip: string;
  no_akun: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

