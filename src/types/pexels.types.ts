/**
 * Pexels API Type Definitions
 * 
 * This file contains all the necessary TypeScript interfaces for interacting
 * with the Pexels API, covering photos, videos, and API responses.
 */

// ==========================================================================
// Photo Types
// ==========================================================================

/**
 * Represents the source URLs for different sizes of a Pexels photo.
 */
export interface PexelsPhotoSource {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

/**
 * Represents a single photo object from the Pexels API.
 */
export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSource;
  liked: boolean;
  alt: string;
}

/**
 * Represents the response structure for a photo search or curated photos request.
 */
export interface PexelsPhotoResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

// ==========================================================================
// Video Types
// ==========================================================================

/**
 * Represents a user who uploaded a video to Pexels.
 */
export interface PexelsVideoUser {
  id: number;
  name: string;
  url: string;
}

/**
 * Represents a picture associated with a video (thumbnail).
 */
export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

/**
 * Represents a file for a video at a specific quality.
 */
export interface PexelsVideoFile {
  id: number;
  quality: 'sd' | 'hd' | 'hls';
  file_type: string;
  width: number | null;
  height: number | null;
  link: string;
  fps: number | null;
}

/**
 * Represents a single video object from the Pexels API.
 */
export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: PexelsVideoUser;
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

/**
 * Represents the response structure for a video search or popular videos request.
 */
export interface PexelsVideoResponse {
  total_results: number;
  page: number;
  per_page: number;
  videos: PexelsVideo[];
  next_page?: string;
  url: string;
}

// ==========================================================================
// API Options Types
// ==========================================================================

export type PexelsOrientation = 'landscape' | 'portrait' | 'square';
export type PexelsSize = 'small' | 'medium' | 'large';

/**
 * Options for searching photos.
 */
export interface PexelsPhotoSearchOptions {
  query: string;
  orientation?: PexelsOrientation;
  size?: PexelsSize;
  color?: string;
  locale?: string;
  page?: number;
  per_page?: number;
}

/**
 * Options for searching videos.
 */
export interface PexelsVideoSearchOptions {
  query: string;
  orientation?: PexelsOrientation;
  size?: PexelsSize;
  locale?: string;
  page?: number;
  per_page?: number;
}

/**
 * Options for getting popular or curated media.
 */
export interface PexelsMediaOptions {
  page?: number;
  per_page?: number;
}
