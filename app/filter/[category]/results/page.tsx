import { prisma } from "@/lib/prisma";
import PreviewCardList from "@/components/PreviewCard-List";
import SidebarNav from "@/components/SidebarNav";
import { sideBarLinks } from "@/lib/sideBarLinks";
import { ClassifiedAd } from "@/lib/types";
// import { categoryMap } from "@/lib/categoryMap";

type ParamsType = Promise<{ category: string }>;

async function fetchProducts(category: string): Promise<ClassifiedAd[]> {
  try {
    const products = await prisma.classifiedAd.findMany({
      where: {
        category: category,
      },
      select: {
        id: true,
        title: true,
        category: true,
        price: true,
        city: true,
        postalCode: true,
        imageUrl: true,
        description: true,
        createdAt: true,
        favorites: false,
      },
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function CategoryResults({
  params,
}: {
  params: ParamsType;
}) {
  const { category } = await params;
  const products = await fetchProducts(category);

  return (
    <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto">
      <div className="container mx-auto grid grid-cols-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <SidebarNav items={sideBarLinks} className="sticky top-24" />
        </aside>

        <main className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">
            Ergebnisse aus der Kategorie {category}
          </h1>

          {products.length > 0 ? (
            <PreviewCardList ads={products} />
          ) : (
            <p className="text-gray-500">
              Keine Anzeigen in dieser Kategorie gefunden.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
