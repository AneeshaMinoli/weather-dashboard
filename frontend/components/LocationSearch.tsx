"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function LocationSearch({ onSelect }: { onSelect: (name: string) => void }) {
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    onSelect(query.trim());
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-3 py-1.5">
        <Search size={14} className="opacity-70" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a place in Sri Lanka"
          className="bg-transparent outline-none text-sm placeholder:text-white/60 w-48"
        />
      </div>
    </form>
  );
}