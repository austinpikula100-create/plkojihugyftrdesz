import { Search, Mic } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export function SearchInput({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto group relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 sm:h-14 pl-12 pr-12 rounded-full border border-border/60 hover:border-transparent focus:border-transparent bg-white text-base sm:text-lg shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 outline-none placeholder:text-muted-foreground/50 search-shadow search-shadow-hover"
        placeholder="Search Rivo or type a URL"
      />
      
      <button 
        type="button"
        className="absolute inset-y-0 right-4 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <Mic className="w-5 h-5" />
      </button>
    </form>
  );
}
