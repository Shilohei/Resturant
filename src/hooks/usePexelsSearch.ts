import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { pexelsApiService } from '@/services/pexelsApi';
import {
  PexelsPhotoSearchOptions,
  PexelsVideoSearchOptions,
  PexelsPhotoResponse,
  PexelsVideoResponse,
} from '@/types/pexels.types';

// ==========================================================================
// React Query Keys
// ==========================================================================

export const pexelsKeys = {
  all: ['pexels'] as const,
  media: (type: 'photos' | 'videos') => [...pexelsKeys.all, type] as const,
  search: (type: 'photos' | 'videos', options: object) => [...pexelsKeys.media(type), 'search', options] as const,
};

// ==========================================================================
// Hook for Searching Media (Photos or Videos)
// ==========================================================================

export interface UsePexelsSearchOptions<T extends 'photos' | 'videos'> {
  mediaType: T;
  options: T extends 'photos' ? PexelsPhotoSearchOptions : PexelsVideoSearchOptions;
  enabled?: boolean;
}

/**
 * A generic hook to search for photos or videos from the Pexels API.
 * Supports infinite scrolling.
 *
 * @param mediaType - The type of media to search for ('photos' or 'videos').
 * @param options - Search parameters (query, per_page, etc.).
 * @param enabled - Whether the query should be enabled.
 */
export function usePexelsSearch<T extends 'photos' | 'videos'>({
  mediaType,
  options,
  enabled = true,
}: UsePexelsSearchOptions<T>) {
  const queryKey = pexelsKeys.search(mediaType, options);

  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const apiOptions = { ...options, page: pageParam };
      if (mediaType === 'photos') {
        return pexelsApiService.searchPhotos(apiOptions as PexelsPhotoSearchOptions);
      }
      return pexelsApiService.searchVideos(apiOptions as PexelsVideoSearchOptions);
    },
    getNextPageParam: (lastPage) => {
      // The 'page' property exists on both photo and video responses
      if ('next_page' in lastPage && lastPage.next_page) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: enabled && !!options.query,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  // Cast the return type to be specific based on the mediaType generic
  return queryResult as T extends 'photos'
    ? UseInfiniteQueryResult<InfiniteData<PexelsPhotoResponse>, Error>
    : UseInfiniteQueryResult<InfiniteData<PexelsVideoResponse>, Error>;
}
