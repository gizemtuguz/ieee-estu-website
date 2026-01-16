'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  sizes = '100vw',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const shouldFill = fill || !width || !height;

  if (error) {
    return (
      <div
        className={`bg-slate-200 dark:bg-slate-700 flex items-center justify-center ${className}`}
      >
        <span className="text-muted-foreground text-sm">Image not available</span>
      </div>
    );
  }

  if (shouldFill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}
