import DynamicProfileForm from "../../../components/FormKelolaPengguna/DynamicProfileForm";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import { Box } from "@mui/material";

export default function AsesmenForm() {
  const fields = [
    { name: "nama", label: "Nama Lengkap", type: "text", required: true },
    { name: "nip", label: "NIP", type: "number" },
    {
      name: "status",
      label: "Status Kepegawaian",
      type: "select",
      options: [
        { label: "PNS", value: "pns" },
        { label: "Non PNS", value: "non-pns" },
      ],
    },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "nomor_telp", label: "Nomor Telp", type: "tel" },
    { name: "link_wa", label: "Link Grup WA", type: "tel" },
  ];

  const defaultValues = {
    nama: "Budi Santoso",
    nip: "1987654321001",
    status: "Aktif",
    email: "budi.santoso@example.com",
    nomor: "081234567890",
    link_wa: "https://wa.me/6281234567890",
  };

  return (
    <DashboardLayout
      userRole="guru"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <DynamicProfileForm
          title="Asesor Sistem"
          role="guru"
          status="AKTIF"
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={(data) => console.log("Admin Save:", data)}
        />
      </Box>
    </DashboardLayout>
  );
}
