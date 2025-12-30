import React from "react";
import { Card, Box, Typography, Paper, Divider, Button } from "@mui/material";
import ScoreGrid from "./ScoreGrid";
import { CategoryType } from "./type";

interface Props {
  title: string;
  category: CategoryType;
  list: string[];

  // MODE COUNTER
  mistakes?: { [key in CategoryType]?: { [key: string]: number } };
  totalScore?: (cat: CategoryType) => number;
  handleScore?: (
    category: CategoryType,
    key: string,
    type: "plus" | "minus"
  ) => void;

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
  if (isSelect) {
    return (
      <Card
        sx={{
          mb: 2.5,
          p: 2.5,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid",
          borderColor: "grey.200",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Typography
          fontWeight={600}
          fontSize="clamp(1rem, 1.8vw, 1.2rem)"
          sx={{
            color: "grey.900",
            mb: 2,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "grey.200" }} />

        <Box display="flex" flexWrap="wrap" gap={1.5}>
          {list.map((item) => (
            <Button
              key={item}
              variant={selectedValue === item ? "contained" : "outlined"}
              size="medium"
              onClick={() => onSelect?.(item)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                px: 2.5,
                py: 0.75,
                fontSize: "0.938rem",
                ...(selectedValue === item
                  ? {
                      bgcolor: "grey.900",
                      color: "white",
                      "&:hover": {
                        bgcolor: "grey.800",
                      },
                    }
                  : {
                      borderColor: "grey.300",
                      color: "grey.700",
                      "&:hover": {
                        borderColor: "grey.400",
                        bgcolor: "grey.50",
                      },
                    }),
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        mb: 2.5,
        p: 2.5,
        borderRadius: 3,
        bgcolor: "white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "grey.200",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        mb={2}
        gap={2}
      >
        <Typography
          fontWeight={600}
          fontSize="clamp(1rem, 1.8vw, 1.2rem)"
          sx={{
            color: "grey.900",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: 2,
            bgcolor: "grey.50",
            border: "1.5px solid",
            borderColor: "grey.200",
            textAlign: "center",
            minWidth: 80,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "grey.100",
              borderColor: "grey.300",
            },
          }}
        >
          <Typography
            fontSize="clamp(0.875rem, 1.3vw, 1.063rem)"
            fontWeight={700}
            sx={{
              color: "grey.900",
              letterSpacing: "-0.01em",
            }}
          >
            {totalScore ? totalScore(category).toFixed(2) : "0.00"}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ mb: 2, borderColor: "grey.200" }} />

      <ScoreGrid
        category={category}
        list={list}
        mistakes={mistakes ?? {}}
        handleScore={handleScore!}
      />
    </Card>
  );
};

export default ScoreSection;
