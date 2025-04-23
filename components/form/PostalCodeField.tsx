"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { toast, Toaster } from "sonner";

const postalCodeSchema = z
  .string()
  .length(5, "Die Postleitzahl muss genau 5 Ziffern lang sein.")
  .refine((val) => /^\d+$/.test(val), {
    message: "Die Postleitzahl darf nur Zahlen enthalten.",
  });

export default function PostalCodeField() {
  const [postalCode, setPostalCode] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const validation = postalCodeSchema.safeParse(postalCode);

      if (validation.success) {
        const searchParam = new URLSearchParams({ postalCode }).toString();
        router.push(`/results?${searchParam}`);
      } else {
        console.log(validation);
        toast.error(validation.error.errors[0].message);
      }
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex items-center gap-2 rounded-full bg-white p-2">
        <MapPin className="h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="PLZ eingeben"
          className="!shadow-none w-[180px] border-0 p-0 focus-visible:ring-0"
          onKeyDown={handleSearch}
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
        />
      </div>
    </>
  );
}
