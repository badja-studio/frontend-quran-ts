import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DynamicProfileForm from "../../../components/FormKelolaPengguna/DynamicProfileForm";
import { Box } from "@mui/material";

export default function AdminForm() {
  const fields = [
    { name: "nama", label: "Nama Lengkap", type: "text", required: true },

    { name: "email", label: "Email", type: "email", required: true },
    { name: "whatsapp", label: "Nomor WA", type: "tel" },
  ];

  const defaultValues = {
    nama: "Admin",
    status: "",
    email: "admin@mail.com",
    whatsapp: "",
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <DynamicProfileForm
          title="Admin Sistem"
          role="admin"
          status="AKTIF"
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={(data) => console.log("Admin Save:", data)}
        />
      </Box>
    </DashboardLayout>
  );
}
