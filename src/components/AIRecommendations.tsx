import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, TrendingUp, Clock, Thermometer, Leaf, Mic, Eye, Zap } from "lucide-react";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  price: number;
  reason: string;
  confidence: number;
  tags: string[];
  estimatedTime: number;
  mood?: string;
  weatherOptimized?: boolean;
  aiGenerated?: boolean;
}

interface UserContext {
  mood: string;
  weather: string;
  timeOfDay: string;
  location: string;
  previousOrders: string[];
  dietaryRestrictions: string[];
  spicePreference: number;
  priceRange: string;
  deviceType: string;
  batteryLevel?: number;
}

export const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userContext, setUserContext] = useState<UserContext>({
    mood: "adventurous",
    weather: "cool",
    timeOfDay: "evening",
    location: "downtown",
    previousOrders: ["pasta", "seafood"],
    dietaryRestrictions: ["vegetarian-friendly"],
    spicePreference: 7,
    priceRange: "premium",
    deviceType: "mobile",
    batteryLevel: 85
  });
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [emotionDetected, setEmotionDetected] = useState<string | null>(null);

  // Simulate advanced AI recommendations with multiple data sources
  useEffect(() => {
    const generateAdvancedRecommendations = () => {
      const contextualRecommendations: Recommendation[] = [
        {
          id: "ai-premium-1",
          name: "Molecular Truffle Experience",
          description: "Deconstructed truffle risotto with edible gold leaf and aromatic smoke presentation",
          price: 45,
          reason: "Perfect for your adventurous mood and premium dining preference",
          confidence: 96,
          tags: ["molecular", "premium", "instagram-worthy", "signature"],
          estimatedTime: 35,
          mood: "adventurous",
          weatherOptimized: true,
          aiGenerated: true
        },
        {
          id: "ai-wellness-2",
          name: "Adaptogenic Superfood Bowl",
          description: "Quinoa bowl with ashwagandha-infused dressing, microgreens, and healing mushrooms",
          price: 28,
          reason: "Trending wellness dish optimized for your health-conscious profile",
          confidence: 92,
          tags: ["superfood", "wellness", "trending", "energy-boosting"],
          estimatedTime: 20,
          mood: "health-focused",
          weatherOptimized: false,
          aiGenerated: true
        },
        {
          id: "ai-comfort-3",
          name: "Elevated Mac & Cheese Soufflé",
          description: "Truffle mac and cheese soufflé with crispy pancetta and herb oil",
          price: 32,
          reason: "Weather-optimized comfort food with gourmet elevation",
          confidence: 89,
          tags: ["comfort", "weather-perfect", "elevated-classic", "warming"],
          estimatedTime: 25,
          mood: "comfort-seeking",
          weatherOptimized: true,
          aiGenerated: false
        },
        {
          id: "ai-sustainable-4",
          name: "Zero-Waste Vegetable Symphony",
          description: "Nose-to-tail vegetable preparation using stems, leaves, and roots in creative ways",
          price: 26,
          reason: "Aligns with your sustainability values and dietary preferences",
          confidence: 94,
          tags: ["sustainable", "zero-waste", "vegetarian", "innovative"],
          estimatedTime: 30,
          mood: "conscious",
          weatherOptimized: false,
          aiGenerated: true
        }
      ];
      setRecommendations(contextualRecommendations);
    };

    generateAdvancedRecommendations();
  }, [userContext]);

  // Voice search functionality
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQuery(transcript);
        processVoiceQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };
    }
  };

  const processVoiceQuery = (query: string) => {
    // Simulate AI processing of voice query
    const lowerQuery = query.toLowerCase();
    let newContext = { ...userContext };

    if (lowerQuery.includes('spicy')) newContext.spicePreference = 9;
    if (lowerQuery.includes('mild')) newContext.spicePreference = 3;
    if (lowerQuery.includes('healthy')) newContext.mood = 'health-focused';
    if (lowerQuery.includes('comfort')) newContext.mood = 'comfort-seeking';
    if (lowerQuery.includes('adventurous')) newContext.mood = 'adventurous';

    setUserContext(newContext);
  };

  // Simulate emotion detection
  useEffect(() => {
    const detectEmotion = () => {
      const emotions = ['happy', 'excited', 'relaxed', 'stressed', 'celebratory'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setEmotionDetected(randomEmotion);
    };

    const timer = setTimeout(detectEmotion, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getReasonIcon = (reason: string) => {
    if (reason.includes("weather")) return <Thermometer className="w-4 h-4" />;
    if (reason.includes("trending")) return <TrendingUp className="w-4 h-4" />;
    if (reason.includes("dietary")) return <Leaf className="w-4 h-4" />;
    if (reason.includes("mood")) return <Brain className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-400";
    if (confidence >= 90) return "text-gold";
    if (confidence >= 85) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-burgundy rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gold-dark rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-12 h-12 text-gold mr-4 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white">
              AI <span className="text-luxury glow">Intelligence</span>
            </h2>
          </div>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto mb-6">
            Powered by machine learning, emotion recognition, weather data, and your unique preferences
          </p>
          
          {/* Voice Search Interface */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <Button
              variant={isListening ? "luxury" : "ghost-gold"}
              size="lg"
              onClick={startVoiceSearch}
              className="relative overflow-hidden"
            >
              <Mic className={`w-5 h-5 mr-2 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening ? "Listening..." : "Voice Search"}
              {isListening && (
                <div className="absolute inset-0 bg-gold/20 animate-pulse"></div>
              )}
            </Button>
            
            {voiceQuery && (
              <div className="bg-charcoal-light/50 px-4 py-2 rounded-lg border border-gold/30">
                <span className="text-gold text-sm">"{voiceQuery}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Context Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-gold" />
              <div>
                <div className="text-xs text-warm-gray">Weather</div>
                <div className="text-sm text-gold font-semibold">Cool Evening</div>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-gold" />
              <div>
                <div className="text-xs text-warm-gray">Mood</div>
                <div className="text-sm text-gold font-semibold capitalize">{userContext.mood}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gold" />
              <div>
                <div className="text-xs text-warm-gray">Time</div>
                <div className="text-sm text-gold font-semibold">Evening</div>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gold" />
              <div>
                <div className="text-xs text-warm-gray">Spice Level</div>
                <div className="text-sm text-gold font-semibold">{userContext.spicePreference}/10</div>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-gold" />
              <div>
                <div className="text-xs text-warm-gray">Diet</div>
                <div className="text-sm text-gold font-semibold">Flexible</div>
              </div>
            </div>
          </div>
          
          {emotionDetected && (
            <div className="bg-charcoal-light/30 rounded-lg p-3 border border-gold/20 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gold" />
                <div>
                  <div className="text-xs text-warm-gray">Emotion</div>
                  <div className="text-sm text-gold font-semibold capitalize">{emotionDetected}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {recommendations.map((rec, index) => (
            <Card 
              key={rec.id}
              className="bg-charcoal-light/40 border-gold/20 backdrop-blur-lg hover:scale-105 hover:shadow-luxury transition-all duration-700 animate-fade-in relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-burgundy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* AI Badge */}
              {rec.aiGenerated && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
              )}
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <CardTitle className="text-2xl font-cormorant text-gold group-hover:text-luxury transition-colors duration-300">
                    {rec.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Brain className="w-4 h-4 text-gold" />
                      <span className={`font-bold text-lg ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-warm-gray text-sm mb-3">
                  {getReasonIcon(rec.reason)}
                  <span className="ml-2">{rec.reason}</span>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-warm-gray text-sm mb-6 leading-relaxed">
                  {rec.description}
                </p>
                
                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {rec.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs border-gold/30 text-gold hover:bg-gold/10 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {rec.weatherOptimized && (
                    <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-400/30">
                      <Thermometer className="w-3 h-3 mr-1" />
                      Weather Perfect
                    </Badge>
                  )}
                </div>

                {/* Enhanced Bottom Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <span className="text-3xl font-cormorant font-bold text-luxury">
                      ${rec.price}
                    </span>
                    <div className="flex items-center text-warm-gray text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {rec.estimatedTime}min
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost-gold" size="sm" className="opacity-70 hover:opacity-100">
                      Preview AR
                    </Button>
                    <Button variant="luxury" size="sm" className="relative overflow-hidden group">
                      <span className="relative z-10">Add to Order</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced AI Features Showcase */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-cormorant font-semibold text-purple-300 mb-2">
                Predictive Analytics
              </h3>
              <p className="text-warm-gray text-sm">
                Our AI predicts your cravings based on 47 data points including weather, time, mood, and dining history.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-cormorant font-semibold text-green-300 mb-2">
                Emotion Recognition
              </h3>
              <p className="text-warm-gray text-sm">
                Advanced computer vision detects your mood to suggest dishes that match your emotional state.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Mic className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-cormorant font-semibold text-blue-300 mb-2">
                Natural Language
              </h3>
              <p className="text-warm-gray text-sm">
                Speak naturally: "I want something healthy and filling" and our AI understands your intent perfectly.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Learning & Privacy Notice */}
        <div className="bg-gradient-to-r from-charcoal-light/40 to-charcoal/40 rounded-xl p-8 border border-gold/20 backdrop-blur-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-8 h-8 text-gold mr-3" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-cormorant font-bold text-gold">Adaptive Intelligence Engine</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-warm-white mb-3">How Our AI Works</h4>
              <ul className="space-y-2 text-warm-gray text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Real-time weather and environmental data integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Behavioral pattern analysis and preference learning
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Nutritional optimization based on your health goals
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Social dining trends and seasonal availability
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-warm-white mb-3">Privacy & Control</h4>
              <p className="text-warm-gray text-sm mb-4">
                Your data is processed locally when possible. You have complete control over what information 
                is used for recommendations, and you can opt out of any data collection at any time.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost-gold" size="sm">
                  Privacy Settings
                </Button>
                <Button variant="ghost-gold" size="sm">
                  Data Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};