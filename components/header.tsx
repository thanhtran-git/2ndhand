import Link from "next/link";
import SearchInput from "@/components/SearchField";
import ZipCodeInput from "@/components/ZipcodeField";
import Profile from "@/components/Profile";
import NavLinks from "@/components/NavLinks";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#86B817] pb-2 pt-2">
      <div className="container flex flex-col gap-2 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/2ndhand-logo.png"
              alt="2ndhand-logo"
              width={150}
              height={150}
            />
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
