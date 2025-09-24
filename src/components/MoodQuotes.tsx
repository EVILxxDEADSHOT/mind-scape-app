import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

type MoodType = "happy" | "sad" | "angry" | "anxious" | "calm";

const moodQuotes = {
  happy: [
    "Your joy is contagious! Keep spreading that beautiful energy. ✨",
    "Happiness looks amazing on you. Embrace this wonderful feeling! 🌟",
    "You're radiating positivity today. Let this light guide your path! 🌞"
  ],
  sad: [
    "It's okay to feel sad. Every emotion is valid, and this feeling will pass. 🌙",
    "Your tears water the seeds of your growth. Be gentle with yourself today. 🌱",
    "Even clouds pass away to reveal the sun. You're stronger than you know. ☁️"
  ],
  angry: [
    "Your anger shows you care deeply. Channel this energy into positive change. 🔥",
    "Take a deep breath. This feeling is temporary, but your peace is permanent. 🌊",
    "Anger can be a teacher. What is it trying to tell you about your boundaries? 💪"
  ],
  anxious: [
    "You've survived 100% of your difficult days so far. You're doing amazing. 🦋",
    "Breathe deeply. You are safe in this moment, and you have the strength to handle whatever comes. 🌸",
    "Anxiety is not your enemy - it's trying to protect you. Thank it, then let it go. 🍃"
  ],
  calm: [
    "Your inner peace is your superpower. Carry this serenity with you. 🧘‍♀️",
    "In stillness, you find your truest self. This calm is your natural state. 🌊",
    "You are the eye of your own storm - centered, peaceful, and unshakeable. ⭐"
  ]
};

interface MoodQuotesProps {
  mood: MoodType;
  className?: string;
}

export const MoodQuotes = ({ mood, className = "" }: MoodQuotesProps) => {
  const quotes = moodQuotes[mood];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card className={`shadow-wellness border-0 bg-gradient-mood backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Quote className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-foreground/90 italic leading-relaxed">
              "{randomQuote}"
            </p>
            <div className="mt-3 text-right">
              <span className="text-sm text-muted-foreground">— Your Wellness Companion</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};