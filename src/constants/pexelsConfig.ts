/**
 * Pexels API Configuration and Keyword Constants
 * 
 * This file centralizes the keywords used for fetching images and videos
 * from the Pexels API, organized by website section and context.
 */

// ==========================================================================
// Image Categories & Keywords
// ==========================================================================

export const PEXELS_IMAGE_KEYWORDS = {
  // Hero/Banner Sections
  hero: [
    'modern restaurant interior design',
    'gourmet food plating close-up',
    'elegant dining table setting',
    'abstract culinary art',
  ],
  
  // About/Team Sections  
  team: [
    'professional chefs in kitchen',
    'diverse restaurant staff smiling',
    'bartender crafting cocktail',
    'waiter serving customers',
  ],
  
  // Menu/Dish Sections
  menu: {
    default: 'delicious gourmet dish',
    pizza: 'artisan pizza fresh ingredients',
    pasta: 'gourmet pasta dish plated',
    sushi: 'fresh sushi platter close-up',
    steak: 'grilled steak juicy medium-rare',
    salad: 'vibrant healthy salad bowl',
    dessert: 'decadent chocolate dessert',
    cocktail: 'craft cocktail bar setting',
  },
  
  // Contact/Location Sections
  contact: [
    'stylish restaurant exterior',
    'cozy cafe interior',
    'city street with restaurants',
    'modern building facade',
  ],
  
  // Blog/Content Sections
  blog: [
    'food blogger taking photo',
    'farmers market fresh produce',
    'cooking class action shot',
    'wine tasting event',
  ],
  
  // Background/Texture Elements
  backgrounds: [
    'dark wood texture',
    'marble countertop background',
    'slate texture food background',
    'linen tablecloth texture',
  ],
};

// ==========================================================================
// Video Categories & Keywords
// ==========================================================================

export const PEXELS_VIDEO_KEYWORDS = {
  hero: [
    'busy restaurant atmosphere time-lapse',
    'chef cooking in slow motion',
    'steam rising from hot food',
    'pouring wine into glass close-up',
  ],
  
  process: [
    'hands kneading dough',
    'sizzling food in pan',
    'decorating plate with sauce',
    'shaking cocktail mixer',
  ],
  
  lifestyle: [
    'friends laughing and eating at restaurant',
    'couple on a dinner date',
    'people enjoying food at a table',
    'clinking glasses toast',
  ],
};

/**
 * Helper function to get a random keyword from a category.
 * @param category - The main category (e.g., 'hero', 'menu').
 * @param subCategory - An optional sub-category for nested objects (e.g., 'pizza').
 * @returns A randomly selected keyword string.
 */
export const getRandomImageKeyword = (category: keyof typeof PEXELS_IMAGE_KEYWORDS, subCategory?: string): string => {
  const keywords = PEXELS_IMAGE_KEYWORDS[category];
  if (Array.isArray(keywords)) {
    return keywords[Math.floor(Math.random() * keywords.length)];
  } else if (typeof keywords === 'object' && subCategory && keywords[subCategory]) {
    return keywords[subCategory];
  } else if (typeof keywords === 'object') {
    return keywords.default || 'gourmet food';
  }
  return 'restaurant food';
};
