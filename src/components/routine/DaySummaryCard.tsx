import { useMemo } from 'react';
import { RoutineBlock } from '@/types/routine';
import { Clock, Calendar, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface DaySummaryCardProps {
  blocks: RoutineBlock[];
  wakeHour?: number;
  sleepHour?: number;
}

export function DaySummaryCard({
  blocks,
  wakeHour = 6,
  sleepHour = 22,
}: DaySummaryCardProps) {
  const stats = useMemo(() => {
    const totalAvailableHours = sleepHour - wakeHour;
    const scheduledHours = blocks.reduce((acc, block) => acc + block.duration, 0);
    const breakHours = blocks
      .filter(block => block.category === 'break')
      .reduce((acc, block) => acc + block.duration, 0);
    const workHours = scheduledHours - breakHours;
    const freeHours = Math.max(0, totalAvailableHours - scheduledHours);
    
    return {
      totalAvailableHours,
      scheduledHours,
      workHours,
      breakHours,
      freeHours,
      utilizationPercent: Math.round((scheduledHours / totalAvailableHours) * 100),
    };
  }, [blocks, wakeHour, sleepHour]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-soft-blue/50">
          <Calendar className="w-5 h-5 text-soft-blue-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">Day Summary</h3>
      </div>

      {/* Stats */}
      <div className="flex-1 space-y-3">
        {/* Available Time */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Available</span>
          <span className="font-semibold text-foreground">{stats.totalAvailableHours}h</span>
        </div>

        {/* Scheduled */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Scheduled
          </span>
          <span className="font-semibold text-foreground">{stats.scheduledHours}h</span>
        </div>

        {/* Breaks */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5" />
            Breaks
          </span>
          <span className="font-semibold text-foreground">{stats.breakHours}h</span>
        </div>

        {/* Free Time */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Free time</span>
            <span className={cn(
              "font-semibold",
              stats.freeHours > 2 ? "text-soft-green-foreground" : 
              stats.freeHours > 0 ? "text-soft-yellow-foreground" : "text-destructive"
            )}>
              {stats.freeHours}h remaining
            </span>
          </div>
          <Progress 
            value={stats.utilizationPercent} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {stats.utilizationPercent}% of day planned
          </p>
        </div>
      </div>
    </div>
  );
}
