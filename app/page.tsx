import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  sidebarNavItems,
  featuredProducts,
  exampleProducts,
} from "@/utils/dummy";
import { auth } from "@/auth";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  city: string;
  negotiable?: boolean;
}

async function fetchProducts(): Promise<Product[]> {
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
  const session = await auth();
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gray-50 mx-auto">
      <SiteHeader />
      <div className="container mx-auto grid grid-cols-1 gap-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <SidebarNav items={sidebarNavItems} className="sticky top-24" />
        </aside>
        <main className="space-y-6">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Galerie</h2>
              {session && (
                <Link href="/form">
                  <Button variant="outline">Jetzt inserieren</Button>
                </Link>
              )}
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Neueste Anzeigen</h2>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {exampleProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Lädt Anzeigen...</h2>
            {products.length > 0 ? (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <p>Keine Anzeigen gefunden.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
