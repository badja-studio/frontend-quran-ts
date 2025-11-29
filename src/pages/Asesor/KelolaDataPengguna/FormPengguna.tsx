import { useEffect, useMemo } from "react";
import DynamicProfileForm from "../../../components/FormKelolaPengguna/DynamicProfileForm";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import { Box, Typography, Link, Paper, Divider } from "@mui/material";
import useUserStore from "../../../store/user.store";
import apiClient from "../../../services/api.config";
import { useQuery } from "@tanstack/react-query";

// Tipe Assessor
export interface AssessorProfile {
  akun_id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  no_telepon?: string;
  link_grup_wa?: string;
  participants?: any[];
  total_peserta_belum_asesmen?: number;
  total_peserta_selesai_asesmen?: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiAssessorResponse {
  success: boolean;
  message: string;
  data: AssessorProfile;
}

export default function AsesmenForm() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser()
      .then((res) => console.log("User fetched successfully:", res))
      .catch((err) => console.error("Error fetching user:", err));
  }, [fetchUser]);

  const { data: response, error } = useQuery<ApiAssessorResponse>({
    queryKey: ["Assessor"],
    queryFn: async () => {
      console.log("Fetching assessor profile...");
      const result = await apiClient.get("/api/assessors/profile");
      console.log("Assessor response:", result.data);
      return result.data;
    },
    staleTime: 30000,
    enabled: !!user,
  });

  useEffect(() => {
    if (response) console.log("Assessor data loaded:", response);
    if (error) console.error("Error fetching assessor data:", error);
  }, [response, error]);

  const fields = [
    { name: "nama", label: "Nama Lengkap", type: "text", required: true },
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "nomor_telp", label: "Nomor Telp", type: "tel" },
    { name: "link_wa", label: "Link Grup WA", type: "text" },
  ];

  const defaultValues = useMemo(() => {
    const dataAssessor = response?.data;

    return {
      nama: dataAssessor?.name || "",
      username: dataAssessor?.username || "",
      status: "AKTIF",
      email: dataAssessor?.email || "",
      nomor_telp: dataAssessor?.no_telepon || "",
      link_wa: dataAssessor?.link_grup_wa || "",
    };
  }, [response]);

  const handleSave = (values: typeof defaultValues) => {
    console.log("Data Baru yang disubmit:", values);
    alert("Data berhasil diperbarui!");
  };

  const dataAssessor = response?.data;

  return (
    <DashboardLayout
      userRole={user?.role === "admin" ? "admin" : "assessor"}
      userName={user?.name || "Ustadz Ahmad"}
      userEmail={user?.email || "ahmad@quran.app"}
    >
      <Box sx={{ mb: 4 }}>
        {dataAssessor && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Profil Asesor
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography>
              <strong>Nama:</strong> {dataAssessor.name || "-"}
            </Typography>
            <Typography>
              <strong>Username:</strong> {dataAssessor.username || "-"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {dataAssessor.email || "-"}
            </Typography>
            <Typography>
              <strong>Nomor Telepon:</strong> {dataAssessor.no_telepon || "-"}
            </Typography>
            <Typography>
              <strong>Link WA:</strong>{" "}
              {dataAssessor.link_grup_wa ? (
                <Link
                  href={dataAssessor.link_grup_wa}
                  target="_blank"
                  rel="noopener"
                >
                  {dataAssessor.link_grup_wa}
                </Link>
              ) : (
                "-"
              )}
            </Typography>
          </Paper>
        )}
      </Box>

      <Box>
        <DynamicProfileForm
          title="Asesor Sistem"
          role={user?.role || "assessor"}
          status="AKTIF"
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSave}
        />
      </Box>
    </DashboardLayout>
  );
}
