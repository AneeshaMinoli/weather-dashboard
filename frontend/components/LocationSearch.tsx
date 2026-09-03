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
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 w-full">
        <Search size={14} className="opacity-70 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a place in Sri Lanka"
          className="bg-transparent outline-none text-sm placeholder:text-white/60 w-full"
        />
      </div>
    </form>
  );
}