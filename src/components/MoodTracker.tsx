import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { MoodButton } from "./MoodButton";
import { MoodQuotes } from "./MoodQuotes";
import { TherapistSection } from "./TherapistSection";
import { MoodAnalytics } from "./MoodAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Heart, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "./ThemeToggle";

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
  const { user } = useUser();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load moods from database on mount
  useEffect(() => {
    if (user?.id) {
      loadMoods();
    }
  }, [user?.id]);

  const loadMoods = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error loading moods:', error);
      toast({
        title: "Error loading moods",
        description: "Could not load your mood history.",
        variant: "destructive",
      });
    } else if (data) {
      const entries: MoodEntry[] = data.map(item => ({
        mood: item.mood as MoodType,
        timestamp: new Date(item.timestamp),
      }));
      setMoodEntries(entries);
    }
    setIsLoading(false);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = async () => {
    if (selectedMood && user?.id) {
      const timestamp = new Date();
      
      // Save to database
      const { error } = await supabase
        .from('moods')
        .insert({
          user_id: user.id,
          mood: selectedMood,
          timestamp: timestamp.toISOString(),
        });

      if (error) {
        console.error('Error saving mood:', error);
        toast({
          title: "Error saving mood",
          description: "Could not save your mood. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      const newEntry: MoodEntry = {
        mood: selectedMood,
        timestamp,
      };
      setMoodEntries([newEntry, ...moodEntries]);
      
      toast({
        title: "Mood logged successfully! 🌟",
        description: "Your mood has been recorded for today.",
      });
      
      // Don't clear selectedMood to show the quote
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
        {/* Header with Theme Toggle */}
        <div className="text-center mb-8 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Wellness Tracker</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Take a moment to check in with yourself. Track your journey to better mental health.
          </p>
        </div>

        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Mood
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="therapists" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Therapists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-8">
            {/* Main Mood Selection */}
            <Card className="max-w-2xl mx-auto shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
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
                
                {selectedMood && !moodEntries.some(entry => 
                  entry.mood === selectedMood && 
                  new Date(entry.timestamp).toDateString() === new Date().toDateString()
                ) && (
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

            {/* Motivational Quote */}
            {selectedMood && (
              <div className="max-w-2xl mx-auto animate-fade-in">
                <MoodQuotes mood={selectedMood} />
              </div>
            )}

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
              <Card className="max-w-2xl mx-auto shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {moodEntries.slice(0, 5).map((entry, index) => {
                      const moodInfo = moods.find(m => m.type === entry.mood);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="analytics">
            <MoodAnalytics moodEntries={moodEntries} />
          </TabsContent>

          <TabsContent value="therapists">
            <TherapistSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};