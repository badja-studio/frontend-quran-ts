import StatCard from "./StartCard";
import { Grid } from "@mui/material";

export default function StatCardGroup({ items }: { items: any[] }) {
  return (
    <Grid container spacing={2}>
      {items.map((item, i) => (
        <Grid item xs={6} sm={4} md={2} key={i}>
          <StatCard
            value={item.value}
            label={item.label}
            color={item.color}
            icon={item.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}
