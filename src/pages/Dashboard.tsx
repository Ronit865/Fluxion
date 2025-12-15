import { MainLayout } from '@/components/layout/MainLayout';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { FocusCard } from '@/components/dashboard/FocusCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DeadlinesCard } from '@/components/dashboard/DeadlinesCard';
import { HeatmapCard } from '@/components/dashboard/HeatmapCard';
import { useRoutine } from '@/hooks/useRoutine';
import { useRoutineCompletion } from '@/hooks/useRoutineCompletion';
import { useFocusTimer } from '@/hooks/useFocusTimer';
import { CheckCircle2, Flame, Clock, Target } from 'lucide-react';

export default function Dashboard() {
  const { blocks } = useRoutine();
  const {
    todayRoutineTasks,
    todayCompletedCount,
    toggleRoutineTaskCompletion,
    currentStreak,
    completions,
  } = useRoutineCompletion(blocks);
  const {
    sessions,
    isRunning,
    currentSeconds,
    currentCategory,
    todayFocusMinutes,
    weekFocusMinutes,
    startTimer,
    stopTimer,
    setCurrentCategory,
    formatTime,
  } = useFocusTimer();

  const formatHours = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  // Convert routine tasks to Task-like format for DeadlinesCard
  // Since routine tasks don't have deadlines, we show upcoming tasks by time
  const upcomingTasks = todayRoutineTasks
    .filter((t) => !t.completed)
    .slice(0, 5)
    .map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category === 'break' ? 'personal' as const : t.category,
      completed: t.completed,
      deadline: undefined,
      createdAt: new Date().toISOString(),
    }));

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display text-foreground mb-1">Good day!</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 auto-rows-min">
        {/* Task Card - Shows today's routine tasks */}
        <TaskCard
          routineTasks={todayRoutineTasks}
          completedCount={todayCompletedCount}
          onToggle={toggleRoutineTaskCompletion}
        />

        {/* Focus Timer Card */}
        <FocusCard
          isRunning={isRunning}
          currentSeconds={currentSeconds}
          currentCategory={currentCategory}
          todayFocusMinutes={todayFocusMinutes}
          onStart={startTimer}
          onStop={stopTimer}
          onCategoryChange={setCurrentCategory}
          formatTime={formatTime}
        />

        {/* Stats Cards */}
        <StatsCard
          title="Tasks Completed"
          value={todayCompletedCount}
          subtitle="today"
          icon={CheckCircle2}
          colorVariant="peach"
          delay={2}
        />

        <StatsCard
          title="Current Streak"
          value={currentStreak}
          subtitle={currentStreak === 1 ? 'day' : 'days'}
          icon={Flame}
          colorVariant="pink"
          delay={3}
        />

        {/* Deadlines Card - Shows upcoming uncompleted tasks */}
        <DeadlinesCard deadlines={upcomingTasks} delay={4} />

        {/* Weekly Focus */}
        <StatsCard
          title="Weekly Focus"
          value={formatHours(weekFocusMinutes)}
          subtitle="this week"
          icon={Clock}
          colorVariant="blue"
          delay={5}
        />

        {/* Heatmap Card - Uses routine completions */}
        <HeatmapCard 
          tasks={[]} 
          sessions={sessions} 
          routineCompletions={completions}
          delay={6} 
        />

        {/* Goal Card */}
        <StatsCard
          title="Daily Goal"
          value={`${Math.round((todayFocusMinutes / 120) * 100)}%`}
          subtitle="2h target"
          icon={Target}
          colorVariant="green"
          delay={7}
        />
      </div>
    </MainLayout>
  );
}
