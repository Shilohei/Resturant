import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Clock, MapPin, Thermometer, Star, Brain, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import PexelsImage from "@/components/PexelsImage";

type Mood = 'adventurous' | 'comfort' | 'healthy' | 'indulgent';

interface RecommendationContext {
  timeOfDay: 'breakfast' | 'lunch' | 'dinner' | 'late-night';
  weather: 'sunny' | 'rainy' | 'cold' | 'hot';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  dayOfWeek: 'weekday' | 'weekend';
  userPreferences: string[];
  orderHistory: string[];
  currentLocation?: { lat: number; lng: number };
  mood?: Mood;
}

interface SmartRecommendation {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  confidence: number;
  reasoning: string[];
  category: string;
  tags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  preparationTime: number;
  popularity: number;
  weatherScore: number;
  timeScore: number;
  personalScore: number;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  preparationTime: number;
  popularity: number;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const SmartRecommendations = () => {
  const [context, setContext] = useState<RecommendationContext | null>(null);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<Mood | ''>('');

  const initializeContext = useCallback(async () => {
    try {
      // Get current time context
      const now = new Date();
      const hour = now.getHours();
      const dayOfWeek = now.getDay();
      const month = now.getMonth();

      let timeOfDay: RecommendationContext['timeOfDay'];
      if (hour < 11) timeOfDay = 'breakfast';
      else if (hour < 16) timeOfDay = 'lunch';
      else if (hour < 22) timeOfDay = 'dinner';
      else timeOfDay = 'late-night';

      let season: RecommendationContext['season'];
      if (month >= 2 && month <= 4) season = 'spring';
      else if (month >= 5 && month <= 7) season = 'summer';
      else if (month >= 8 && month <= 10) season = 'fall';
      else season = 'winter';

      // Get weather data (simulated)
      const weather = await getWeatherData();
      
      // Get user preferences from localStorage
      const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '[]');
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');

      setContext({
        timeOfDay,
        weather,
        season,
        dayOfWeek: dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : 'weekday',
        userPreferences,
        orderHistory,
        mood: selectedMood || undefined
      });
    } catch (error) {
      console.error('Error initializing context:', error);
      setIsLoading(false);
    }
  }, [selectedMood]);

  const getWeatherData = useCallback(async (): Promise<RecommendationContext['weather']> => {
    // Simulate weather API call
    const weatherOptions: RecommendationContext['weather'][] = ['sunny', 'rainy', 'cold', 'hot'];
    return weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  }, []);

