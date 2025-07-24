import React from 'react';
import { usePexelsImage } from '@/hooks/usePexelsImage';
import type { PexelsPhoto } from '@/types/pexels.types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Define paths to local fallback images
const fallbackImages = {
  default: '/src/assets/fallbacks/menu-item-placeholder.jpg',
  food: `/src/assets/fallbacks/food-fallback-${Math.ceil(Math.random() * 3)}.jpg`,
  hero: '/src/assets/fallbacks/hero-restaurant.jpg',
  chef: '/src/assets/fallbacks/chef-cooking.jpg',
  interior: '/src/assets/fallbacks/restaurant-interior.jpg',
};

interface PexelsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  query?: string;
  photo?: PexelsPhoto;
  fallbackType?: keyof typeof fallbackImages;
}

const PexelsImage: React.FC<PexelsImageProps> = ({
  query,
  photo: initialPhoto,
  fallbackType = 'default',
  className,
  ...props
}) => {
  const { data: fetchedPhoto, isLoading, isError } = usePexelsImage({
    query: query || '',
    enabled: !initialPhoto && !!query, // Only fetch if no photo is provided and a query exists
  });

  const photo = initialPhoto || fetchedPhoto;

  // Show skeleton if we are fetching and have no initial photo
  if (isLoading && !initialPhoto) {
    return <Skeleton className={cn('w-full h-full', className)} />;
  }

  // Show fallback if there's an error, or if there's no photo after trying to fetch
  if ((isError && !initialPhoto) || !photo) {
    return (
      <img
        src={fallbackImages[fallbackType]}
        alt={props.alt || 'Fallback image'}
        className={cn('w-full h-full object-cover', className)}
        {...props}
      />
    );
  }

  return (
    <img
      src={photo.src.large2x} // Better default for high-res screens
      srcSet={`
        ${photo.src.medium} 640w,
        ${photo.src.large} 1024w,
        ${photo.src.large2x} 1920w,
        ${photo.src.original} ${photo.width}w
      `}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
      alt={props.alt || photo.alt || `Image from Pexels`}
      loading={props.loading || 'lazy'}
      className={cn('w-full h-full object-cover bg-charcoal-light', className)}
      {...props}
    />
  );
};

export default PexelsImage;
