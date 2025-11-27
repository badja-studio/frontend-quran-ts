export interface DataPersetaSiapAssesment extends Record<string, unknown> {
    id: number;
    status: string; // Tambahan sesuai kolom
    no_akun: string;
    nama: string;
    jk: string;
    usia: string; // Tambahan sesuai kolom
    pegawai: string;
    jenjang: string;
    level: string;
    provinsi: string;
    kab_kota: string;
    sekolah: string;
}