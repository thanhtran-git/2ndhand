"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function deleteProduct(id: string, isFavorite: boolean) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      success: false,
      error: "Du musst eingeloggt sein, um zu löschen.",
    };
  }

  try {
    if (isFavorite) {
      await prisma.favorite.delete({
        where: { id },
      });
    } else {
      await prisma.classifiedAd.delete({
        where: { id },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    return { success: false, error: "Fehler beim Löschen des Eintrags." };
  }
}
