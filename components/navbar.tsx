import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="mx-auto sticky top-0 z-50 w-full border-b bg-[#86B817] pb-2 pt-2">
        <div className="container flex flex-col gap-2 mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">2ndhand.de</span>
            </Link>
            <Link
              href="mein-konto"
              className="text-xl font-bold text-white hover:underline"
            >
              Mein Konto
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
