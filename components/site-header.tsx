import Link from "next/link"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#86B817] pb-2 pt-2">
      <div className="container flex flex-col gap-2 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">2ndhand.de</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              Registrieren
            </Button>
            <Button className="bg-[#C5E86C] text-black hover:bg-[#b3d462]">Einloggen</Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md bg-white p-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Was suchst du?" className="border-0 p-0 focus-visible:ring-0" />
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
          <div className="flex items-center gap-2 rounded-md bg-white p-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Input type="text" placeholder="PLZ oder Ort" className="w-[180px] border-0 p-0 focus-visible:ring-0" />
          </div>
        </div>
      </div>
    </header>
  )
}