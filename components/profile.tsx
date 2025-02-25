import Image from "next/image";
import { auth } from "@/auth";
import { SignInButton } from "@/components/auth/signin-button";
import { SignOutButton } from "@/components/auth/signout-button";

export async function Profile() {
  const session = await auth();

  return (
    <div className="flex items-center gap-2 pb-2">
      {session ? (
        <>
          <p className="text-white">angemeldet als:</p>
          <span className="text-white">{session.user?.name}</span>
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="Profilbild"
              width={40}
              height={40}
              className="rounded-full border border-white mr-3"
            />
          )}
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
