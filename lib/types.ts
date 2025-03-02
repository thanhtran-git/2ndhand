export interface ClassifiedAd {
  id: string;
  title: string;
  price: number;
  city: string;
  negotiable?: boolean;
  imageUrl: string | null;
  isFavorited: boolean;
  description: string;
  link: string;
  createdAt: Date;
  favorites: Array<{ id: string; userId: string }>;
}
