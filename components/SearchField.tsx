"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      const searchParams = new URLSearchParams({
        query,
      }).toString();
      setQuery("");
      console.log(searchParams);
      router.push(`/results?${searchParams}`);
    }
  };

  return (
    <div className="flex flex-1 items-center gap-2 rounded-full bg-white p-2">
      <Search className="h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Was suchst du?"
        className="border-0 focus-visible:ring-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}
