import { motion } from "framer-motion";
import { Square, Pause, Flag } from "lucide-react";

interface RecordingCardProps {
  time?: string;
  milliseconds?: string;
  fileSize?: string;
  format?: string;
  isRecording?: boolean;
}

export function RecordingCard({
  time = "02:52",
  milliseconds = "26",
  fileSize = "2.4 MB",
  format = ".WAV",
  isRecording = true,
}: RecordingCardProps) {
  return (
    <div className="relative w-full max-w-[320px]">
      {/* Notch/cutout decoration */}
      <div className="absolute -top-1 -right-1 w-12 h-8 bg-cream rounded-bl-3xl z-10" />
      <div className="absolute top-2 right-4 flex gap-1 z-20">
        <span className="w-1.5 h-1.5 bg-charcoal/60 rounded-full" />
        <span className="w-1.5 h-1.5 bg-charcoal/60 rounded-full" />
        <span className="w-1.5 h-1.5 bg-charcoal/60 rounded-full" />
      </div>

      {/* Main card */}
      <div 
        className="relative bg-gradient-to-b from-charcoal to-[#0a0a0a] rounded-[32px] rounded-tr-[8px] p-6 overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        {/* Recording indicator */}
        <div className="flex items-center gap-2 mb-2">
          {isRecording && (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-red-500 rounded-full"
            />
          )}
          <span className="text-white/80 text-sm font-medium">Recording</span>
        </div>

        {/* Time display */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-baseline">
            <span className="text-white text-6xl font-light tracking-tight">{time}</span>
            <span className="text-white/60 text-xl ml-1 -mt-6">{milliseconds}</span>
          </div>
          <div className="bg-orange px-3 py-1 rounded-lg">
            <span className="text-charcoal text-xs font-bold">{fileSize}</span>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/50 text-sm font-medium">{format}</span>
          <div className="flex items-center gap-3">
            <NeumorphicButton icon={<Square className="w-4 h-4 text-white/70" />} />
            <NeumorphicButton icon={<Pause className="w-4 h-4 text-white/70" />} />
            <NeumorphicButton icon={<Flag className="w-4 h-4 text-white/70" />} />
          </div>
        </div>

        {/* Waveform progress bar */}
        <div className="relative h-12 bg-orange rounded-2xl overflow-hidden flex items-center px-4">
          <div className="flex items-center gap-[2px] h-full w-full">
            {Array.from({ length: 50 }).map((_, i) => {
              const height = i < 20 
                ? Math.random() * 60 + 40 
                : Math.random() * 20 + 10;
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i < 20 ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NeumorphicButton({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.05), 0 4px 8px rgba(0,0,0,0.3)'
      }}
    >
      {icon}
    </motion.button>
  );
}
