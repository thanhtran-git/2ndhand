"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarOn = ["/"];

  if (hideNavbarOn.includes(pathname)) return null;

  return <Navbar />;
}
