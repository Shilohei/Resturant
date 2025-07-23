import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  ChefHat, 
  Trash2, 
  Eye,
  Heart,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSavedRecipes, useFilteredRecipes, useRecipeStats } from '../hooks/useRecipes';
import { RecipeFilters, SavedRecipe } from '../types/recipe.types';
import { RecipeCard } from './RecipeCard';

const CUISINE_TYPES = [
  'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Indian', 'French', 
  'Thai', 'Japanese', 'Chinese', 'American', 'Middle Eastern'
];

const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Keto', 'Paleo'
];

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'];

export const SavedRecipesList: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<RecipeFilters>({
    cuisine_types: [],
    dietary_restrictions: [],
    meal_types: [],
    search_query: '',
  });

  const { 
    savedRecipes, 
    removeSavedRecipe, 
    updateRecipe, 
    isLoading 
  } = useSavedRecipes();
  
  const { data: filteredRecipes = [] } = useFilteredRecipes(filters);
  const { data: stats } = useRecipeStats();

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search_query: query }));
  };

  const handleFilterChange = (key: keyof RecipeFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRateRecipe = (recipeId: string, rating: number) => {
    updateRecipe({ recipeId, updates: { user_rating: rating } });
  };

  const handleMarkAsCooked = (recipeId: string) => {
    const recipe = savedRecipes.find(r => r.id === recipeId);
    if (recipe) {
      updateRecipe({ 
        recipeId, 
        updates: { 
          times_cooked: (recipe.times_cooked || 0) + 1,
          last_cooked: new Date().toISOString()
        } 
      });
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDisplayRecipes = () => {
    switch (activeTab) {
      case 'favorites':
        return savedRecipes.filter(recipe => recipe.user_rating && recipe.user_rating >= 4);
      case 'recent':
        return savedRecipes
          .filter(recipe => recipe.last_cooked)
          .sort((a, b) => new Date(b.last_cooked!).getTime() - new Date(a.last_cooked!).getTime());
      case 'filtered':
        return filteredRecipes;
      default:
        return savedRecipes;
    }
  };

  const displayRecipes = getDisplayRecipes();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalRecipes}</p>
                  <p className="text-sm text-muted-foreground">Saved Recipes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalTimesCooked}</p>
                  <p className="text-sm text-muted-foreground">Times Cooked</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.averageRating || 0}</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.favoriteRecipes.length}</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Recipes ({savedRecipes.length})</TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites ({savedRecipes.filter(r => r.user_rating && r.user_rating >= 4).length})
          </TabsTrigger>
          <TabsTrigger value="recent">Recently Cooked</TabsTrigger>
          <TabsTrigger value="filtered">Filtered</TabsTrigger>
        </TabsList>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={filters.search_query}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => handleFilterChange('cuisine_types', value ? [value] : [])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cuisines</SelectItem>
                {CUISINE_TYPES.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('max_prep_time', value ? parseInt(value) : undefined)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Max Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Time</SelectItem>
                <SelectItem value="30">Under 30m</SelectItem>
                <SelectItem value="60">Under 1h</SelectItem>
                <SelectItem value="120">Under 2h</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('max_difficulty', value ? parseInt(value) : undefined)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Level</SelectItem>
                <SelectItem value="2">Easy (1-2)</SelectItem>
                <SelectItem value="3">Medium (1-3)</SelectItem>
                <SelectItem value="5">All Levels</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipe Lists */}
        <TabsContent value="all" className="mt-6">
          <RecipeGrid 
            recipes={displayRecipes}
            onSelectRecipe={setSelectedRecipe}
            onRemoveRecipe={removeSavedRecipe}
            onRateRecipe={handleRateRecipe}
            onMarkAsCooked={handleMarkAsCooked}
          />
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <RecipeGrid 
            recipes={displayRecipes}
            onSelectRecipe={setSelectedRecipe}
            onRemoveRecipe={removeSavedRecipe}
            onRateRecipe={handleRateRecipe}
            onMarkAsCooked={handleMarkAsCooked}
          />
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <RecipeGrid 
            recipes={displayRecipes}
            onSelectRecipe={setSelectedRecipe}
            onRemoveRecipe={removeSavedRecipe}
            onRateRecipe={handleRateRecipe}
            onMarkAsCooked={handleMarkAsCooked}
          />
        </TabsContent>

        <TabsContent value="filtered" className="mt-6">
          <RecipeGrid 
            recipes={displayRecipes}
            onSelectRecipe={setSelectedRecipe}
            onRemoveRecipe={removeSavedRecipe}
            onRateRecipe={handleRateRecipe}
            onMarkAsCooked={handleMarkAsCooked}
          />
        </TabsContent>
      </Tabs>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <RecipeCard
              recipe={selectedRecipe}
              onRate={(rating) => handleRateRecipe(selectedRecipe.id, rating)}
              showRating={true}
              userRating={selectedRecipe.user_rating}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface RecipeGridProps {
  recipes: SavedRecipe[];
  onSelectRecipe: (recipe: SavedRecipe) => void;
  onRemoveRecipe: (recipeId: string) => void;
  onRateRecipe: (recipeId: string, rating: number) => void;
  onMarkAsCooked: (recipeId: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  onSelectRecipe,
  onRemoveRecipe,
  onRateRecipe,
  onMarkAsCooked
}) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or generate some new recipes!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      {recipe.recipe_name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {recipe.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveRecipe(recipe.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {recipe.cuisine_style}
                  </Badge>
                  {recipe.user_rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{recipe.user_rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(recipe.total_time)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {recipe.serves}
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-3 w-3" />
                    Level {recipe.difficulty}
                  </div>
                </div>

                {recipe.times_cooked && recipe.times_cooked > 0 && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Cooked {recipe.times_cooked} time{recipe.times_cooked !== 1 ? 's' : ''}
                    {recipe.last_cooked && (
                      <span> • Last: {formatDate(recipe.last_cooked)}</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectRecipe(recipe)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkAsCooked(recipe.id)}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Cooked
                  </Button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-muted-foreground">Rate:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 cursor-pointer transition-colors ${
                        star <= (recipe.user_rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => onRateRecipe(recipe.id, star)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
