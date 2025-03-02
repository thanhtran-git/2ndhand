import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    const ads = await prisma.classifiedAd.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
        imageUrl: true,
        favorites: {
          where: {
            userId: session?.user?.id,
          },
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ads: ads.map((ad) => ({
        ...ad,
        isFavorited: ad.favorites.length > 0,
      })),
    });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to load ads" }, { status: 500 });
  }
}
