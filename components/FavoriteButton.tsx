"use client";

import { useState, useTransition } from "react";
import { toggleFavorite } from "@/app/actions/favorite";
import { Button } from "./ui/button";
import { Heart, HeartOff } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FavoriteButtonProps {
  isFavorited: boolean;
  id: string;
  className?: string;
}

export default function FavoriteButton({
  isFavorited = false,
  id,
  className,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const handleFavorite = async () => {
    startTransition(async () => {
      try {
        const response = await toggleFavorite(id);
        if (response?.favorited !== undefined) {
          setFavorited(response.favorited);
        }
        router.refresh();
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className={className}
            onClick={handleFavorite}
            disabled={isPending}
          >
            {pathname === "/mein-konto/favoriten" ? (
              <HeartOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Heart
                className={`h-4 w-4 ${
                  favorited ? "text-red-500 fill-red-300" : "text-gray-500"
                }`}
              />
            )}
          </Button>
        </TooltipTrigger>
        {pathname === "/mein-konto/favoriten" && (
          <TooltipContent>Favorit entfernen</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
