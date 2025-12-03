import { Grid } from "@mui/material";
import StatParticipationCard from "./StatParticipationCard";

interface ParticipationItem {
  title: string;
  total: number;
  done: number;
  color: string;
}

export default function ParticipationGroup({
  items,
}: {
  items: ParticipationItem[];
}) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="stretch"
      sx={{ width: "100%", mx: "auto" }}
    >
      {items.map((item, i) => (
        <Grid
          item
          key={i}
          xs={12} // HP Portrait → 1 kartu per baris
          sm={6} // HP Landscape → 2 kartu
          md={4} // Tablet → 3 kartu
          lg={2.4} // Desktop → 5 kartu pas rapi
        >
          <StatParticipationCard
            title={item.title}
            total={item.total}
            done={item.done}
            color={item.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}
