"use client";

import PreviewCard from "@/components/PreviewCard";
import slugify from "slugify";
import { ClassifiedAd } from "@/lib/types";
import deleteProduct from "@/app/actions/deleteProduct";
import { useRouter } from "next/navigation";

interface PreviewCardListProps {
  ads: ClassifiedAd[];
  showDeleteButton?: boolean;
  showFavoriteButton?: boolean;
}

export default function PreviewCardList({
  ads,
  showDeleteButton,
  showFavoriteButton,
}: PreviewCardListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const response = await deleteProduct(id);
    if (response?.success) {
      router.refresh();
    } else {
      alert(response?.error || "Fehler beim Löschen.");
    }
  };

  if (ads.length === 0) {
    return <p className="text-gray-500">Keine Inserate vorhanden</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {ads.map((ad) => (
        <div key={ad.id} className="mb-4">
          <PreviewCard
            {...ad}
            link={`/product/${slugify(ad.title, {
              lower: true,
              strict: true,
            })}/${ad.id}`}
            showDeleteButton={showDeleteButton}
            showFavoriteButton={showFavoriteButton}
            handleDelete={() => handleDelete(ad.id)}
          />
        </div>
      ))}
    </div>
  );
}
