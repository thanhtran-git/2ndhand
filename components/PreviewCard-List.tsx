import PreviewCard from "@/components/PreviewCard";
import slugify from "slugify";
import { ClassifiedAd } from "@/lib/types";

interface PreviewCardListProps {
  ads: ClassifiedAd[];
}

export default function PreviewCardList({ ads }: PreviewCardListProps) {
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
          />
        </div>
      ))}
    </div>
  );
}
