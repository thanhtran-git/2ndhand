import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProducts, exampleProducts } from "@/utils/dummy";

type Params = Promise<{ id: string; title: string }>;

const getProduct = (id: string) => {
  return (
    featuredProducts.find((product) => product.id === id) ||
    exampleProducts.find((product) => product.id === id)
  );
};

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-6xl p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
              <Image
                src={product.imageUrl || "/placeholder-image.jpg"}
                alt={product.title}
                fill
                className="p-4 object-contain"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold leading-tight">
                  {product.title}
                </h1>
                <Badge
                  variant={product.negotiable ? "default" : "secondary"}
                  className="uppercase"
                >
                  {product.negotiable ? "Verhandelbar" : "Festpreis"}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-primary">
                <span className="bg-[#ace223] py-1 px-3 text-black rounded">
                  {product.price.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Beschreibung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Separator />

              <div className="bg-white rounded-xl p-6 space-y-6">
                <div>
                  <h2 className="font-semibold mb-2">Verkäufer</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{product.name || "Anonym"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{product.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Inseriert am:{" "}
                      {new Date().toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Verkäufer kontaktieren
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
