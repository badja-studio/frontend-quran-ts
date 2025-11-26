import { FilterConfig } from "../../../components/Table/DataTableFilter";
import { DataAsesor } from "./type";

export const filterConfigs: FilterConfig<DataAsesor>[] = [
  {
    key: "nama",
    label: "Nama",
    type: "text",
    operators: ["contains", "startsWith", "endsWith"],
  },
  {
    key: "username",
    label: "Username",
    type: "text",
    operators: ["equals", "contains", "startsWith"],
  },
  {
    key: "no_telp",
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
    key: "link_wa",
    label: "Link WhatsApp",
    type: "text",
    operators: ["contains"],
  },
  {
    key: "belum",
    label: "Belum Dinilai",
    type: "text",
    operators: ["equals"],
  },
  {
    key: "sudah",
    label: "Sudah Dinilai",
    type: "text",
    operators: ["equals"],
  },
];
