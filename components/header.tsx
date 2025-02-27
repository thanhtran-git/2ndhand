import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { ZipCodeInput } from "@/components/zipcode-input";
import { Profile } from "@/components/profile";
import { NavLinks } from "@/components/nav-links";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#86B817] pb-2 pt-2">
      <div className="container flex flex-col gap-2 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">2ndhand.de</span>
          </Link>
          <Profile />
        </div>

        <div className="flex gap-2">
          <SearchInput />
          <ZipCodeInput />
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
