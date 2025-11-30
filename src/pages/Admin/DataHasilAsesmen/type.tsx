export interface DataPesertaHasilAssesment extends Record<string, unknown> {
    id: number;
    no_akun: string;
    nip: string;
    nama: string;
    jenis_kelamin: string;
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
    makhraj: number;
    sifat: number;
    ahkam: number;
    mad: number;
    gharib: number;
}

// Category Breakdown interface
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

// User interface untuk response API
export interface User {
    id: string;
    no_akun?: string;
    nip?: string;
    nama: string;
    jenis_kelamin?: "L" | "P";
    tempat_lahir?: string;
    usia: number;
    pegawai: string;
    tanggal_lahir?: string;
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
    tahun_lulus?: number;
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