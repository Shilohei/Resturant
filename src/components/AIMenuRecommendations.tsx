import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useMenuRecommendations, useCustomerProfile, useSaveCustomerProfile } from '@/hooks/useAI';
import { MenuRecommendationRequest, AIRecommendation } from '@/types/ai.types';
import { 
  Sparkles, 
  Heart, 
  Clock, 
  Users, 
  DollarSign, 
  ChefHat,
  Wine,
  AlertTriangle,
  Star,
  Loader2
} from 'lucide-react';

interface AIMenuRecommendationsProps {
  customerId?: string;
}

const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Keto', 'Paleo', 'Low-Carb'
];

const CUISINE_PREFERENCES = [
  'Italian', 'French', 'Asian', 'Mediterranean', 'American', 'Mexican', 'Indian', 'Japanese'
];

const SPICE_LEVELS = [
  { value: 'mild', label: 'Mild' },
  { value: 'medium', label: 'Medium' },
  { value: 'hot', label: 'Hot' },
  { value: 'extra-hot', label: 'Extra Hot' }
];

export const AIMenuRecommendations: React.FC<AIMenuRecommendationsProps> = ({ customerId = 'guest' }) => {
  const [request, setRequest] = useState<MenuRecommendationRequest>({
    mealType: 'dinner',
    partySize: 2,
    preferences: [],
    allergies: [],
    dietaryRestrictions: []
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [budget, setBudget] = useState([50]);

  const { data: profile } = useCustomerProfile(customerId);
  const saveProfile = useSaveCustomerProfile();
  const { data: recommendations, isLoading, error, refetch } = useMenuRecommendations(request);

  useEffect(() => {
    if (profile) {
      setRequest(prev => ({
        ...prev,
        customerId,
        preferences: profile.preferences,
        allergies: profile.allergies,
        dietaryRestrictions: profile.dietaryRestrictions
      }));
      setBudget([profile.priceRange === 'budget' ? 25 : profile.priceRange === 'premium' ? 100 : 50]);
    }
  }, [profile, customerId]);

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    const updated = checked 
      ? [...(request.preferences || []), preference]
      : (request.preferences || []).filter(p => p !== preference);
    
    setRequest(prev => ({ ...prev, preferences: updated }));
  };

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    const updated = checked 
      ? [...(request.dietaryRestrictions || []), restriction]
      : (request.dietaryRestrictions || []).filter(r => r !== restriction);
    
    setRequest(prev => ({ ...prev, dietaryRestrictions: updated }));
  };

  const handleAllergyChange = (allergy: string) => {
    const allergies = allergy.split(',').map(a => a.trim()).filter(Boolean);
    setRequest(prev => ({ ...prev, allergies }));
  };

  const savePreferences = () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        preferences: request.preferences || [],
        allergies: request.allergies || [],
        dietaryRestrictions: request.dietaryRestrictions || [],
        priceRange: budget[0] <= 30 ? 'budget' : budget[0] >= 80 ? 'premium' : 'moderate'
      };
      saveProfile.mutate(updatedProfile);
    }
  };

  const getRecommendations = () => {
    const updatedRequest = { ...request, budget: budget[0] };
    setRequest(updatedRequest);
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            AI Menu Recommendations
          </h2>
        </div>
        <p className="text-muted-foreground">
          Let our AI chef suggest the perfect dishes for you
        </p>
      </div>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Dining Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Meal Type</Label>
              <Select 
                value={request.mealType} 
                onValueChange={(value: any) => setRequest(prev => ({ ...prev, mealType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Party Size
              </Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={request.partySize}
                onChange={(e) => setRequest(prev => ({ ...prev, partySize: parseInt(e.target.value) || 1 }))}
              />
            </div>

            <div>
              <Label>Occasion</Label>
              <Input
                placeholder="e.g., Date night, Business dinner"
                value={request.occasion || ''}
                onChange={(e) => setRequest(prev => ({ ...prev, occasion: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Budget per person: ${budget[0]}
            </Label>
            <Slider
              value={budget}
              onValueChange={setBudget}
              max={150}
              min={15}
              step={5}
              className="mt-2"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={getRecommendations} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Recommendations
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowPreferences(!showPreferences)}
            >
              Advanced Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Preferences */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Advanced Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cuisine Preferences */}
                <div>
                  <Label className="text-base font-medium">Cuisine Preferences</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {CUISINE_PREFERENCES.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={(request.preferences || []).includes(cuisine)}
                          onCheckedChange={(checked) => handlePreferenceChange(cuisine, checked as boolean)}
                        />
                        <Label htmlFor={cuisine} className="text-sm">{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <Label className="text-base font-medium">Dietary Restrictions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {DIETARY_RESTRICTIONS.map((restriction) => (
                      <div key={restriction} className="flex items-center space-x-2">
                        <Checkbox
                          id={restriction}
                          checked={(request.dietaryRestrictions || []).includes(restriction)}
                          onCheckedChange={(checked) => handleDietaryRestrictionChange(restriction, checked as boolean)}
                        />
                        <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <Label htmlFor="allergies" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Allergies (comma-separated)
                  </Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., nuts, shellfish, dairy"
                    value={(request.allergies || []).join(', ')}
                    onChange={(e) => handleAllergyChange(e.target.value)}
                  />
                </div>

                <Button onClick={savePreferences} variant="outline">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Failed to get recommendations. Please try again.</p>
          </CardContent>
        </Card>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recommended for You
          </h3>
          
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  index: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-semibold">{recommendation.dishName}</h4>
                <Badge variant="secondary">{recommendation.category}</Badge>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round(recommendation.confidence * 100)}% match
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3">{recommendation.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${recommendation.price}
                </span>
                {recommendation.allergens && recommendation.allergens.length > 0 && (
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Contains: {recommendation.allergens.join(', ')}
                  </span>
                )}
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-blue-700">
                  <strong>Why we recommend this:</strong> {recommendation.reason}
                </p>
              </div>

              {recommendation.pairings && recommendation.pairings.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium flex items-center gap-2">
                    <Wine className="h-4 w-4" />
                    Perfect Pairings
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.pairings.map((pairing, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {pairing.name} (+${pairing.price})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button size="sm">
                Add to Order
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
