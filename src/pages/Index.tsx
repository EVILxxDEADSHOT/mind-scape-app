import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { MoodTracker } from "@/components/MoodTracker";

const Index = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="relative">
      <MoodTracker />
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-wellness"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Index;
