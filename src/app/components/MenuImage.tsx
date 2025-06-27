'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const placeholders = [
  '/menuPics/placeholders/placeholder1.jpg',
  '/menuPics/placeholders/placeholder2.jpg',
];

export default function MenuImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackIdx, setFallbackIdx] = useState<number | null>(null);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      style={{ objectFit: 'cover', ...rest.style }}
      onError={() => {
        if (fallbackIdx === null) {
          const idx = Math.floor(Math.random() * placeholders.length);
          setFallbackIdx(idx);
          setImgSrc(placeholders[idx]);
        }
      }}
    />
  );
} 