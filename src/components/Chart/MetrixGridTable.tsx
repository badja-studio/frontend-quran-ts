import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  // Hitung total keseluruhan
  const totalKesalahan = useMemo(() => {
    return data.reduce((sum, item) => sum + item.total, 0);
  }, [data]);

  // Tambah persentase
  const processedData: ProcessedItem[] = data.map((item) => ({
    ...item,
    percent: ((item.total / totalKesalahan) * 100).toFixed(2),
  }));

  // Pecah data jadi beberapa baris
  const chunk = <T,>(arr: T[], size: number): T[][] => {
    return arr.reduce((rows: T[][], item, index) => {
      const rowIndex = Math.floor(index / size);
      rows[rowIndex] = rows[rowIndex] || [];
      rows[rowIndex].push(item);
      return rows;
    }, [] as T[][]);
  };

  const rows = chunk(processedData, itemsPerRow);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: headerColor }}>
          <TableRow>
            <TableCell
              colSpan={itemsPerRow * 2}
              sx={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              {title}
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              align="right"
            >
              {((totalKesalahan / 100000) * 100).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((item, idx) => (
                <React.Fragment key={idx}>
                  <TableCell sx={{ padding: 1, fontSize: 16, width: "40%" }}>
                    {item.name}
                  </TableCell>
                  <TableCell
                    sx={{ padding: 1, width: "10%", fontSize: 9 }}
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
