import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MoodButtonProps {
  mood: "happy" | "sad" | "angry" | "anxious" | "calm";
  emoji: string;
  label: string;
  isSelected?: boolean;
  onClick: () => void;
}

const moodStyles = {
  happy: "bg-mood-happy/20 hover:bg-mood-happy/30 border-mood-happy/50 text-mood-happy",
  sad: "bg-mood-sad/20 hover:bg-mood-sad/30 border-mood-sad/50 text-mood-sad",
  angry: "bg-mood-angry/20 hover:bg-mood-angry/30 border-mood-angry/50 text-mood-angry",
  anxious: "bg-mood-anxious/20 hover:bg-mood-anxious/30 border-mood-anxious/50 text-mood-anxious",
  calm: "bg-mood-calm/20 hover:bg-mood-calm/30 border-mood-calm/50 text-mood-calm",
};

const selectedStyles = {
  happy: "bg-mood-happy/40 border-mood-happy shadow-mood scale-105",
  sad: "bg-mood-sad/40 border-mood-sad shadow-mood scale-105", 
  angry: "bg-mood-angry/40 border-mood-angry shadow-mood scale-105",
  anxious: "bg-mood-anxious/40 border-mood-anxious shadow-mood scale-105",
  calm: "bg-mood-calm/40 border-mood-calm shadow-mood scale-105",
};

export const MoodButton = ({ mood, emoji, label, isSelected, onClick }: MoodButtonProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 h-24 w-24 rounded-2xl border-2 transition-all duration-300 ease-in-out transform hover:scale-105",
        moodStyles[mood],
        isSelected && selectedStyles[mood]
      )}
    >
      <span className="text-2xl" role="img" aria-label={label}>
        {emoji}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};