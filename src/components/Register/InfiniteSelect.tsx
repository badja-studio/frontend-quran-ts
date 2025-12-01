import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api.config";

export interface BaseItem {
  id: number;
  nama: string;
}

interface Props {
  label: string;
  url: string;
  value: BaseItem | null;
  onChange: (v: BaseItem | null) => void;
  disabled?: boolean;
}

export default function InfiniteSelect({
  label,
  url,
  value,
  onChange,
  disabled,
}: Props) {
  const query = useQuery({
    queryKey: ["inf-select", url],
    enabled: url.length > 0,
    queryFn: async () => {
      const res = await api.get(url);

      const raw = res.data;

      // Normalisasi response agar aman walaupun object / array
      if (Array.isArray(raw)) return raw as BaseItem[];

      if (typeof raw === "object" && raw !== null) {
        const found = Object.values(raw).find((v) => Array.isArray(v));
        if (Array.isArray(found)) return found as BaseItem[];
      }

      return [];
    },
  });

  return (
    <Autocomplete
      disabled={disabled}
      value={value ?? null}
      onChange={(_, v) => onChange(v ?? null)}
      options={query.data ?? []}
      loading={query.isLoading}
      getOptionLabel={(o) => o?.nama ?? ""}
      isOptionEqualToValue={(o, v) => o?.id === v?.id}
      renderInput={(params) => (
        <TextField {...params} label={label} size="small" />
      )}
    />
  );
}
