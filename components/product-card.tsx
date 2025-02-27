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
      <Link href={link}>
        <CardHeader className="p-0">
          <div className="relative sm:h-[160px]">
            <Image
              src={imageUrl || "/placeholder-image.jpg"}
              alt={title}
              fill
              className="object-cover  transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute bottom-1 right-1 bg-[#ace223] text-black px-2 py-1 text-sm font-bold rounded">
              {price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
              {negotiable && " VB"}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3">{title}</CardContent>
      </Link>
      <CardFooter className="relative p-3 pt-0 text-sm text-muted-foreground">
        {city}
        {session?.user?.id && (
          <Button
            size="icon"
            variant="outline"
            className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-white/80"
            onClick={handleFavorite}
            disabled={isPending}
          >
            <Heart
              className={`h-4 w-4 ${
                favorited ? "text-red-500 fill-red-300" : "text-gray-500"
              }`}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
