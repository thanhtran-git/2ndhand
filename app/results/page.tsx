import { notFound } from "next/navigation";
import PreviewCardList from "@/components/PreviewCard-List";
import { ClassifiedAd } from "@/lib/types";

type searchParamsType = { query?: string };

async function fetchAds(query: string): Promise<ClassifiedAd[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/classifiedads?query=${query}`
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching ads:", error);
    return null;
  }
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const query = (await searchParams).query ?? "";

  if (!query.trim()) {
    return notFound();
  }

  const ads: ClassifiedAd[] | null = await fetchAds(query);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">{`Suchergebnisse für "${query}"`}</h1>
      {ads && ads.length > 0 ? (
        <PreviewCardList ads={ads} />
      ) : (
        <p>Keine Inserate gefunden.</p>
      )}
    </div>
  );
}
