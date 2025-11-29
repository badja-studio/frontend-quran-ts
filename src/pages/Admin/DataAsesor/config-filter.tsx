import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataAsesor } from "./type";

export const filterConfigs: FilterConfig<DataAsesor>[] = [
  {
    key: "name",
    label: "Nama Asesor",
    type: "text",
    operators: ["contains", "startsWith", "endsWith", "equals",],
  },
  {
    key: "username",
    label: "Username",
    type: "text",
    operators: ["equals", "contains", "startsWith"],
  },
  {
    key: "no_telepon",
    label: "No. Telepon",
    type: "text",
    operators: ["contains", "startsWith", "equals"],
  },
  {
    key: "email",
    label: "Email",
    type: "text",
    operators: ["contains", "startsWith", "endsWith"],
  },
  {
    key: "link_grup_wa",
    label: "Link WhatsApp",
    type: "text",
    operators: ["contains"],
  },
  {
    key: "total_peserta_selesai_asesmen",
    label: "Total Peserta Selesai Asesmen",
    type: "text",
    operators: ["equals"],
  },
  {
    key: "total_peserta_belum_asesmen",
    label: "Total Beserta Belum Asesmen",
    type: "text",
    operators: ["equals"],
  },
];
