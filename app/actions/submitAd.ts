"use server";

import { formSchema, ClassifiedFormValues } from "@/lib/validation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function submitAd(values: ClassifiedFormValues) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Du musst eingeloggt sein, um eine Anzeige zu erstellen.");
  }

  const validatedData = formSchema.safeParse(values);
  if (!validatedData.success) {
    throw new Error("Ungültige Formulardaten.");
  }

  try {
    const newAd = await prisma.classifiedAd.create({
      data: {
        ...validatedData.data,
        userId: session.user.id as string,
        name: session.user.name || "GitHub User",
      },
    });

    console.log("Ad created:", newAd);
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    throw new Error("Fehler beim Speichern der Anzeige.");
  }
}
