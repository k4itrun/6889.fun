'use client';

import NextImage from 'next/image';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<React.ComponentProps<typeof NextImage>, 'src'> {
 fallbackImage?: string;
 src: string;
}

const ImageWithFallback = ({ fallbackImage = '/favicon.ico', src, ...props }: ImageWithFallbackProps) => {
 const [error, setError] = useState(false);
 const [finalSrc, setFinalSrc] = useState(src);

 useEffect(() => {
  setError(false);
  if (!src) {
   setError(true);
   return;
  }

  const img = new window.Image() as HTMLImageElement;
  img.src = src;

  img.onload = () => {
   setFinalSrc(src);
  };

  img.onerror = () => {
   console.warn(`Error loading image from: ${src}`);
   setError(true);
   setFinalSrc(fallbackImage);
  };
 }, [src, fallbackImage]);

 return (
  <NextImage
   {...props}
   src={error ? fallbackImage : finalSrc}
   onError={() => {
    setError(true);
    setFinalSrc(fallbackImage);
   }}
  />
 );
};

export default ImageWithFallback;
