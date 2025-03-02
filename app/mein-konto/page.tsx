import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PreviewCardList from "@/components/PreviewCard-List";
import { ClassifiedAd } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function fetchUserAds(): Promise<ClassifiedAd[]> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return [];
    }

    const ads = await prisma.classifiedAd.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
        description: true,
        createdAt: true,
        imageUrl: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return ads as ClassifiedAd[];
  } catch (error) {
    console.error("Error fetching user ads:", error);
    return [];
  }
}

export default async function MyAds() {
  const userAds = await fetchUserAds();

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div
          className="flex mb-6 justify-center
         gap-10"
        >
          <h1 className="text-2xl font-bold text-[#86B817] underline underline-offset-4">
            Meine Inserate
          </h1>
          <p className="text-2xl">|</p>
          <Link
            href="/mein-konto/favoriten"
            className="text-2xl hover:underline"
          >
            Favoriten
          </Link>
        </div>
        <PreviewCardList ads={userAds} />
      </div>
    </main>
  );
}
