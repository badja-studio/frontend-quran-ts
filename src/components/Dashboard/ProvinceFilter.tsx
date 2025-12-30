import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface ProvinceFilterProps {
  selectedProvince: string;
  provinces: string[];
  onProvinceChange: (province: string) => void;
}

const ProvinceFilter: React.FC<ProvinceFilterProps> = ({
  selectedProvince,
  provinces,
  onProvinceChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onProvinceChange(event.target.value);
  };

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", minWidth: 120 }}>
          Filter Data:
        </Typography>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="province-filter-label">Pilih Provinsi</InputLabel>
          <Select
            labelId="province-filter-label"
            id="province-filter"
            value={selectedProvince}
            label="Pilih Provinsi"
            onChange={handleChange}
          >
            <MenuItem value="ALL">
              <strong>Semua Provinsi</strong>
            </MenuItem>
            {provinces.map((province) => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedProvince !== "ALL" && (
          <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 1,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            Menampilkan: Kota/Kabupaten di {selectedProvince}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ProvinceFilter;
