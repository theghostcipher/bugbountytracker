import { Stats } from "@/types";

interface ProgressStatsProps {
  stats: Stats;
}

const ProgressStats = ({ stats }: ProgressStatsProps) => {
  return (
    <div className="p-3 bg-background rounded-lg">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Progress</h2>
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-foreground">Overall Completion</span>
          <span className="text-foreground">{stats.percentage}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="p-2 bg-card rounded-md">
          <div className="text-foreground font-semibold">{stats.completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="p-2 bg-card rounded-md">
          <div className="text-foreground font-semibold">{stats.total - stats.completed}</div>
          <div className="text-xs text-muted-foreground">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
