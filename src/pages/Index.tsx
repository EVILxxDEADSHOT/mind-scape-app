import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { MoodTracker } from "@/components/MoodTracker";

const Index = () => {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Wellness Tracker
              </h1>
              <p className="text-muted-foreground">Track your mood, find your balance</p>
            </div>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-wellness"
                }
              }}
            />
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="relative">
          <MoodTracker />
          
          {/* User button in top right */}
          <div className="fixed top-4 right-4 z-50">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Index;
