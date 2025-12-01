export interface Asesor {
  id: string;
  name: string;
  email: string;
}

export interface Peserta {
  id: string;
  nama: string;
  nik: string;
  username: string;
}

// Tambahkan tipe response halaman assessor
export type AssessorPage = {
  data: Asesor[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

export type PesertaPage = {
  data: Peserta[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

export interface PesertaFormData {
  username: string;
  nik: string;
  nama: string;
  jenis_kelamin: "L" | "P";
  tempat_lahir: string;
  tanggal_lahir: string;
  desa: string;
  sertifikasi: string;
  provinsi: string;
  kab_kota: string;
  kecamatan: string;
  tahun_sertifikasi: number;
  pendidikan: string;
  prodi: string;
  perguruan_tinggi: string;
  fakultas: string;
  sekolah: string;
  tingkatan_sekolah: string;
  alamat_sekolah: string;
  tahun_lulus: number;
  jadwal: string;
  akun_id?: string | number;
  asesor_id?: string | null;
  no_telepon?: string;
  email?: string;
  mapel: string;
  pegawai: string;
}
