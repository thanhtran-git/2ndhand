import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const ads = await prisma.classifiedAd.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
      },
      orderBy: { createdAt: "desc" }, // Optional: Order by latest ads
    });

    return NextResponse.json({ ads });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to load ads" }, { status: 500 });
  }
}
