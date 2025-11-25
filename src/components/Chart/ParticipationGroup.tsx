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
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((item, i) => (
        <StatParticipationCard
          key={i}
          title={item.title}
          total={item.total}
          done={item.done}
          color={item.color}
        />
      ))}
    </div>
  );
}
