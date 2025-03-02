import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ZipCodeInput() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white p-2">
      <MapPin className="h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder="PLZ oder Ort"
        className="w-[180px] border-0 p-0 focus-visible:ring-0"
      />
    </div>
  );
}
