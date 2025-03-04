"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ClassifiedAd } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProductCard({
  id,
  title,
  price,
  city,
  imageUrl,
  negotiable = false,
  isFavorited = false,
  link,
}: ClassifiedAd) {
  const [imageError, setImageError] = useState(false);

  const { data: session } = useSession();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden">
      <Link href={link || "#"}>
        <CardHeader className="p-0">
          <div className="relative sm:h-[160px]">
            <Image
              src={
                imageError || !imageUrl ? "/placeholder-image.jpg" : imageUrl
              }
              alt={title}
              fill
              className="object-cover  transition-transform duration-300 ease-in-out hover:scale-110"
              onError={handleImageError}
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
          <FavoriteButton
            isFavorited={isFavorited}
            id={id}
            className="absolute right-2 bottom-2 rounded-full bg-white/80"
          />
        )}
      </CardFooter>
    </Card>
  );
}
