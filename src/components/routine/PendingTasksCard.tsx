import { useMemo } from 'react';
import { Task, CATEGORY_COLORS } from '@/types/fluxion';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Calendar, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PendingTasksCardProps {
  tasks: Task[];
  onMarkComplete: (taskId: string) => void;
  onAddToTimetable: (task: Task) => void;
  onDefer: (task: Task) => void;
}

export function PendingTasksCard({
  tasks,
  onMarkComplete,
  onAddToTimetable,
  onDefer,
}: PendingTasksCardProps) {
  const pendingTasks = useMemo(() => {
    const now = new Date();
    const today = now.toDateString();
    
    return tasks
      .filter(task => {
        if (task.completed) return false;
        if (!task.deadline) return false;
        
        const deadline = new Date(task.deadline);
        return deadline <= now || deadline.toDateString() === today;
      })
      .sort((a, b) => {
        // Sort by deadline, oldest first
        return new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime();
      })
      .slice(0, 5);
  }, [tasks]);

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h overdue`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d overdue`;
  };

  if (pendingTasks.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-soft-green/50">
            <Check className="w-5 h-5 text-soft-green-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">All Caught Up!</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            No pending or missed tasks. Great job! 🎉
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-destructive/10">
          <AlertCircle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Pending Tasks</h3>
          <p className="text-xs text-muted-foreground">{pendingTasks.length} tasks need attention</p>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-3 rounded-xl border transition-all duration-200",
              "hover:shadow-md",
              isOverdue(task.deadline!) 
                ? "bg-destructive/5 border-destructive/20" 
                : "bg-soft-yellow/30 border-soft-yellow/50"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    CATEGORY_COLORS[task.category].bg,
                    CATEGORY_COLORS[task.category].text
                  )}>
                    {CATEGORY_COLORS[task.category].label}
                  </span>
                  {task.deadline && isOverdue(task.deadline) && (
                    <span className="flex items-center gap-1 text-xs text-destructive">
                      <Clock className="w-3 h-3" />
                      {formatDeadline(task.deadline)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkComplete(task.id)}
                className="h-7 px-2 text-xs gap-1 hover:bg-soft-green/50"
              >
                <Check className="w-3 h-3" />
                Done
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddToTimetable(task)}
                className="h-7 px-2 text-xs gap-1 hover:bg-primary/10"
              >
                <Calendar className="w-3 h-3" />
                Schedule
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDefer(task)}
                className="h-7 px-2 text-xs gap-1 hover:bg-muted"
              >
                <ArrowRight className="w-3 h-3" />
                Defer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
