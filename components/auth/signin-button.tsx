"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="bg-[#C5E86C] text-black hover:bg-[#b3d462]"
    >
      Anmelden
    </Button>
  );
}
