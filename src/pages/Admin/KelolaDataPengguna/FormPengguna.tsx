"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DynamicProfileForm from "../../../components/FormKelolaPengguna/DynamicProfileForm";
import { Box } from "@mui/material";

export default function AdminForm() {
  const fields = [
    { name: "nama", label: "Nama Lengkap", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "whatsapp", label: "Nomor WA", type: "tel" },
  ];

  // State untuk menyimpan nilai form yang akan tampil di input
  const [formData, setFormData] = useState({
    nama: "Admin",
    email: "admin@mail.com",
    whatsapp: "081234567890",
  });

  // Handler ketika klik tombol SIMPAN
  const handleSave = async (values: typeof formData) => {
    console.log("Admin Save:", values);

    // update state supaya form merefresh
    setFormData(values);

    // kalau ingin kirim ke API, tinggal buka ini:
    // await fetch("/api/admin/update", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    // });

    alert("Data admin berhasil diperbarui!");
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
          defaultValues={formData}
          onSubmit={handleSave}
        />
      </Box>
    </DashboardLayout>
  );
}
