import { useQuery } from '@tanstack/react-query';
import { pexelsApiService } from '@/services/pexelsApi';
import { PexelsVideo, PexelsVideoResponse, PexelsVideoSearchOptions } from '@/types/pexels.types';
import { pexelsKeys } from './usePexelsSearch';

// ==========================================================================
// Hook for Fetching a Single Video
// ==========================================================================

export interface UsePexelsVideoOptions extends Omit<PexelsVideoSearchOptions, 'per_page'> {
  enabled?: boolean;
}

/**
 * A hook to fetch a single video from the Pexels API.
 * It uses the search endpoint and returns the first result.
 * 
 * @param options - Search parameters (query, orientation, etc.).
 * @param enabled - Whether the query should be enabled.
 */
export const usePexelsVideo = (options: UsePexelsVideoOptions) => {
  const { query, orientation, size, locale, enabled = true } = options;
  const searchOptions: PexelsVideoSearchOptions = { query, orientation, size, locale, per_page: 1 };

  return useQuery<PexelsVideoResponse, Error, PexelsVideo | undefined>({
    queryKey: pexelsKeys.search('videos', searchOptions),
    queryFn: () => pexelsApiService.searchVideos(searchOptions),
    select: (data) => data.videos?.[0],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: enabled && !!query,
  });
};

/**
 * A hook to fetch a video by its specific ID from the Pexels API.
 * @param id - The Pexels video ID.
 * @param enabled - Whether the query should be enabled.
 */
export const usePexelsVideoById = (id: number, enabled: boolean = true) => {
  const queryKey = [...pexelsKeys.media('videos'), 'detail', id];

  return useQuery<PexelsVideo, Error>({
    queryKey,
    queryFn: () => pexelsApiService.getVideoById(id),
    staleTime: Infinity, // The video for a specific ID is unlikely to change
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: enabled && !!id,
  });
};
