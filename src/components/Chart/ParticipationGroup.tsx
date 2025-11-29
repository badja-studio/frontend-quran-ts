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
    <>
      {items.map((item, i) => (
        <Grid
          item // ← PENTING
          key={i}
          xs={6} // HP → 2 kolom
          sm={4} // Tablet → 3 kolom
          md={2} // Desktop → 6 kolom
        >
          <StatParticipationCard
            title={item.title}
            total={item.total}
            done={item.done}
            color={item.color}
          />
        </Grid>
      ))}
    </>
  );
}
