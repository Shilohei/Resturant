import { useQuery } from '@tanstack/react-query';
import { pexelsApiService } from '@/services/pexelsApi';
import { PexelsPhoto, PexelsPhotoSearchOptions } from '@/types/pexels.types';
import { pexelsKeys } from './usePexelsSearch';

// ==========================================================================
// Hook for Fetching a Single Image
// ==========================================================================

export interface UsePexelsImageOptions extends Omit<PexelsPhotoSearchOptions, 'per_page'> {
  enabled?: boolean;
}

/**
 * A hook to fetch a single photo from the Pexels API.
 * It uses the search endpoint and returns the first result.
 * Ideal for components that need a single, context-relevant image.
 * 
 * @param options - Search parameters (query, orientation, etc.).
 * @param enabled - Whether the query should be enabled.
 */
export const usePexelsImage = (options: UsePexelsImageOptions) => {
  const { query, orientation, size, color, locale, enabled = true } = options;
  const searchOptions: PexelsPhotoSearchOptions = { query, orientation, size, color, locale, per_page: 1 };

  return useQuery<PexelsPhotoResponse, Error, PexelsPhoto | undefined>({
    queryKey: pexelsKeys.search('photos', searchOptions),
    queryFn: () => pexelsApiService.searchPhotos(searchOptions),
    select: (data) => data.photos?.[0],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: enabled && !!query, // Only run if a query is provided
  });
};

/**
 * A hook to fetch a photo by its specific ID from the Pexels API.
 * @param id - The Pexels photo ID.
 * @param enabled - Whether the query should be enabled.
 */
export const usePexelsImageById = (id: number, enabled: boolean = true) => {
    const queryKey = [...pexelsKeys.media('photos'), 'detail', id];

    return useQuery<PexelsPhoto, Error>({
        queryKey,
        queryFn: () => pexelsApiService.getPhotoById(id),
        staleTime: Infinity, // The image for a specific ID is unlikely to change
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        enabled: enabled && !!id,
    });
};

// Note: The type for PexelsPhotoResponse was implicitly any. I have added the explicit type annotation.
interface PexelsPhotoResponse {
    photos: PexelsPhoto[];
    // Add other properties from the actual response if needed
}
