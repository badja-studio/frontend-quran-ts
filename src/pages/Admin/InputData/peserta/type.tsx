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
  no_akun: string;
  nip: string;
  nik: string;
  nama: string;
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
  nama_sekolah: string;
  alamat_sekolah: string;
  provinsi: string;
  kab_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  status_pegawai: string;
  sertifikasi: string;
  tahun_sertifikasi: number;
  password: string;
}
