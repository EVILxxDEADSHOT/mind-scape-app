import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialties: ["Anxiety", "Depression", "Mindfulness"],
    rating: 4.9,
    experience: "8 years",
    approach: "Cognitive Behavioral Therapy & Mindfulness-based techniques",
    avatar: "👩‍⚕️",
    bio: "Specializing in anxiety and stress management with a gentle, evidence-based approach."
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    specialties: ["Stress Management", "Life Transitions", "Self-Esteem"],
    rating: 4.8,
    experience: "12 years",
    approach: "Humanistic & Solution-focused therapy",
    avatar: "👨‍⚕️",
    bio: "Helping individuals navigate life changes and build confidence through compassionate care."
  },
  {
    id: 3,
    name: "Dr. Emma Thompson", 
    specialties: ["Mood Disorders", "Trauma", "Wellness Coaching"],
    rating: 4.9,
    experience: "10 years",
    approach: "Trauma-informed care & Positive Psychology",
    avatar: "👩‍🔬",
    bio: "Empowering clients to heal and thrive using strength-based therapeutic approaches."
  }
];

export const TherapistSection = () => {
  const { toast } = useToast();

  const handleBookConsultation = (therapistName: string) => {
    toast({
      title: "Consultation Request Sent! 📅",
      description: `Your request to connect with ${therapistName} has been submitted. They'll reach out within 24 hours.`,
    });
  };

  const handleSendMessage = (therapistName: string) => {
    toast({
      title: "Message Sent! 💌",
      description: `Your message to ${therapistName} has been sent. You'll receive a response soon.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Connect with Professional Therapists</h2>
        <p className="text-muted-foreground">
          Take the next step in your wellness journey with expert guidance
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <Card key={therapist.id} className="shadow-wellness border-0 bg-card/80 backdrop-blur-sm hover:shadow-mood transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-3">{therapist.avatar}</div>
              <CardTitle className="text-lg">{therapist.name}</CardTitle>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{therapist.rating}</span>
                <span>•</span>
                <span>{therapist.experience}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {therapist.bio}
              </p>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-1">
                  {therapist.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Approach:</h4>
                <p className="text-xs text-muted-foreground mt-1">{therapist.approach}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleBookConsultation(therapist.name)}
                  className="flex-1 bg-gradient-wellness hover:opacity-90 text-primary-foreground"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Book
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSendMessage(therapist.name)}
                  className="flex-1"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};