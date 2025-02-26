import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "GitHub User",
            },
          });
        }
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
      return true;
    },

    async session({ session }) {
      if (!session?.user?.email) return session;

      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      return session;
    },
  },
});
