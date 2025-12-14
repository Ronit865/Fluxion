import { useState, useMemo } from 'react';
import { RoutineBlock } from '@/types/routine';
import { Task } from '@/types/fluxion';
import { Button } from '@/components/ui/button';
import { Lightbulb, X, ChevronRight, AlertTriangle, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIGuidanceCardProps {
  blocks: RoutineBlock[];
  tasks: Task[];
  onDismiss?: (suggestionId: string) => void;
  onApply?: (suggestionId: string) => void;
}

interface Suggestion {
  id: string;
  type: 'warning' | 'tip' | 'encouragement';
  icon: typeof AlertTriangle;
  message: string;
  action?: string;
}

export function AIGuidanceCard({
  blocks,
  tasks,
  onDismiss,
  onApply,
}: AIGuidanceCardProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const suggestions = useMemo(() => {
    const result: Suggestion[] = [];
    const now = new Date();
    const currentHour = now.getHours();
    
    // Calculate metrics
    const totalScheduledHours = blocks.reduce((acc, b) => acc + b.duration, 0);
    const availableHours = 22 - Math.max(6, currentHour);
    const pendingTasks = tasks.filter(t => !t.completed && t.deadline);
    const overdueTasks = pendingTasks.filter(t => new Date(t.deadline!) < now);
    
    // Check for overdue tasks
    if (overdueTasks.length > 0) {
      result.push({
        id: 'overdue-tasks',
        type: 'warning',
        icon: AlertTriangle,
        message: `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}. Consider rescheduling or completing them today.`,
        action: 'View Tasks',
      });
    }

    // Check for overscheduling
    if (totalScheduledHours > availableHours) {
      result.push({
        id: 'overscheduled',
        type: 'warning',
        icon: AlertTriangle,
        message: `You've scheduled ${totalScheduledHours}h but only have ${availableHours}h left today. Consider postponing lower-priority items.`,
        action: 'Optimize',
      });
    }

    // Check for no breaks
    const hasBreaks = blocks.some(b => b.category === 'break');
    if (blocks.length > 3 && !hasBreaks) {
      result.push({
        id: 'no-breaks',
        type: 'tip',
        icon: Lightbulb,
        message: 'Consider adding short breaks between work sessions for better focus and productivity.',
        action: 'Add Break',
      });
    }

    // Check for morning availability
    if (currentHour < 10 && blocks.filter(b => b.startHour >= 9 && b.startHour <= 11).length === 0) {
      result.push({
        id: 'morning-slot',
        type: 'tip',
        icon: Target,
        message: 'Your morning slot (9-11 AM) is free. This is typically your peak focus time!',
        action: 'Schedule Now',
      });
    }

    // Empty schedule encouragement
    if (blocks.length === 0) {
      result.push({
        id: 'empty-schedule',
        type: 'encouragement',
        icon: Zap,
        message: 'Ready to plan your day? Start by adding your most important task first.',
        action: 'Get Started',
      });
    }

    // Good progress
    if (blocks.length >= 3 && totalScheduledHours <= availableHours) {
      result.push({
        id: 'good-progress',
        type: 'encouragement',
        icon: Zap,
        message: 'Your schedule looks balanced! You have a good mix of work and available time.',
      });
    }

    return result.filter(s => !dismissedIds.has(s.id));
  }, [blocks, tasks, dismissedIds]);

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]));
    onDismiss?.(id);
  };

  const getIconColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'warning': return 'text-destructive';
      case 'tip': return 'text-primary';
      case 'encouragement': return 'text-soft-green-foreground';
    }
  };

  const getBgColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'warning': return 'bg-destructive/10';
      case 'tip': return 'bg-primary/10';
      case 'encouragement': return 'bg-soft-green/30';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-lavender/50">
          <Lightbulb className="w-5 h-5 text-lavender-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">AI Guidance</h3>
      </div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {suggestions.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground text-center">
              No suggestions right now. You're on track! ✨
            </p>
          </div>
        ) : (
          suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <div
                key={suggestion.id}
                className={cn(
                  "p-3 rounded-xl transition-all duration-200",
                  "animate-fade-in",
                  getBgColor(suggestion.type)
                )}
              >
                <div className="flex items-start gap-2">
                  <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", getIconColor(suggestion.type))} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {suggestion.message}
                    </p>
                    {suggestion.action && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onApply?.(suggestion.id)}
                        className="h-6 px-2 mt-1.5 text-xs gap-1 hover:bg-background/50"
                      >
                        {suggestion.action}
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(suggestion.id)}
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
