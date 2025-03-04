import SidebarNav from "@/components/SidebarNav";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/utils/dummy";
import { sideBarLinks } from "@/lib/sideBarLinks";
import slugify from "slugify";
import { ClassifiedAd } from "@/lib/types";

export const dynamic = "force-dynamic";

async function fetchProducts(): Promise<ClassifiedAd[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/classifiedads`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch ads");
    }

    const data = await res.json();
    return data.ads || [];
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto">
      <div className="container mx-auto grid grid-cols-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <SidebarNav items={sideBarLinks} className="sticky top-24" />
        </aside>
        <main className="space-y-6">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Galerie</h2>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    link={`/product/mock/${product.id}`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Neueste Anzeigen</h2>
            </div>
            {products && (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      {...product}
                      link={`/product/${slugify(product.title, {
                        lower: true,
                        strict: true,
                      })}/${product.id}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
