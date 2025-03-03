"use client";

import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClassifiedAd } from "@/lib/types";
import ProductImage from "@/components/ProductImage";
import DeleteButton from "@/components/DeleteButton";
import deleteProduct from "@/app/actions/deleteProduct";

export default function PreviewCard({
  id,
  title,
  price,
  city,
  imageUrl,
  description,
  link,
  createdAt,
  postalCode,
  isFavorite = false,
  showDeleteButton = false,
}: ClassifiedAd & { showDeleteButton?: boolean; isFavorite?: boolean }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteProduct(id, isFavorite);
    if (response?.success) {
      router.refresh();
    } else {
      alert(response?.error || "Fehler beim Löschen.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative">
      <div className="flex flex-col sm:flex-row items-center p-4">
        <div className="relative w-full sm:w-[240px] h-[180px]">
          <ProductImage src={imageUrl} alt={title} />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {postalCode} {city}
              </span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {new Intl.DateTimeFormat("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(createdAt))}
              </span>
            </div>
          </div>
          <Link href={link}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
          </Link>

          <p className="text-gray-700 mb-3">
            {description.length > 100
              ? description.slice(0, 150) + "..."
              : description}
          </p>

          <div className="text-lg font-bold text-green-700 mb-2">
            {price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </div>
        </div>
      </div>

      {showDeleteButton && <DeleteButton onDelete={handleDelete} />}
    </div>
  );
}
