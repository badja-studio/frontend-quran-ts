export interface DataPesertaHasilAssesment extends Record<string, unknown> {
    id: number;
    no_akun: string;
    nip: string;
    nama: string;
    jk: string;
    usia: number;
    pegawai: string;
    jenjang: string;
    level: string;
    provinsi: string;
    kab_kota: string;
    sekolah: string;
    pendidikan: string;
    program_studi: string;
    perguruan_tinggi: string;
    jenis_pt: string;
    tahun_lulus: string;
    asesor: string;
    waktu: string;
    nilai_1: number;
    nilai_2: number;
    nilai_3: number;
    nilai_4: number;
    m_1: number;
    m_2: number;
}