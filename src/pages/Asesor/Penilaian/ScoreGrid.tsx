import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { CategoryType } from "../../../utils/utils";

interface Props {
  category: CategoryType;
  list: string[];
  mistakes: { [key in CategoryType]?: { [key: string]: number } };
  handleScore: (
    category: CategoryType,
    key: string,
    type: "plus" | "minus"
  ) => void;
}

const ScoreGrid: React.FC<Props> = ({
  category,
  list,
  mistakes,
  handleScore,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
        gap: 0.5,
        width: "100%",
      }}
    >
      {list.map((item) => (
        <Paper
          key={item}
          sx={{
            p: 1,
            textAlign: "center",
            borderRadius: 1.5,
            bgcolor: "white",
          }}
          elevation={1}
        >
          <Typography
            className="arabic-text"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",

              fontSize:
                item.length > 7 ? "0.8rem" : "clamp(0.85rem, 1vw, 1rem)",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {item}
          </Typography>

          <Typography
            fontSize="clamp(0.5rem, 1vw, 0.7rem)"
            color="primary.main"
            fontWeight={600}
            sx={{ mt: 1 }}
          >
            {mistakes[category]?.[item] ?? 0}
          </Typography>

          <Box mt={0.5} display="flex" justifyContent="center" gap={0.5}>
            <Button
              size="small"
              sx={{ minWidth: 24, p: 0, borderRadius: 1 }}
              onClick={() => handleScore(category, item, "minus")}
            >
              –
            </Button>
            <Button
              size="small"
              sx={{ minWidth: 24, p: 0, borderRadius: 1 }}
              onClick={() => handleScore(category, item, "plus")}
            >
              +
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ScoreGrid;
