'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface MenuImageProps extends Omit<ImageProps, 'sizes'> {
  sizes?: string;
}

export default function MenuImage(props: MenuImageProps) {
  const { src, alt, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      sizes={sizes}
      style={{ objectFit: 'cover', ...rest.style }}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc('/brand/social-preview.jpg'); // Use Napoli's social preview as fallback
        }
      }}
    />
  );
} 