import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recipeApiService } from '../services/recipeApi';
import { RecipeRequest, Recipe, RecipeResponse, SavedRecipe, RecipeFilters } from '../types/recipe.types';

// Query keys for React Query
export const recipeKeys = {
  all: ['recipes'] as const,
  generated: () => [...recipeKeys.all, 'generated'] as const,
  saved: () => [...recipeKeys.all, 'saved'] as const,
  suggestions: (ingredients: string[]) => [...recipeKeys.all, 'suggestions', ingredients] as const,
  filtered: (filters: RecipeFilters) => [...recipeKeys.all, 'filtered', filters] as const,
};

/**
 * Hook for generating recipes using AI
 */
export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RecipeRequest): Promise<RecipeResponse> => {
      return await recipeApiService.generateRecipe(request);
    },
    onSuccess: (data) => {
      // Cache the generated recipe
      queryClient.setQueryData(
        ['recipe', data.recipe.id],
        data
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: recipeKeys.generated() });
    },
    onError: (error) => {
      console.error('Recipe generation failed:', error);
    }
  });
};

/**
 * Hook for getting recipe suggestions based on ingredients
 */
export const useRecipeSuggestions = (
  ingredients: string[],
  preferences?: Partial<RecipeRequest>,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: recipeKeys.suggestions(ingredients),
    queryFn: async () => {
      if (ingredients.length === 0) return [];
      return await recipeApiService.getRecipeSuggestions(ingredients, preferences);
    },
    enabled: enabled && ingredients.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for managing saved recipes in localStorage
 */
export const useSavedRecipes = () => {
  const queryClient = useQueryClient();

  // Get saved recipes from localStorage
  const getSavedRecipes = (): SavedRecipe[] => {
    try {
      const saved = localStorage.getItem('savedRecipes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load saved recipes:', error);
      return [];
    }
  };

  // Save recipes to localStorage
  const setSavedRecipes = (recipes: SavedRecipe[]) => {
    try {
      localStorage.setItem('savedRecipes', JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to save recipes:', error);
    }
  };

  // Query for saved recipes
  const savedRecipesQuery = useQuery({
    queryKey: recipeKeys.saved(),
    queryFn: getSavedRecipes,
    staleTime: Infinity, // Don't refetch unless invalidated
  });

  // Mutation to save a recipe
  const saveRecipeMutation = useMutation({
    mutationFn: async (recipe: Recipe): Promise<SavedRecipe> => {
      const savedRecipes = getSavedRecipes();
      const existingIndex = savedRecipes.findIndex(r => r.id === recipe.id);
      
      const savedRecipe: SavedRecipe = {
        ...recipe,
        saved_at: new Date().toISOString(),
        times_cooked: existingIndex >= 0 ? savedRecipes[existingIndex].times_cooked : 0,
        user_rating: existingIndex >= 0 ? savedRecipes[existingIndex].user_rating : undefined,
        user_notes: existingIndex >= 0 ? savedRecipes[existingIndex].user_notes : undefined,
      };

      if (existingIndex >= 0) {
        savedRecipes[existingIndex] = savedRecipe;
      } else {
        savedRecipes.push(savedRecipe);
      }

      setSavedRecipes(savedRecipes);
      return savedRecipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.saved() });
    }
  });

  // Mutation to remove a saved recipe
  const removeSavedRecipeMutation = useMutation({
    mutationFn: async (recipeId: string): Promise<void> => {
      const savedRecipes = getSavedRecipes();
      const filteredRecipes = savedRecipes.filter(r => r.id !== recipeId);
      setSavedRecipes(filteredRecipes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.saved() });
    }
  });

  // Mutation to update recipe rating/notes
  const updateRecipeMutation = useMutation({
    mutationFn: async ({ 
      recipeId, 
      updates 
    }: { 
      recipeId: string; 
      updates: Partial<Pick<SavedRecipe, 'user_rating' | 'user_notes' | 'times_cooked' | 'last_cooked'>>
    }): Promise<SavedRecipe> => {
      const savedRecipes = getSavedRecipes();
      const recipeIndex = savedRecipes.findIndex(r => r.id === recipeId);
      
      if (recipeIndex === -1) {
        throw new Error('Recipe not found');
      }

      const updatedRecipe = {
        ...savedRecipes[recipeIndex],
        ...updates
      };

      savedRecipes[recipeIndex] = updatedRecipe;
      setSavedRecipes(savedRecipes);
      
      return updatedRecipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.saved() });
    }
  });

  return {
    savedRecipes: savedRecipesQuery.data || [],
    isLoading: savedRecipesQuery.isLoading,
    saveRecipe: saveRecipeMutation.mutate,
    removeSavedRecipe: removeSavedRecipeMutation.mutate,
    updateRecipe: updateRecipeMutation.mutate,
    isSaving: saveRecipeMutation.isPending,
    isRemoving: removeSavedRecipeMutation.isPending,
    isUpdating: updateRecipeMutation.isPending,
  };
};

