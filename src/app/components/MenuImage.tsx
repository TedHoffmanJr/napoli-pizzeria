'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { getAvailableMenuImages } from '../lib/imageMapping';

interface MenuImageProps extends Omit<ImageProps, 'sizes'> {
  sizes?: string;
}

export default function MenuImage(props: MenuImageProps) {
  const { src, alt, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackIdx, setFallbackIdx] = useState<number | null>(null);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      sizes={sizes}
      style={{ objectFit: 'cover', ...rest.style }}
      onError={() => {
        if (fallbackIdx === null) {
          const fallbackImages = getAvailableMenuImages();
          const idx = Math.floor(Math.random() * fallbackImages.length);
          setFallbackIdx(idx);
          setImgSrc(fallbackImages[idx]);
        }
      }}
    />
  );
} 