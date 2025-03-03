import { prisma } from "@/lib/prisma";

export async function getClassifiedAdsByQuery(query: string) {
  return prisma.classifiedAd.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    take: 10,
  });
}

export async function getClassifiedAdsByPostalCode(postalCode: string) {
  return prisma.classifiedAd.findMany({
    where: {
      postalCode: { contains: postalCode },
    },
    take: 10,
  });
}

interface Session {
  user: {
    id: string;
  };
}

export async function getClassifiedAds({
  session,
}: {
  session: Session | null;
}) {
  const userId = session?.user?.id;
  return prisma.classifiedAd.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      city: true,
      imageUrl: true,
      favorites: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
          userId: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
