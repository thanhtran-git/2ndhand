"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function toggleFavorite(adId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated - No session found");
  }
  const userId = session.user.id;

  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_adId: { userId, adId },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      console.log("Ad unfavorited:", existingFavorite);
      return { favorited: false };
    }
    const newFavorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        adId,
      },
    });
    console.log("New favorite created:", newFavorite);
    return { favorited: true };
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    throw error;
  }
}
