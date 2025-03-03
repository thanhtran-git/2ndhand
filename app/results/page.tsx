import { notFound } from "next/navigation";
import PreviewCardList from "@/components/PreviewCard-List";
import { ClassifiedAd } from "@/lib/types";

type searchParamsType = Promise<{ query?: string; postalCode?: string }>;

const RESULTS_TITLE = "Suchergebnisse für";

async function fetchAds(
  query?: string,
  postalCode?: string
): Promise<ClassifiedAd[] | null> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/classifiedads`
    );
    if (query) {
      url.searchParams.set("query", query);
    }
    if (postalCode) {
      url.searchParams.set("postalCode", postalCode);
    }

    const res = await fetch(url.toString());

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
  if (!searchParams) {
    return notFound();
  }

  const { query, postalCode } = await searchParams;

  if (!query && !postalCode) {
    return notFound();
  }

  const ads = await fetchAds(query, postalCode);

  if (!ads) {
    return <p>Error loading ads</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {query && (
        <h1 className="text-2xl font-bold mb-4">{`${RESULTS_TITLE} "${query}"`}</h1>
      )}
      {postalCode && (
        <h1 className="text-2xl font-bold mb-4">{`Inserate in ${postalCode}`}</h1>
      )}
      {ads.length > 0 ? (
        <PreviewCardList ads={ads} />
      ) : (
        <p>Keine Inserate gefunden.</p>
      )}
    </div>
  );
}
