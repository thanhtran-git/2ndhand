import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Received Data:", data);

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const newAd = await prisma.classifiedAd.create({
      data,
    });

    return NextResponse.json({ success: true, ad: newAd });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    const ads = await prisma.classifiedAd.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
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

    const mappedAds = ads.map((ad) => ({
      ...ad,
      isFavorited: ad.favorites.some(
        (favorite) =>
          (favorite as { id: string; userId: string }).userId ===
          session?.user?.id
      ),
    }));

    return NextResponse.json({ ads: mappedAds });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to load ads" }, { status: 500 });
  }
}
