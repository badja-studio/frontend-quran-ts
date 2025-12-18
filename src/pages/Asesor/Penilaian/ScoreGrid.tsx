import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { CategoryType } from "./type";

interface Props {
  category: CategoryType;
  list: string[];
  mistakes: { [key in CategoryType]?: { [key: string]: number } };
  handleScore: (
    category: CategoryType,
    key: string,
    type: "plus" | "minus"
  ) => void;
  locked?: boolean;
}

const ScoreGrid: React.FC<Props> = ({
  category,
  list,
  mistakes,
  handleScore,
}) => {
  const sortedList = [...list];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
        gap: 0.5,
        width: "100%",
        direction: "rtl", // grid mulai dari kanan
        gridAutoFlow: "row",
      }}
    >
      {sortedList.map((item) => {
        const value = mistakes?.[category]?.[item] ?? 0;

        return (
          <Paper
            key={item}
            sx={{
              p: 1,
              textAlign: "center",
              borderRadius: 1.5,
              position: "relative",
              transition: "0.2s",
              bgcolor: value === 0 ? "white" : value === 1 ? "red" : "blue", // Jika salah 2 → jadi biru
            }}
            elevation={2}
          >
            {/* Badge Mistakes di pojok kiri atas */}
            {value > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "#A5D6A7",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 700,
                  zIndex: 5,
                  boxShadow: 2,
                }}
              >
                {value}
              </Box>
            )}

            <Typography
              className="arabic-text"
              fontWeight={700}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: value > 0 ? "white" : "primary.main",
                fontSize:
                  item.length > 14
                    ? "0.85rem"
                    : item.length > 7
                    ? "0.9rem"
                    : item.length > 5
                    ? "1rem"
                    : "1.4rem",
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              {item}
            </Typography>

            <Box mt={0.5} display="flex" justifyContent="center" gap={0.5}>
              <Button
                size="small"
                sx={{
                  minWidth: 24,
                  p: 0,
                  borderRadius: 1,
                  fontSize: "1.5rem",
                  color: value > 0 ? "white" : "primary.main",
                }}
                onClick={() => handleScore(category, item, "minus")}
              >
                –
              </Button>
              <Button
                size="small"
                sx={{
                  minWidth: 24,
                  p: 0,
                  borderRadius: 1,
                  fontSize: "1.3rem",
                  color: value > 0 ? "white" : "primary.main",
                }}
                onClick={() => handleScore(category, item, "plus")}
              >
                +
              </Button>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default ScoreGrid;
