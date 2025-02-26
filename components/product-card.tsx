"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toggleFavorite } from "@/app/actions/favorite";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ClassifiedAd } from "@/lib/types";

export default function ProductCard({
  id,
  title,
  price,
  city,
  imageUrl,
  negotiable = false,
  isFavorited,
  link,
}: ClassifiedAd) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession();

  const handleFavorite = () => {
    startTransition(async () => {
      try {
        const result = await toggleFavorite(id);
        setFavorited(result.favorited);
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    });
  };

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
          {session?.user?.id && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
              onClick={handleFavorite}
              disabled={isPending}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorited ? "text-red-500" : "text-gray-500"
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>
      <Link href={link}>
        <CardContent className="p-3">
          {title}
          <div className="mt-1 text-lg font-bold">
            {price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            {negotiable && " VB"}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0 text-sm text-muted-foreground">
        {city}
      </CardFooter>
    </Card>
  );
}
