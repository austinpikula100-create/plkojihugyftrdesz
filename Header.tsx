import { User, Grip, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rivo_username");
    if (stored) setUsername(stored);

    const handleStorage = () => {
      const stored = localStorage.getItem("rivo_username");
      setUsername(stored);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("rivo_username");
    setUsername(null);
    window.location.reload();
  };

  return (
    <header className="absolute top-0 right-0 p-4 sm:p-6 flex items-center gap-4 z-10">
      <Link href="/apps" className="p-3 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
        <Grip className="w-6 h-6" />
      </Link>
      
      {username ? (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium hidden sm:inline-block">Signed in as {username}</span>
          <button 
            onClick={handleSignOut}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg hover:shadow-lg transition-all active:scale-95 group relative"
          >
            {username[0].toUpperCase()}
            <div className="absolute top-full mt-2 right-0 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded border shadow-lg whitespace-nowrap">
              Click to Sign Out
            </div>
          </button>
        </div>
      ) : (
        <Link href="/signin">
          <Button variant="default" className="rounded-full px-6 font-semibold">
            Sign In
          </Button>
        </Link>
      )}
    </header>
  );
}
