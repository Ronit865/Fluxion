import { BentoCard } from './BentoCard';
import { CATEGORY_COLORS, TaskCategory } from '@/types/fluxion';
import { ROUTINE_CATEGORY_COLORS } from '@/types/routine';
import { Check, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { RoutineTask } from '@/hooks/useRoutineCompletion';

interface TaskCardProps {
  routineTasks: RoutineTask[];
  completedCount: number;
  onToggle: (blockId: string) => void;
}

export function TaskCard({ routineTasks, completedCount, onToggle }: TaskCardProps) {
  const progress = routineTasks.length > 0 ? (completedCount / routineTasks.length) * 100 : 0;

  const formatTime = (hour: number, minute: number) => {
    const h = hour % 12 || 12;
    const m = minute.toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${h}:${m} ${ampm}`;
  };

  const formatTimeRange = (task: RoutineTask) => {
    const startTime = formatTime(task.startHour, task.startMinute);
    const endHour = task.startHour + Math.floor(task.duration);
    const endMinute = task.startMinute + (task.duration % 1) * 60;
    const endTime = formatTime(endHour, Math.round(endMinute));
    return `${startTime} - ${endTime}`;
  };

  const getCategoryColors = (category: TaskCategory | 'break') => {
    if (category === 'break') {
      return ROUTINE_CATEGORY_COLORS.break;
    }
    return CATEGORY_COLORS[category];
  };

  return (
    <BentoCard className="col-span-2 row-span-2" colorVariant="default" delay={0}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-foreground">Today's Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {routineTasks.length} completed
          </p>
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-4" />

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {routineTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground font-medium">No tasks scheduled for today</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Head to the Routine page to plan your day
            </p>
          </div>
        ) : (
          routineTasks.map((task) => {
            const colors = getCategoryColors(task.category);
            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl transition-all group',
                  task.completed ? 'opacity-60' : 'hover:bg-muted/50'
                )}
              >
                <button
                  onClick={() => onToggle(task.blockId)}
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
                    task.completed
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground hover:border-primary'
                  )}
                >
                  {task.completed && <Check className="w-4 h-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm font-medium truncate',
                      task.completed && 'line-through text-muted-foreground'
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeRange(task)}
                  </p>
                </div>
                <span
                  className={cn(
                    'px-2 py-1 rounded-md text-xs font-medium flex-shrink-0',
                    colors.bg,
                    colors.text
                  )}
                >
                  {colors.label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </BentoCard>
  );
}
