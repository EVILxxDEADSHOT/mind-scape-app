import { useState } from "react";
import { MoodButton } from "./MoodButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MoodType = "happy" | "sad" | "angry" | "anxious" | "calm";

interface MoodEntry {
  mood: MoodType;
  timestamp: Date;
}

const moods = [
  { type: "happy" as const, emoji: "😊", label: "Happy" },
  { type: "sad" as const, emoji: "😢", label: "Sad" },
  { type: "angry" as const, emoji: "😠", label: "Angry" },
  { type: "anxious" as const, emoji: "😰", label: "Anxious" },
  { type: "calm" as const, emoji: "😌", label: "Calm" },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        timestamp: new Date(),
      };
      setMoodEntries([newEntry, ...moodEntries]);
      setSelectedMood(null);
      
      toast({
        title: "Mood logged successfully! 🌟",
        description: "Your mood has been recorded for today.",
      });
    }
  };

  const getRecentMoodEmoji = () => {
    if (moodEntries.length === 0) return "💭";
    const recentMood = moodEntries[0].mood;
    return moods.find(m => m.type === recentMood)?.emoji || "💭";
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Wellness Tracker</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Take a moment to check in with yourself. How are you feeling right now?
          </p>
        </div>

        {/* Main Mood Selection */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">How are you feeling?</CardTitle>
            <p className="text-sm text-muted-foreground">Select your current mood</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {moods.map((mood) => (
                <MoodButton
                  key={mood.type}
                  mood={mood.type}
                  emoji={mood.emoji}
                  label={mood.label}
                  isSelected={selectedMood === mood.type}
                  onClick={() => handleMoodSelect(mood.type)}
                />
              ))}
            </div>
            
            {selectedMood && (
              <div className="text-center">
                <Button 
                  onClick={handleSaveMood}
                  className="bg-gradient-wellness hover:opacity-90 text-primary-foreground px-8 py-2 rounded-full shadow-wellness transition-all duration-300"
                >
                  Log My Mood
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Entries & Stats */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Recent Mood */}
          <Card className="shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl mb-2">{getRecentMoodEmoji()}</div>
                <p className="text-muted-foreground">
                  {moodEntries.length === 0 
                    ? "No mood logged yet" 
                    : `Last logged: ${moodEntries[0].timestamp.toLocaleDateString()}`
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mood Stats */}
          <Card className="shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {moodEntries.length}
                </div>
                <p className="text-muted-foreground">
                  {moodEntries.length === 1 ? "mood entry" : "mood entries"} logged
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Keep tracking for better insights!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood History */}
        {moodEntries.length > 0 && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodEntries.slice(0, 5).map((entry, index) => {
                  const moodInfo = moods.find(m => m.type === entry.mood);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{moodInfo?.emoji}</span>
                        <span className="font-medium">{moodInfo?.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {entry.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};