import { SiteHeader } from "@/components/site-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { sidebarNavItems, featuredProducts } from "@/utils/dummy"

export default function Home() {
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
              <Button variant="outline">Anzeige hier platzieren</Button>
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
              {featuredProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}