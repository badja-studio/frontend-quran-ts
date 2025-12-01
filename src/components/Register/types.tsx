export interface Asesor {
  id: string;
  name: string;
}

export type AssessorPage = {
  data: Asesor[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
};

export type RegisterPayload = Omit<
  RegisterForm,
  "sertifikasi" | "tahunSertifikasi"
> & {
  sertifikat_profesi: string;
};

export interface RegisterForm {
  nik: string;
  nama: string;
  passwor: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "L" | "P" | "";
  pendidikan: string;
  kampus: string;
  jenjang: string;
  prodi: string;
  tahun_lulus: string;
  nama_sekolah: string;
  tingkat_sekolah: string;
  alamat_sekolah: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  sertifikasi: string;
  tahunSertifikasi: string;
  // mapel:string;
  status_pegawai: string;
  status: "Sudah" | "Belum" | "";
  sertifikat_profesi: string;
  tahun_sertifikasi: string;
  email: string;
  password: string;
  whatsapp: string;
  level:
    | "Al-Qur'an Hadis"
    | "Akidah Akhlak"
    | "Fiqih"
    | "Sejarah Kebudayaan Islam (SKI)"
    | "Bahasa Arab"
    | "";
  asesor: string;
  jadwal: string;
  username: string;
}
