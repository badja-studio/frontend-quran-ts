export interface DataPerseta extends Record<string, unknown> {
    id: number;
    no_akun: string;
    nip: string;
    nama: string;
    jk: string;
    tl: string;
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
    jadwal: string;
    asesor: string;
}

// User interface untuk response API
export interface User {
    id: number;
    accountNumber?: string;
    nip?: string;
    fullname: string;
    name: string;
    email?: string;
    gender?: "L" | "P";
    birthPlace?: string;
    birthDate?: string;
    position?: string;
    schoolLevels?: string;
    levels?: string;
    province?: string;
    district?: string;
    schoolName?: string;
    education?: string;
    studyProgram?: string;
    university?: string;
    universityType?: string;
    graduationYear?: string;
}

export interface GetUsersResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}