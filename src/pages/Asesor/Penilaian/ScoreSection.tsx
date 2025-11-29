import React from "react";
import { Card, Box, Typography, Paper, Divider } from "@mui/material";
import ScoreGrid from "./ScoreGrid";

interface Props {
  title: string;
  category: string;
  list: string[];
  mistakes: { [key: string]: { [key: string]: number } };
  totalScore: (cat: string) => number;
  handleScore: (category: string, key: string, type: string) => void;
}

const ScoreSection: React.FC<Props> = ({
  title,
  category,
  list,
  mistakes,
  totalScore,
  handleScore,
}) => {
  return (
    <Card
      sx={{
        mb: 2,
        p: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.300",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        mb={1}
        gap={1}
      >
        <Typography fontWeight={700} fontSize="clamp(1rem, 1.8vw, 1.2rem)">
          {title}
        </Typography>

        <Paper
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "grey.100",
            border: "1px solid",
            borderColor: "grey.300",
            textAlign: "center",
          }}
        >
          <Typography fontSize="clamp(0.8rem, 1.3vw, 1rem)" fontWeight={600}>
            {totalScore(category).toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <ScoreGrid
        category={category}
        list={list}
        mistakes={mistakes}
        handleScore={handleScore}
      />
    </Card>
  );
};

export default ScoreSection;
