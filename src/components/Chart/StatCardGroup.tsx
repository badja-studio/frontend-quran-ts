import { Grid } from "@mui/material";
import ParticipationCard from "./StatParticipationCard";

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
    <Grid container spacing={2}>
      {items.map((item, i) => (
        <Grid
          key={i}
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4} // untuk layout 5 kolom seperti dashboard
        >
          <ParticipationCard
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
