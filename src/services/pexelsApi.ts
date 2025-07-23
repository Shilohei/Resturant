import axios from 'axios';

// 1. API Configuration
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_API_URL = 'https://api.pexels.com/v1/';

if (!PEXELS_API_KEY) {
  console.error('Pexels API key is missing. Please add VITE_PEXELS_API_KEY to your .env file.');
}

const pexelsClient = axios.create({
  baseURL: PEXELS_API_URL,
  headers: {
    Authorization: PEXELS_API_KEY,
  },
});

// 2. TypeScript Interfaces
export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page: string;
}

// 3. API Service Function
export type ImageOrientation = 'landscape' | 'portrait' | 'square';


export interface FetchImagesParams {
  query: string;
  perPage?: number;
  orientation?: ImageOrientation;
}

/**
 * Fetches images from the Pexels API.
 * Includes basic error handling.
 * Caching and retry logic should be handled by a data-fetching library like React Query.
 */
export const fetchImages = async ({ 
  query, 
  perPage = 1, 
  orientation 
}: FetchImagesParams): Promise<PexelsSearchResponse> => {
  try {
    const params: Record<string, string | number> = {
      query,
      per_page: perPage,
    };

    if (orientation) {
      params.orientation = orientation;
    }

    const response = await pexelsClient.get<PexelsSearchResponse>('/search', {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Pexels API error: ${error.response?.status}`, error.response?.data);
      if (error.response?.status === 429) {
        console.warn('Pexels API rate limit exceeded.');
      }
    } else {
      console.error('An unexpected error occurred while fetching from Pexels:', error);
    }
    // Propagate the error to be handled by the caller (e.g., React Query)
    throw error;
  }
};
