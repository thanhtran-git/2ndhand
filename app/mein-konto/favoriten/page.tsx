import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PreviewCardList from "@/components/preview-card-list";
import { ClassifiedAd } from "@/lib/types";
import Link from "next/link";

async function fetchUserFavorites(): Promise<ClassifiedAd[]> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return [];
    }

    const favorites = await prisma.classifiedAd.findMany({
      where: {
        favorites: {
          some: {
            userId: session.user.id,
          },
        },
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

    return favorites as ClassifiedAd[];
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
}

export default async function MyFavorites() {
  const userFavorites = await fetchUserFavorites();

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div
          className="flex mb-6 justify-center
         gap-10"
        >
          <Link href="/mein-konto" className="text-2xl hover:underline">
            Meine Inserate
          </Link>
          <p className="text-2xl">|</p>
          <h1 className="text-2xl font-bold text-[#86B817] underline underline-offset-4">
            Favoriten
          </h1>
        </div>
        <PreviewCardList ads={userFavorites} />
      </div>
    </main>
  );
}
