import React from "react";
import { Card, Box, Typography, Paper, Divider, Button } from "@mui/material";
import ScoreGrid from "./ScoreGrid";

interface Props {
  title: string;
  category: string;
  list: string[];

  // MODE COUNTER
  mistakes?: { [key: string]: { [key: string]: number } };
  totalScore?: (cat: string) => number;
  handleScore?: (category: string, key: string, type: string) => void;

  // MODE SELECT
  isSelect?: boolean;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
}

const ScoreSection: React.FC<Props> = ({
  title,
  category,
  list,
  mistakes,
  totalScore,
  handleScore,

  isSelect = false,
  selectedValue,
  onSelect,
}) => {
  // -------- MODE SELECT ----------
  if (isSelect) {
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
        <Typography fontWeight={700} fontSize="clamp(1rem, 1.8vw, 1.2rem)">
          {title}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexWrap="wrap" gap={1}>
          {list.map((item) => (
            <Button
              key={item}
              variant={selectedValue === item ? "contained" : "outlined"}
              color="primary"
              size="small"
              onClick={() => onSelect && onSelect(item)}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Card>
    );
  }

  // -------- MODE COUNTER ----------
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
            {totalScore ? totalScore(category)?.toFixed(2) : "0"}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <ScoreGrid
        category={category}
        list={list}
        mistakes={mistakes!}
        handleScore={handleScore!}
      />
    </Card>
  );
};

export default ScoreSection;
