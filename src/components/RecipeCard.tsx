import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Star, 
  Heart, 
  Share2, 
  BookmarkPlus,
  AlertTriangle,
  Lightbulb,
  Utensils,
  Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Recipe } from '../types/recipe.types';

interface RecipeCardProps {
  recipe: Recipe;
  customizationOptions?: {
    variations: string[];
    substitutions: Record<string, string[]>;
    difficulty_adjustments: string[];
  };
  cookingTips?: string[];
  onSave?: () => void;
  onRate?: (rating: number) => void;
  showSaveButton?: boolean;
  showRating?: boolean;
  userRating?: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  customizationOptions,
  cookingTips = [],
  onSave,
  onRate,
  showSaveButton = false,
  showRating = false,
  userRating
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredRating, setHoveredRating] = useState(0);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Very Easy';
      case 2: return 'Easy';
      case 3: return 'Medium';
      case 4: return 'Hard';
      case 5: return 'Expert';
      default: return 'Unknown';
    }
  };

  const handleRating = (rating: number) => {
    if (onRate) {
      onRate(rating);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {recipe.recipe_name}
              </CardTitle>
              <CardDescription className="text-lg">
                {recipe.description}
              </CardDescription>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {recipe.cuisine_style}
                </Badge>
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {getDifficultyText(recipe.difficulty)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {showSaveButton && onSave && (
                <Button onClick={onSave} variant="outline" size="sm">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save Recipe
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Prep:</span>
              <span>{formatTime(recipe.prep_time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Cook:</span>
              <span>{formatTime(recipe.cook_time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Serves:</span>
              <span>{recipe.serves}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ChefHat className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Total:</span>
              <span>{formatTime(recipe.total_time)}</span>
            </div>
          </div>

          {/* Rating */}
          {showRating && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium">Rate this recipe:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer transition-colors ${
                      star <= (hoveredRating || userRating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="tips">Tips & Info</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Flavor Profile */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Flavor Profile
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.flavor_profile.map((flavor) => (
                      <Badge key={flavor} variant="outline">
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Nutritional Info */}
                {recipe.nutritional_info && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-3">Nutritional Information (per serving)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {recipe.nutritional_info.calories_per_serving && (
                        <div>
                          <span className="font-medium">Calories:</span>
                          <br />
                          {recipe.nutritional_info.calories_per_serving}
                        </div>
                      )}
                      {recipe.nutritional_info.protein && (
                        <div>
                          <span className="font-medium">Protein:</span>
                          <br />
                          {recipe.nutritional_info.protein}
                        </div>
                      )}
                      {recipe.nutritional_info.carbohydrates && (
                        <div>
                          <span className="font-medium">Carbs:</span>
                          <br />
                          {recipe.nutritional_info.carbohydrates}
                        </div>
                      )}
                      {recipe.nutritional_info.fat && (
                        <div>
                          <span className="font-medium">Fat:</span>
                          <br />
                          {recipe.nutritional_info.fat}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Allergen Warnings */}
              {recipe.allergen_warnings.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Allergen Warning:</strong> This recipe contains {recipe.allergen_warnings.join(', ')}.
                  </AlertDescription>
                </Alert>
              )}

              {/* Pairing Suggestions */}
              {recipe.pairing_suggestions && recipe.pairing_suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Pairing Suggestions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {recipe.pairing_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            {/* Ingredients Tab */}
            <TabsContent value="ingredients" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <div className="grid gap-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <span className="font-medium">{ingredient.item}</span>
                        {ingredient.category && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {ingredient.category}
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm font-medium">{ingredient.amount}</span>
                    </div>
                  ))}
                </div>

                {/* Substitutions */}
                {customizationOptions?.substitutions && Object.keys(customizationOptions.substitutions).length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Possible Substitutions</h4>
                    <div className="space-y-2">
                      {Object.entries(customizationOptions.substitutions).map(([ingredient, substitutes]) => (
                        <div key={ingredient} className="text-sm">
                          <span className="font-medium">{ingredient}:</span> {substitutes.join(', ')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Instructions Tab */}
            <TabsContent value="instructions" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Instructions</h3>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {instruction.step}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p>{instruction.instruction}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          {instruction.timing && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {instruction.timing}
                            </span>
                          )}
                          {instruction.temperature && (
                            <span>{instruction.temperature}</span>
                          )}
                        </div>
                        {instruction.visual_cues && instruction.visual_cues.length > 0 && (
                          <div className="text-sm">
                            <strong>Look for:</strong> {instruction.visual_cues.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tips & Info Tab */}
            <TabsContent value="tips" className="p-6 space-y-6">
              {/* Cooking Tips */}
              {cookingTips.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Cooking Tips
                  </h3>
                  <ul className="space-y-2">
                    {cookingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variations */}
              {customizationOptions?.variations && customizationOptions.variations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recipe Variations</h3>
                  <ul className="space-y-2">
                    {customizationOptions.variations.map((variation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{variation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Storage Instructions */}
              {recipe.storage_instructions && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Storage Instructions</h3>
                  <p>{recipe.storage_instructions}</p>
                </div>
              )}

              {/* Scaling Tips */}
              {recipe.scaling_tips && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Scaling Tips</h3>
                  <p>{recipe.scaling_tips}</p>
                </div>
              )}

              {/* Difficulty Adjustments */}
              {customizationOptions?.difficulty_adjustments && customizationOptions.difficulty_adjustments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Difficulty Adjustments</h3>
                  <ul className="space-y-2">
                    {customizationOptions.difficulty_adjustments.map((adjustment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{adjustment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
