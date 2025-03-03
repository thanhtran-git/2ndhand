import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getClassifiedAdsByQuery,
  getClassifiedAdsByPostalCode,
  getClassifiedAds,
} from "@/lib/queries";

interface Session {
  user: {
    id: string;
  };
}

export async function GET(req: Request) {
  try {
    const session = (await auth()) as Session | null;

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const postalCode = searchParams.get("postalCode");

    if (query) {
      const ads = await getClassifiedAdsByQuery(query);
      return NextResponse.json(ads);
    }
    if (postalCode) {
      const ads = await getClassifiedAdsByPostalCode(postalCode);
      return NextResponse.json(ads);
    }

    const ads = await getClassifiedAds({ session });
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
