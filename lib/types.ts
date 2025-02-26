export interface ClassifiedAd {
  id: string;
  title: string;
  price: number;
  city: string;
  negotiable?: boolean;
  imageUrl: string;
  isFavorited: boolean;
  description: string;
  link: string;
  createdAt: Date;
}
