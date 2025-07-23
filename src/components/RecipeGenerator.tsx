import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ChefHat, 
  Clock, 
  Users, 
  Sparkles, 
  Plus, 
  X, 
  Loader2,
  AlertCircle,
  BookOpen,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGenerateRecipe, useSavedRecipes } from '../hooks/useRecipes';
import { RecipeRequest } from '../types/recipe.types';
import { RecipeCard } from './RecipeCard';
import { SavedRecipesList } from './SavedRecipesList';

// Form validation schema
const recipeRequestSchema = z.object({
  customer_request: z.string().min(10, 'Please describe what you want to cook (at least 10 characters)'),
  cooking_time: z.number().min(5).max(480),
  serving_size: z.number().min(1).max(20),
  cuisine_preference: z.string().optional(),
  spice_level: z.enum(['mild', 'medium', 'hot', 'very_hot']).optional(),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer']).optional(),
  skill_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  budget_range: z.enum(['economic', 'moderate', 'premium']).optional(),
});

type RecipeRequestForm = z.infer<typeof recipeRequestSchema>;

const CUISINE_OPTIONS = [
  'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Indian', 'French', 
  'Thai', 'Japanese', 'Chinese', 'American', 'Middle Eastern', 'Fusion'
];

const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Keto', 'Paleo', 
  'Halal', 'Kosher', 'Low-carb', 'High-protein', 'Nut-free'
];

export const RecipeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const { mutate: generateRecipe, isPending, error } = useGenerateRecipe();
  const { savedRecipes, saveRecipe } = useSavedRecipes();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<RecipeRequestForm>({
    resolver: zodResolver(recipeRequestSchema),
    defaultValues: {
      cooking_time: 30,
      serving_size: 4,
      spice_level: 'medium',
      meal_type: 'dinner',
      skill_level: 'intermediate',
      budget_range: 'moderate'
    }
  });

  const watchedValues = watch();

  const addDietaryRestriction = (restriction: string) => {
    if (!dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const removeDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !availableIngredients.includes(newIngredient.trim())) {
      setAvailableIngredients([...availableIngredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setAvailableIngredients(availableIngredients.filter(i => i !== ingredient));
  };

  const onSubmit = (data: RecipeRequestForm) => {
    const request: RecipeRequest = {
      ...data,
      dietary_restrictions: dietaryRestrictions,
      available_ingredients: availableIngredients,
    };

    generateRecipe(request, {
      onSuccess: (response) => {
        setGeneratedRecipe(response);
        setActiveTab('result');
      }
    });
  };

  const handleSaveRecipe = () => {
    if (generatedRecipe?.recipe) {
      saveRecipe(generatedRecipe.recipe);
    }
  };

  const resetForm = () => {
    reset();
    setDietaryRestrictions([]);
    setAvailableIngredients([]);
    setGeneratedRecipe(null);
    setActiveTab('generate');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <ChefHat className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            AI Recipe Generator
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us what you're craving, what ingredients you have, and your preferences. 
          Our AI chef will create a personalized recipe just for you!
        </p>
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Recipe
          </TabsTrigger>
          <TabsTrigger value="result" disabled={!generatedRecipe}>
            <BookOpen className="h-4 w-4" />
            Recipe Result
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Saved Recipes ({savedRecipes.length})
          </TabsTrigger>
        </TabsList>

        {/* Generate Recipe Tab */}
        <TabsContent value="generate" className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Recipe Request */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5" />
                      What would you like to cook?
                    </CardTitle>
                    <CardDescription>
                      Describe what you're craving or what type of dish you want to make
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      {...register('customer_request')}
                      placeholder="I want to make something spicy and Asian-inspired for dinner..."
                      className="min-h-[100px]"
                    />
                    {errors.customer_request && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.customer_request.message}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Basic Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cooking_time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Cooking Time (minutes)
                      </Label>
                      <Input
                        id="cooking_time"
                        type="number"
                        {...register('cooking_time', { valueAsNumber: true })}
                        min="5"
                        max="480"
                      />
                    </div>
                    <div>
                      <Label htmlFor="serving_size" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Serving Size
                      </Label>
                      <Input
                        id="serving_size"
                        type="number"
                        {...register('serving_size', { valueAsNumber: true })}
                        min="1"
                        max="20"
                      />
                    </div>
                    <div>
                      <Label>Cuisine Preference</Label>
                      <Select onValueChange={(value) => setValue('cuisine_preference', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          {CUISINE_OPTIONS.map((cuisine) => (
                            <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                              {cuisine}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Meal Type</Label>
                      <Select onValueChange={(value) => setValue('meal_type', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                          <SelectItem value="appetizer">Appetizer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Spice Level</Label>
                      <Select onValueChange={(value) => setValue('spice_level', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select spice level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hot">Hot</SelectItem>
                          <SelectItem value="very_hot">Very Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Skill Level</Label>
                      <Select onValueChange={(value) => setValue('skill_level', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Dietary Restrictions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dietary Restrictions</CardTitle>
                    <CardDescription>
                      Select any dietary restrictions or preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {DIETARY_RESTRICTIONS.map((restriction) => (
                        <Button
                          key={restriction}
                          type="button"
                          variant={dietaryRestrictions.includes(restriction) ? "default" : "outline"}
                          size="sm"
                          onClick={() => 
                            dietaryRestrictions.includes(restriction)
                              ? removeDietaryRestriction(restriction)
                              : addDietaryRestriction(restriction)
                          }
                          className="justify-start"
                        >
                          {restriction}
                        </Button>
                      ))}
                    </div>
                    {dietaryRestrictions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {dietaryRestrictions.map((restriction) => (
                          <Badge key={restriction} variant="secondary" className="flex items-center gap-1">
                            {restriction}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeDietaryRestriction(restriction)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Available Ingredients */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Ingredients</CardTitle>
                    <CardDescription>
                      Add ingredients you have on hand (optional)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        placeholder="Add an ingredient..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                      />
                      <Button type="button" onClick={addIngredient} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {availableIngredients.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {availableIngredients.map((ingredient) => (
                          <Badge key={ingredient} variant="outline" className="flex items-center gap-1">
                            {ingredient}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeIngredient(ingredient)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error.message || 'Failed to generate recipe. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <div className="flex justify-center gap-4">
              <Button type="button" variant="outline" onClick={resetForm}>
                Reset Form
              </Button>
              <Button type="submit" disabled={isPending} className="min-w-[200px]">
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Recipe
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Recipe Result Tab */}
        <TabsContent value="result">
          <AnimatePresence>
            {generatedRecipe && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <RecipeCard 
                  recipe={generatedRecipe.recipe}
                  customizationOptions={generatedRecipe.customization_options}
                  cookingTips={generatedRecipe.cooking_tips}
                  onSave={handleSaveRecipe}
                  showSaveButton={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Saved Recipes Tab */}
        <TabsContent value="saved">
          <SavedRecipesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