/**
 * Hook for filtering and searching saved recipes
 */
export const useFilteredRecipes = (filters: RecipeFilters) => {
  const { savedRecipes } = useSavedRecipes();

  return useQuery({
    queryKey: recipeKeys.filtered(filters),
    queryFn: () => {
      let filtered = [...savedRecipes];

      // Filter by cuisine types
      if (filters.cuisine_types.length > 0) {
        filtered = filtered.filter(recipe => 
          filters.cuisine_types.some(cuisine => 
            recipe.cuisine_style.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
      }

      // Filter by dietary restrictions
      if (filters.dietary_restrictions.length > 0) {
        filtered = filtered.filter(recipe =>
          filters.dietary_restrictions.every(restriction =>
            recipe.tags.some(tag => 
              tag.toLowerCase().includes(restriction.toLowerCase())
            )
          )
        );
      }

      // Filter by max prep time
      if (filters.max_prep_time) {
        filtered = filtered.filter(recipe => 
          recipe.total_time <= filters.max_prep_time!
        );
      }

      // Filter by max difficulty
      if (filters.max_difficulty) {
        filtered = filtered.filter(recipe => 
          recipe.difficulty <= filters.max_difficulty!
        );
      }

      // Filter by meal types
      if (filters.meal_types.length > 0) {
        filtered = filtered.filter(recipe =>
          filters.meal_types.some(mealType =>
            recipe.tags.some(tag => 
              tag.toLowerCase().includes(mealType.toLowerCase())
            )
          )
        );
      }

      // Search by query
      if (filters.search_query) {
        const query = filters.search_query.toLowerCase();
        filtered = filtered.filter(recipe =>
          recipe.recipe_name.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.ingredients.some(ingredient => 
            ingredient.item.toLowerCase().includes(query)
          ) ||
          recipe.tags.some(tag => 
            tag.toLowerCase().includes(query)
          )
        );
      }

      return filtered;
    },
    enabled: savedRecipes.length > 0,
  });
};

/**
 * Hook for recipe statistics
 */
export const useRecipeStats = () => {
  const { savedRecipes } = useSavedRecipes();

  return useQuery({
    queryKey: [...recipeKeys.saved(), 'stats'],
    queryFn: () => {
      const totalRecipes = savedRecipes.length;
      const totalTimesCooked = savedRecipes.reduce((sum, recipe) => 
        sum + (recipe.times_cooked || 0), 0
      );
      
      const averageRating = savedRecipes.length > 0 
        ? savedRecipes
            .filter(recipe => recipe.user_rating)
            .reduce((sum, recipe) => sum + (recipe.user_rating || 0), 0) / 
          savedRecipes.filter(recipe => recipe.user_rating).length
        : 0;

      const cuisineDistribution = savedRecipes.reduce((acc, recipe) => {
        const cuisine = recipe.cuisine_style;
        acc[cuisine] = (acc[cuisine] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const difficultyDistribution = savedRecipes.reduce((acc, recipe) => {
        const difficulty = recipe.difficulty;
        acc[difficulty] = (acc[difficulty] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      return {
        totalRecipes,
        totalTimesCooked,
        averageRating: Math.round(averageRating * 10) / 10,
        cuisineDistribution,
        difficultyDistribution,
        favoriteRecipes: savedRecipes
          .filter(recipe => recipe.user_rating && recipe.user_rating >= 4)
          .sort((a, b) => (b.user_rating || 0) - (a.user_rating || 0))
          .slice(0, 5),
        recentlyCooked: savedRecipes
          .filter(recipe => recipe.last_cooked)
          .sort((a, b) => new Date(b.last_cooked!).getTime() - new Date(a.last_cooked!).getTime())
          .slice(0, 5)
      };
    },
    enabled: savedRecipes.length > 0,
  });
};
