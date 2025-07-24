import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  PexelsPhoto, PexelsPhotoResponse, PexelsPhotoSearchOptions,
  PexelsVideo, PexelsVideoResponse, PexelsVideoSearchOptions,
  PexelsMediaOptions
} from '../types/pexels.types';

// ==========================================================================
// API Configuration
// ==========================================================================

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_PHOTO_URL = import.meta.env.VITE_PEXELS_BASE_URL || 'https://api.pexels.com/v1';
const PEXELS_VIDEO_URL = import.meta.env.VITE_PEXELS_VIDEO_URL || 'https://api.pexels.com/videos';

if (!PEXELS_API_KEY) {
  console.error('Pexels API key is missing. Please add VITE_PEXELS_API_KEY to your .env file.');
}

// ==========================================================================
// Axios Clients
// ==========================================================================

const createPexelsClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      const message = (error.response?.data as { error?: string })?.error || error.message;
      
      console.error(`Pexels API error (${status || 'Unknown'}):`, message);
      
      if (status === 429) {
        console.warn('Pexels API rate limit exceeded. Consider implementing exponential backoff.');
      } else if (status === 401 || status === 403) {
        console.error('Pexels API authentication failed. Please check your API key and permissions.');
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const photoClient = createPexelsClient(PEXELS_PHOTO_URL);
const videoClient = createPexelsClient(PEXELS_VIDEO_URL);

// ==========================================================================
// API Service Implementation
// ==========================================================================

/**
 * A comprehensive service for interacting with the Pexels API.
 * Caching, retry logic, and state management are handled by React Query in the hooks.
 */
export const pexelsApiService = {
  // --- Photo Methods ---

  async searchPhotos(options: PexelsPhotoSearchOptions): Promise<PexelsPhotoResponse> {
    const { data } = await photoClient.get<PexelsPhotoResponse>('/search', { params: options });
    return data;
  },

  async getCuratedPhotos(options?: PexelsMediaOptions): Promise<PexelsPhotoResponse> {
    const { data } = await photoClient.get<PexelsPhotoResponse>('/curated', { params: options });
    return data;
  },

  async getPhotoById(id: number): Promise<PexelsPhoto> {
    const { data } = await photoClient.get<PexelsPhoto>(`/photos/${id}`);
    return data;
  },

  // --- Video Methods ---

  async searchVideos(options: PexelsVideoSearchOptions): Promise<PexelsVideoResponse> {
    const { data } = await videoClient.get<PexelsVideoResponse>('/search', { params: options });
    return data;
  },

  async getPopularVideos(options?: PexelsMediaOptions): Promise<PexelsVideoResponse> {
    const { data } = await videoClient.get<PexelsVideoResponse>('/popular', { params: options });
    return data;
  },

  async getVideoById(id: number): Promise<PexelsVideo> {
    const { data } = await videoClient.get<PexelsVideo>(`/videos/${id}`);
    return data;
  },
};
