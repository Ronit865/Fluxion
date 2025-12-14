import { useMemo, useState } from 'react';
import { RoutineBlock, ROUTINE_CATEGORY_COLORS } from '@/types/routine';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Pencil, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task, TaskCategory, CATEGORY_COLORS } from '@/types/fluxion';

interface TodayTimetableProps {
  blocks: RoutineBlock[];
  tasks: Task[];
  onBlockClick: (block: RoutineBlock) => void;
  onGenerateAIPlan: () => void;
  onApplyPlan: () => void;
  isGenerating?: boolean;
}

interface TimeSlot {
  hour: number;
  block?: RoutineBlock;
  task?: Task;
  isPast: boolean;
}

export function TodayTimetable({
  blocks,
  tasks,
  onBlockClick,
  onGenerateAIPlan,
  onApplyPlan,
  isGenerating = false,
}: TodayTimetableProps) {
  const currentHour = new Date().getHours();
  
  // Generate time slots from 6 AM to 10 PM
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour <= 22; hour++) {
      const block = blocks.find(b => {
        const blockEnd = b.startHour + b.duration;
        return hour >= b.startHour && hour < blockEnd;
      });
      
      slots.push({
        hour,
        block: block?.startHour === hour ? block : undefined,
        isPast: hour < currentHour,
      });
    }
    return slots;
  }, [blocks, currentHour]);

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const getBlockHeight = (duration: number) => {
    return `${duration * 56}px`; // 56px per hour slot
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Today's Schedule</h3>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateAIPlan}
            disabled={isGenerating}
            className="gap-1.5 rounded-full text-xs"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isGenerating && "animate-spin")} />
            {isGenerating ? 'Generating...' : 'Regenerate'}
          </Button>
          <Button
            size="sm"
            onClick={onApplyPlan}
            className="gap-1.5 rounded-full text-xs"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Plan
          </Button>
        </div>
      </div>

      {/* Timetable */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="relative">
          {timeSlots.map((slot, index) => {
            // Skip slots that are covered by a multi-hour block
            const coveredByBlock = blocks.find(b => {
              const blockEnd = b.startHour + b.duration;
              return slot.hour > b.startHour && slot.hour < blockEnd;
            });
            
            if (coveredByBlock) return null;

            return (
              <div
                key={slot.hour}
                className={cn(
                  "flex gap-3 min-h-[56px] border-b border-border/50 group",
                  slot.isPast && "opacity-50"
                )}
              >
                {/* Time label */}
                <div className="w-16 flex-shrink-0 py-2 text-xs text-muted-foreground font-medium">
                  {formatHour(slot.hour)}
                </div>

                {/* Content */}
                <div className="flex-1 py-1">
                  {slot.block ? (
                    <div
                      onClick={() => onBlockClick(slot.block!)}
                      style={{ height: getBlockHeight(slot.block.duration) }}
                      className={cn(
                        "rounded-xl px-3 py-2 cursor-pointer transition-all duration-200",
                        "hover:scale-[1.02] hover:shadow-md",
                        "flex flex-col justify-between",
                        ROUTINE_CATEGORY_COLORS[slot.block.category].bg
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={cn(
                            "font-medium text-sm",
                            ROUTINE_CATEGORY_COLORS[slot.block.category].text
                          )}>
                            {slot.block.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatHour(slot.block.startHour)} - {formatHour(slot.block.startHour + slot.block.duration)}
                          </p>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          ROUTINE_CATEGORY_COLORS[slot.block.category].badge,
                          ROUTINE_CATEGORY_COLORS[slot.block.category].text
                        )}>
                          {ROUTINE_CATEGORY_COLORS[slot.block.category].label}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-end opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2"
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className={cn(
                      "h-full rounded-xl border-2 border-dashed border-border/30",
                      "flex items-center justify-center text-xs text-muted-foreground/50",
                      !slot.isPast && "hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
                    )}>
                      {!slot.isPast && "Free slot"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current time indicator */}
      {currentHour >= 6 && currentHour <= 22 && (
        <div className="mt-2 flex items-center gap-2 text-xs text-primary">
          <Clock className="w-3.5 h-3.5" />
          <span>Current time: {formatHour(currentHour)}</span>
        </div>
      )}
    </div>
  );
}
