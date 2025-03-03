"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostalCodeField() {
  const [postalCode, setpostalCode] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && postalCode.trim().length > 0) {
      const searchParam = new URLSearchParams({ postalCode }).toString();
      if (postalCode) {
        router.push(`/results?${searchParam}`);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-white p-2">
      <MapPin className="h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder="PLZ oder Ort"
        className="w-[180px] border-0 p-0 focus-visible:ring-0"
        onKeyDown={handleSearch}
        onChange={(e) => setpostalCode(e.target.value)}
        value={postalCode}
      />
    </div>
  );
}
