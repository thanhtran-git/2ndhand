import Link from "next/link";
import { Tag, UserRound } from "lucide-react";
import { auth } from "@/auth";

export default async function NavLinks() {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="flex gap-5">
      <Link
        href="/form"
        className="flex flex-col pl-6 items-center text-l text-white hover:underline underline-offset-4"
      >
        <Tag className="h-6 w-6 text-white" />
        Jetzt inserieren
      </Link>
      <Link
        href="/mein-konto"
        className="flex flex-col items-center text-l text-white hover:underline underline-offset-4"
      >
        <UserRound className="h-6 w-6 text-white" />
        Mein Konto
      </Link>
    </div>
  );
}
