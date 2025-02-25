"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Willkommen</h1>
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-[#C5E86C] text-black hover:bg-[#b3d462]"
        >
          <Github className="w-5 h-5" />
          Mit GitHub anmelden
        </Button>
      </div>
    </div>
  );
}
