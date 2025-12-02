import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export interface MakharijItem {
  name: string;
  total: number;
}

interface ProcessedItem extends MakharijItem {
  percent: string;
}

interface MetrixGridTableProps {
  title: string;
  data: MakharijItem[];
  headerColor?: string;
  itemsPerRow?: number; // default 2 item per baris
}

const MetrixGridTable: React.FC<MetrixGridTableProps> = ({
  title,
  data,
  headerColor = "#009688",
  itemsPerRow = 2,
}) => {
  // Total keseluruhan
  const totalKesalahan = useMemo(
    () => data.reduce((sum, item) => sum + item.total, 0),
    [data]
  );

  // Tambahkan persentase ke masing-masing item
  const processedData: ProcessedItem[] = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        percent: totalKesalahan
          ? ((item.total / totalKesalahan) * 100).toFixed(2)
          : "0",
      })),
    [data, totalKesalahan]
  );

  // Fungsi pecah data menjadi beberapa baris
  const chunk = <T,>(arr: T[], size: number): T[][] =>
    arr.reduce((rows: T[][], item, index) => {
      const rowIndex = Math.floor(index / size);
      rows[rowIndex] = rows[rowIndex] || [];
      rows[rowIndex].push(item);
      return rows;
    }, [] as T[][]);

  const rows = chunk(processedData, itemsPerRow);

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: headerColor }}>
          <TableRow>
            <TableCell colSpan={itemsPerRow * 2}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {title}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Total: {totalKesalahan.toLocaleString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                "&:hover": { backgroundColor: "#e0f7fa" },
              }}
            >
              {row.map((item, idx) => (
                <React.Fragment key={idx}>
                  <TableCell sx={{ px: 1.5, py: 1, fontSize: 15 }}>
                    {item.name}
                  </TableCell>
                  <TableCell
                    sx={{ px: 1.5, py: 1, fontSize: 13 }}
                    align="right"
                  >
                    {item.percent} %
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetrixGridTable;
