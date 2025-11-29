import React from "react";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";

interface Props {
  category: string;
  list: string[];
  mistakes: { [key: string]: { [key: string]: number } };
  handleScore: (category: string, key: string, type: string) => void;
}

const ScoreGrid: React.FC<Props> = ({
  category,
  list,
  mistakes,
  handleScore,
}) => {
  return (
    <Grid container spacing={0.5} width="100%">
      {list.map((item) => (
        <Grid item xs={4} sm={3} md={2} key={item}>
          <Paper
            sx={{
              p: 1,
              textAlign: "center",
              borderRadius: 1.5,
              bgcolor: "white",
              height: "100%",
            }}
            elevation={1}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize:
                  item.length > 7 ? "0.65rem" : "clamp(0.85rem, 1vw, 1rem)",
                whiteSpace: "normal",
                overflowWrap: "break-word",
                lineHeight: 1.2,
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
              {mistakes[category][item]}
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
        </Grid>
      ))}
    </Grid>
  );
};

export default ScoreGrid;