  const generateRecommendations = useCallback(async () => {
    if (!context) return;

    setIsLoading(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const menuItems: MenuItem[] = [
      {
        id: "1",
        name: "Wagyu Beef Tenderloin",
        description: "Premium A5 Wagyu with truffle butter and seasonal vegetables",
        price: 85,
        category: "mains",
        tags: ["premium", "protein", "indulgent"],
        preparationTime: 25,
        popularity: 0.8,
        nutritionalInfo: { calories: 650, protein: 45, carbs: 15, fat: 35 }
      },
      {
        id: "2",
        name: "Seasonal Vegetable Risotto",
        description: "Creamy arborio rice with fresh seasonal vegetables",
        price: 28,
        category: "mains",
        tags: ["vegetarian", "comfort", "seasonal"],
        preparationTime: 18,
        popularity: 0.7,
        nutritionalInfo: { calories: 420, protein: 12, carbs: 65, fat: 18 }
      },
      {
        id: "3",
        name: "Grilled Salmon",
        description: "Atlantic salmon with quinoa and roasted vegetables",
        price: 32,
        category: "mains",
        tags: ["healthy", "protein", "omega-3"],
        preparationTime: 15,
        popularity: 0.9,
        nutritionalInfo: { calories: 480, protein: 38, carbs: 25, fat: 22 }
      },
      {
        id: "4",
        name: "Butternut Squash Soup",
        description: "Roasted butternut squash with coconut cream",
        price: 16,
        category: "appetizers",
        tags: ["comfort", "warm", "vegan"],
        preparationTime: 10,
        popularity: 0.6,
        nutritionalInfo: { calories: 220, protein: 4, carbs: 35, fat: 8 }
      },
      {
        id: "5",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 14,
        category: "desserts",
        tags: ["indulgent", "chocolate", "warm"],
        preparationTime: 12,
        popularity: 0.85,
        nutritionalInfo: { calories: 520, protein: 8, carbs: 65, fat: 28 }
      }
    ];

    const scoredRecommendations = menuItems.map((item: MenuItem) => {
      const weatherScore = calculateWeatherScore(item, context.weather);
      const timeScore = calculateTimeScore(item, context.timeOfDay);
      const personalScore = calculatePersonalScore(item, context);
      const confidence = (weatherScore + timeScore + personalScore) / 3;

      const reasoning = generateReasoning(item, context, weatherScore, timeScore, personalScore);

      return {
        ...item,
        confidence,
        reasoning,
        weatherScore,
        timeScore,
        personalScore
      } as SmartRecommendation;
    });

    // Sort by confidence and take top 3
    const topRecommendations = scoredRecommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    setRecommendations(topRecommendations);
    setIsLoading(false);
  }, [context]);

  const calculateWeatherScore = useCallback((item: MenuItem, weather: string): number => {
    const weatherPreferences = {
      cold: ['comfort', 'warm', 'soup'],
      hot: ['light', 'fresh', 'cold'],
      rainy: ['comfort', 'warm', 'indulgent'],
      sunny: ['fresh', 'light', 'healthy']
    };

    const preferences = weatherPreferences[weather as keyof typeof weatherPreferences] || [];
    const matches = item.tags.filter((tag: string) => preferences.includes(tag)).length;
    return Math.min(matches / preferences.length, 1);
  }, []);

  const calculateTimeScore = useCallback((item: MenuItem, timeOfDay: string): number => {
    const timePreferences = {
      breakfast: ['light', 'fresh', 'healthy'],
      lunch: ['balanced', 'protein', 'vegetables'],
      dinner: ['premium', 'indulgent', 'protein'],
      'late-night': ['comfort', 'light', 'quick']
    };

    const preferences = timePreferences[timeOfDay as keyof typeof timePreferences] || [];
    const matches = item.tags.filter((tag: string) => preferences.includes(tag)).length;
    return Math.min(matches / preferences.length + item.popularity * 0.3, 1);
  }, []);

  const calculatePersonalScore = useCallback((item: MenuItem, context: RecommendationContext): number => {
    let score = 0;
    
    // Check user preferences
    const preferenceMatches = item.tags.filter((tag: string) => 
      context.userPreferences.includes(tag)
    ).length;
    score += preferenceMatches * 0.3;

    // Check order history
    const historyMatch = context.orderHistory.includes(item.id) ? 0.2 : 0;
    score += historyMatch;

    // Mood matching
    if (context.mood) {
      const moodTags = {
        adventurous: ['premium', 'unique', 'exotic'],
        comfort: ['comfort', 'warm', 'familiar'],
        healthy: ['healthy', 'fresh', 'light'],
        indulgent: ['indulgent', 'rich', 'premium']
      };
      
      const moodMatches = item.tags.filter((tag: string) => 
        moodTags[context.mood as keyof typeof moodTags]?.includes(tag)
      ).length;
      score += moodMatches * 0.4;
    }

    return Math.min(score, 1);
  }, []);

  const generateReasoning = useCallback(
    (
    item: MenuItem, 
    context: RecommendationContext, 
    weatherScore: number, 
    timeScore: number, 
    personalScore: number
  ): string[] => {
    const reasons = [];

    if (weatherScore > 0.5) {
      const weatherReasons = {
        cold: "Perfect for cold weather - warm and comforting",
        hot: "Light and refreshing for hot weather",
        rainy: "Comforting choice for a rainy day",
        sunny: "Fresh and vibrant for sunny weather"
      };
      reasons.push(weatherReasons[context.weather]);
    }

    if (timeScore > 0.5) {
      const timeReasons = {
        breakfast: "Ideal for starting your day",
        lunch: "Perfect midday meal",
        dinner: "Excellent dinner choice",
        'late-night': "Great for late night dining"
      };
      reasons.push(timeReasons[context.timeOfDay]);
    }

    if (personalScore > 0.5) {
      reasons.push("Matches your taste preferences");
    }

    if (item.popularity > 0.8) {
      reasons.push("Highly popular among our guests");
    }

    if (context.mood) {
      const moodReasons = {
        adventurous: "Perfect for trying something new",
        comfort: "Comforting and satisfying",
        healthy: "Nutritious and wholesome",
        indulgent: "Luxurious and indulgent"
      };
      reasons.push(moodReasons[context.mood]);
    }

    return reasons.filter(Boolean);
  }, []);

  const handleMoodSelection = useCallback((mood: Mood) => {
    setSelectedMood(mood);
    setContext(prev => prev ? { ...prev, mood } : null);
  }, []);

  const handleAddToCart = useCallback((item: SmartRecommendation) => {
    // Add to order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(item.id);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    toast.success(`${item.name} added to cart!`, {
      description: `AI confidence: ${Math.round(item.confidence * 100)}%`
    });
  }, []);

  const moodOptions = [
    { value: 'adventurous', label: 'Adventurous', icon: <Zap className="h-4 w-4" /> },
    { value: 'comfort', label: 'Comfort', icon: <Star className="h-4 w-4" /> },
    { value: 'healthy', label: 'Healthy', icon: <Sparkles className="h-4 w-4" /> },
    { value: 'indulgent', label: 'Indulgent', icon: <TrendingUp className="h-4 w-4" /> }
  ];

  if (!context) return null;

  return (
    <section className="py-12 bg-charcoal-light/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold text-cream mb-4 flex items-center justify-center">
            <Brain className="mr-3 text-gold" />
            AI-Powered Recommendations
          </h3>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Our intelligent system considers weather, time, your preferences, and mood to suggest the perfect dishes for you.
          </p>
        </motion.div>

        {/* Context Display */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="outline" className="border-gold/30 text-gold">
              <Clock className="h-3 w-3 mr-1" />
              {context.timeOfDay}
            </Badge>
            <Badge variant="outline" className="border-blue-400/30 text-blue-400">
              <Thermometer className="h-3 w-3 mr-1" />
              {context.weather}
            </Badge>
            <Badge variant="outline" className="border-green-400/30 text-green-400">
              <MapPin className="h-3 w-3 mr-1" />
              {context.season}
            </Badge>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelection(mood.value as Mood)}
                className={`${
                  selectedMood === mood.value 
                    ? "bg-gold text-charcoal" 
                    : "border-warm-gray/30 text-warm-gray hover:text-cream"
                }`}
              >
                {mood.icon}
                <span className="ml-2">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-charcoal border-warm-gray/20 animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-warm-gray/20 rounded w-3/4"></div>
                      <div className="h-3 bg-warm-gray/20 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-warm-gray/20 rounded"></div>
                        <div className="h-3 bg-warm-gray/20 rounded w-5/6"></div>
                        <div className="h-8 bg-warm-gray/20 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              recommendations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-charcoal border-warm-gray/20 hover:border-gold/50 transition-all duration-300 relative overflow-hidden group">
                    <div className="relative h-48 w-full overflow-hidden">
                      <PexelsImage
                        query={`${item.name} gourmet food`}
                        fallbackType="food"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={item.name}
                      />
                    </div>
                    {/* Confidence indicator */}
                    <div className="absolute top-2 right-2 z-10">
                      <Badge 
                        className={`${
                          item.confidence > 0.8 ? 'bg-green-500' :
                          item.confidence > 0.6 ? 'bg-yellow-500' : 'bg-blue-500'
                        } text-white`}
                      >
                        {Math.round(item.confidence * 100)}% match
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-cream flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-gold font-bold">NRS {item.price}</span>
                      </CardTitle>
                      <p className="text-warm-gray text-sm">{item.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Reasoning */}
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gold">Why we recommend this:</h4>
                        <ul className="text-xs text-warm-gray space-y-1">
                          {item.reasoning.map((reason, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gold mr-1">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nutritional info */}
                      {item.nutritionalInfo && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-warm-gray">
                            <span className="text-cream">{item.nutritionalInfo.calories}</span> cal
                          </div>
                          <div className="text-warm-gray">
                            <span className="text-cream">{item.nutritionalInfo.protein}g</span> protein
                          </div>
                        </div>
                      )}

                      {/* Preparation time */}
                      <div className="flex items-center justify-between text-xs text-warm-gray">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.preparationTime} min
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {Math.round(item.popularity * 100)}% popular
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-gold text-charcoal hover:bg-gold/90"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
