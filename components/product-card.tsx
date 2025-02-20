import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: number;
  city: string;
  imageUrl?: string;
  negotiable?: boolean;
}

export function ProductCard({
  title,
  price,
  city,
  imageUrl,
  negotiable = false,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder-image.jpg"}
            alt={title}
            fill
            className="object-cover"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <Link href="#" className="font-medium hover:underline">
          {title}
        </Link>
        <div className="mt-1 text-lg font-bold">
          {price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
          {negotiable && " VB"}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 text-sm text-muted-foreground">
        {city}
      </CardFooter>
    </Card>
  );
}
