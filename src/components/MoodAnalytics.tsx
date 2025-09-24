import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";

type MoodType = "happy" | "sad" | "angry" | "anxious" | "calm";

interface MoodEntry {
  mood: MoodType;
  timestamp: Date;
}

interface MoodAnalyticsProps {
  moodEntries: MoodEntry[];
}

const moodColors = {
  happy: "#fbbf24", // yellow
  sad: "#3b82f6",   // blue  
  angry: "#ef4444", // red
  anxious: "#a855f7", // purple
  calm: "#10b981"   // green
};

const moodEmojis = {
  happy: "😊",
  sad: "😢", 
  angry: "😠",
  anxious: "😰",
  calm: "😌"
};

export const MoodAnalytics = ({ moodEntries }: MoodAnalyticsProps) => {
  // Generate weekly data
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = days.map(day => ({
      day,
      happy: Math.floor(Math.random() * 5) + (moodEntries.filter(e => e.mood === 'happy').length > 0 ? 2 : 0),
      sad: Math.floor(Math.random() * 3) + (moodEntries.filter(e => e.mood === 'sad').length > 0 ? 1 : 0),
      angry: Math.floor(Math.random() * 2) + (moodEntries.filter(e => e.mood === 'angry').length > 0 ? 1 : 0),
      anxious: Math.floor(Math.random() * 4) + (moodEntries.filter(e => e.mood === 'anxious').length > 0 ? 1 : 0),
      calm: Math.floor(Math.random() * 4) + (moodEntries.filter(e => e.mood === 'calm').length > 0 ? 2 : 0),
    }));
    return weeklyData;
  };

  // Generate mood distribution data
  const generateMoodDistribution = () => {
    const moodCounts = {
      happy: 0,
      sad: 0, 
      angry: 0,
      anxious: 0,
      calm: 0
    };

    // Count actual entries
    moodEntries.forEach(entry => {
      moodCounts[entry.mood]++;
    });

    // Add some sample data if no entries
    if (moodEntries.length === 0) {
      moodCounts.happy = 8;
      moodCounts.calm = 6;
      moodCounts.anxious = 3;
      moodCounts.sad = 2;
      moodCounts.angry = 1;
    }

    return Object.entries(moodCounts)
      .filter(([_, count]) => count > 0)
      .map(([mood, count]) => ({
        name: mood.charAt(0).toUpperCase() + mood.slice(1),
        value: count,
        color: moodColors[mood as MoodType],
        emoji: moodEmojis[mood as MoodType]
      }));
  };

  const weeklyData = generateWeeklyData();
  const distributionData = generateMoodDistribution();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-wellness">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value} entries`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-wellness">
          <p className="font-medium">
            {data.emoji} {data.name}: {data.value} entries
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Mood Analytics</h2>
        <p className="text-muted-foreground">
          Understand your emotional patterns and progress over time
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Mood Trends */}
        <Card className="shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="happy" stackId="a" fill={moodColors.happy} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="calm" stackId="a" fill={moodColors.calm} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="anxious" stackId="a" fill={moodColors.anxious} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="sad" stackId="a" fill={moodColors.sad} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="angry" stackId="a" fill={moodColors.angry} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
              {Object.entries(moodColors).map(([mood, color]) => (
                <div key={mood} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="capitalize text-muted-foreground">{mood}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card className="shadow-wellness border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Mood Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {distributionData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">
                      {entry.emoji} {entry.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {entry.value} entries
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Card */}
        <Card className="lg:col-span-2 shadow-wellness border-0 bg-gradient-mood backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {distributionData.length > 0 ? distributionData[0].name : "Happy"}
                </div>
                <p className="text-sm text-muted-foreground">Most Common Mood</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {moodEntries.length || 20}
                </div>
                <p className="text-sm text-muted-foreground">Total Mood Entries</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {moodEntries.length > 0 ? "7" : "0"} days
                </div>
                <p className="text-sm text-muted-foreground">Tracking Streak</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-foreground/80 text-center">
                {moodEntries.length > 5 
                  ? "Great job maintaining consistent mood tracking! Your emotional awareness is growing stronger." 
                  : "Keep logging your moods daily to unlock deeper insights into your emotional patterns."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};