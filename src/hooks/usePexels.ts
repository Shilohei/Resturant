import { useQuery } from '@tanstack/react-query';
import { pexelsApiService } from '@/services/pexelsApi';
import { PexelsPhoto, PexelsPhotoSearchOptions } from '@/types/pexels.types';

// --- React Query Keys ---
const pexelsKeys = {
  all: ['pexels'] as const,
  searches: () => [...pexelsKeys.all, 'searches'] as const,
  search: (params: PexelsPhotoSearchOptions) => [...pexelsKeys.searches(), params] as const,
};

// --- Hook for fetching multiple images ---
interface UsePexelsImagesOptions extends PexelsPhotoSearchOptions {
  // React Query options can be added here if needed
  enabled?: boolean;
}

export const usePexelsImages = (options: UsePexelsImagesOptions) => {
  const { query, per_page = 10, orientation, enabled = true, ...searchOptions } = options;

  return useQuery({
    queryKey: pexelsKeys.search({ query, per_page, orientation, ...searchOptions }),
    queryFn: () => pexelsApiService.searchPhotos({ query, per_page, orientation, ...searchOptions }),
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours (gcTime replaces cacheTime)
    enabled,
  });
};

// --- Hook for fetching a single image ---
interface UsePexelsImageOptions extends Omit<PexelsPhotoSearchOptions, 'per_page'> {
  enabled?: boolean;
}

export const usePexelsImage = (options: UsePexelsImageOptions) => {
  const { data, isLoading, isError, error } = usePexelsImages({
    ...options,
    per_page: 1,
  });

  // Extract the single photo from the response
  const photo: PexelsPhoto | undefined = data?.photos?.[0];

  return {
    data: photo,
    isLoading,
    isError,
    error,
  };
};
