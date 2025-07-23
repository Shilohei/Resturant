import { useState, useEffect } from 'react';

/**
 * Custom hook to preload a list of image URLs.
 * This helps ensure that images are cached by the browser before they are
 * rendered in the DOM, preventing flashes of empty space.
 * 
 * @param imageUrls - An array of string URLs for the images to preload.
 * @returns An object containing the loading state and a list of any images that failed to load.
 */
export const useImagePreloader = (imageUrls: string[]) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;
    const newErrors: string[] = [];

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoading(false);
        if (newErrors.length > 0) {
          setErrors(newErrors);
        }
      }
    };

    const handleError = (url: string) => {
      loadedCount++;
      newErrors.push(url);
      console.warn(`Failed to preload image: ${url}`);
      if (loadedCount === totalImages) {
        setIsLoading(false);
        setErrors(newErrors);
      }
    };

    imageUrls.forEach(url => {
      if (!url) { // Handle potential null/undefined URLs
        handleError('Invalid URL');
        return;
      }
      const img = new Image();
      img.src = url;
      img.onload = handleLoad;
      img.onerror = () => handleError(url);
    });

    // Cleanup function in case the component unmounts before loading is complete
    return () => {
      imageUrls.forEach(url => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = null;
            img.onerror = null;
        }
      });
    };
  }, [imageUrls]); // Dependency array ensures this runs when the list of URLs changes

  return { isLoading, errors };
};
