"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function deleteProduct(id: string) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      success: false,
      error: "Du musst eingeloggt sein, um zu löschen.",
    };
  }

  try {
    await prisma.classifiedAd.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    return { success: false, error: "Fehler beim Löschen des Eintrags." };
  }
}
