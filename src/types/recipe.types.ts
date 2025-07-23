export interface RecipeRequest {
  customer_request: string;
  dietary_restrictions: string[];
  available_ingredients: string[];
  cooking_time: number; // in minutes
  serving_size: number;
  cuisine_preference?: string;
  spice_level?: 'mild' | 'medium' | 'hot' | 'very_hot';
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'appetizer';
  skill_level?: 'beginner' | 'intermediate' | 'advanced';
  budget_range?: 'economic' | 'moderate' | 'premium';
}

export interface RecipeIngredient {
  item: string;
  amount: string;
  category?: 'main' | 'secondary' | 'seasoning' | 'garnish';
  substitutions?: string[];
}

export interface RecipeInstruction {
  step: number;
  instruction: string;
  timing?: string;
  temperature?: string;
  visual_cues?: string[];
}

export interface NutritionalInfo {
  calories_per_serving?: number;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  sodium?: string;
  key_nutrients?: string[];
}

export interface Recipe {
  id: string;
  recipe_name: string;
  cuisine_style: string;
  description?: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  prep_time: number; // minutes
  cook_time: number; // minutes
  total_time: number; // minutes
  difficulty: 1 | 2 | 3 | 4 | 5;
  serves: number;
  tags: string[];
  nutritional_info?: NutritionalInfo;
  flavor_profile: string[];
  pairing_suggestions?: string[];
  storage_instructions?: string;
  scaling_tips?: string;
  allergen_warnings: string[];
  created_at: string;
  rating?: number;
  user_notes?: string;
}

export interface RecipeResponse {
  recipe: Recipe;
  customization_options?: {
    variations: string[];
    substitutions: Record<string, string[]>;
    difficulty_adjustments: string[];
  };
  cooking_tips: string[];
}

export interface SavedRecipe extends Recipe {
  saved_at: string;
  user_rating?: number;
  user_notes?: string;
  times_cooked?: number;
  last_cooked?: string;
}

export interface RecipeFilters {
  cuisine_types: string[];
  dietary_restrictions: string[];
  max_prep_time?: number;
  max_difficulty?: number;
  meal_types: string[];
  search_query?: string;
}

export class RecipeGenerationError extends Error {
  code: string;
  suggestions?: string[];

  constructor({ code, message, suggestions }: { code: string; message: string; suggestions?: string[] }) {
    super(message);
    this.name = 'RecipeGenerationError';
    this.code = code;
    this.suggestions = suggestions;
  }
}
