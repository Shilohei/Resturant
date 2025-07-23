import { useQuery } from '@tanstack/react-query';
import { fetchImages, FetchImagesParams, PexelsPhoto } from '@/services/pexelsApi';

// --- React Query Keys ---
const pexelsKeys = {
  all: ['pexels'] as const,
  searches: () => [...pexelsKeys.all, 'searches'] as const,
  search: (params: FetchImagesParams) => [...pexelsKeys.searches(), params] as const,
};

// --- Hook for fetching multiple images ---
interface UsePexelsImagesOptions extends FetchImagesParams {
  // React Query options can be added here if needed
  enabled?: boolean;
}

export const usePexelsImages = (options: UsePexelsImagesOptions) => {
  const { query, perPage = 10, orientation, enabled = true } = options;

  return useQuery({
    queryKey: pexelsKeys.search({ query, perPage, orientation }),
    queryFn: () => fetchImages({ query, perPage, orientation }),
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours (gcTime replaces cacheTime)
    enabled,
  });
};

// --- Hook for fetching a single image ---
interface UsePexelsImageOptions extends Omit<FetchImagesParams, 'perPage'> {
  enabled?: boolean;
}

export const usePexelsImage = (options: UsePexelsImageOptions) => {
  const { data, isLoading, isError, error } = usePexelsImages({
    ...options,
    perPage: 1,
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
