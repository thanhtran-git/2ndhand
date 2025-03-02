"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewCard from "@/components/PreviewCard";
import { ClassifiedAd } from "@/lib/types";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<ClassifiedAd[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const res = await fetch(`/api/classifiedads?query=${query}`);
      const data = await res.json();
      setResults(data);
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query, category]);

  return (
    <>
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white p-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Was suchst du?"
          className="border-0 focus-visible:ring-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px] border-0 focus:ring-0">
            <SelectValue placeholder="Alle Kategorien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            <SelectItem value="auto">Auto, Rad & Boot</SelectItem>
            <SelectItem value="immobilien">Immobilien</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-4">
          {results.map((ad) => (
            <PreviewCard key={ad.id} {...ad} />
          ))}
        </div>
      )}
    </>
  );
}
