"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string | null;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError || !src ? "/placeholder-image.jpg" : src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setImageError(true)}
    />
  );
}
