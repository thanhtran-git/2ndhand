import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchInput() {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-full bg-white p-2">
      <Search className="h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Was suchst du?"
        className="border-0 focus-visible:ring-0"
      />
      <Select>
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
  );
}
