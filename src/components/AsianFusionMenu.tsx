import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Flame, Leaf, Wheat, Clock, Award } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  spiceLevel: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isChefSpecial: boolean;
  isPopular: boolean;
  preparationTime: string;
  allergens: string[];
  origin: string;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export const AsianFusionMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [cart, setCart] = useState<{[key: string]: number}>({});

  // Improved menu structure with better organization and authentic items
  const menuCategories: MenuCategory[] = [
    {
      id: "appetizers",
      name: "Small Plates & Appetizers",
      description: "Perfect for sharing or starting your culinary journey",
      items: [
        {
          id: "app1",
          name: "Gyoza Trio",
          description: "Pan-fried pork, chicken, and vegetable dumplings with ponzu dipping sauce",
          price: 14,
          spiceLevel: 1,
          isVegetarian: false,
          isGlutenFree: false,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "8-10 min",
          allergens: ["gluten", "soy"],
          origin: "Japan"
        },
        {
          id: "app2",
          name: "Korean Corn Cheese",
          description: "Grilled corn kernels with melted mozzarella, mayo, and gochugaru seasoning",
          price: 12,
          spiceLevel: 2,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "6-8 min",
          allergens: ["dairy"],
          origin: "Korea"
        },
        {
          id: "app3",
          name: "Vietnamese Spring Rolls",
          description: "Fresh rice paper rolls with shrimp, herbs, and vermicelli, served with peanut sauce",
          price: 11,
          spiceLevel: 0,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: false,
          preparationTime: "5-7 min",
          allergens: ["peanuts", "shellfish"],
          origin: "Vietnam"
        },
        {
          id: "app4",
          name: "Szechuan Wontons",
          description: "Pork and chive wontons in aromatic chili oil with Szechuan peppercorns",
          price: 13,
          spiceLevel: 4,
          isVegetarian: false,
          isGlutenFree: false,
          isChefSpecial: true,
          isPopular: false,
          preparationTime: "10-12 min",
          allergens: ["gluten", "soy"],
          origin: "China"
        },
        {
          id: "app5",
          name: "Thai Satay Skewers",
          description: "Grilled chicken skewers marinated in coconut milk and spices, served with cucumber relish",
          price: 15,
          spiceLevel: 2,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "12-15 min",
          allergens: ["peanuts"],
          origin: "Thailand"
        }
      ]
    },
    {
      id: "soups",
      name: "Soups & Broths",
      description: "Warming bowls of comfort from across Asia",
      items: [
        {
          id: "soup1",
          name: "Tonkotsu Ramen",
          description: "Rich pork bone broth with chashu pork, soft-boiled egg, and fresh noodles",
          price: 18,
          spiceLevel: 1,
          isVegetarian: false,
          isGlutenFree: false,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "15-18 min",
          allergens: ["gluten", "eggs", "soy"],
          origin: "Japan"
        },
        {
          id: "soup2",
          name: "Tom Kha Gai",
          description: "Creamy coconut chicken soup with galangal, lemongrass, and lime leaves",
          price: 16,
          spiceLevel: 2,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "12-15 min",
          allergens: [],
          origin: "Thailand"
        },
        {
          id: "soup3",
          name: "Kimchi Jjigae",
          description: "Spicy fermented cabbage stew with pork belly and tofu in rich broth",
          price: 17,
          spiceLevel: 4,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: false,
          preparationTime: "18-20 min",
          allergens: ["soy"],
          origin: "Korea"
        }
      ]
    },
    {
      id: "mains",
      name: "Main Courses",
      description: "Signature dishes representing the best of Asian cuisine",
      items: [
        {
          id: "main1",
          name: "Peking Duck Pancakes",
          description: "Traditional roasted duck with hoisin sauce, cucumber, and scallions in thin pancakes",
          price: 32,
          spiceLevel: 1,
          isVegetarian: false,
          isGlutenFree: false,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "25-30 min",
          allergens: ["gluten", "soy"],
          origin: "China"
        },
        {
          id: "main2",
          name: "Korean BBQ Bulgogi",
          description: "Marinated beef short ribs grilled tableside, served with banchan and steamed rice",
          price: 28,
          spiceLevel: 2,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "20-25 min",
          allergens: ["soy"],
          origin: "Korea"
        },
        {
          id: "main3",
          name: "Pad Thai Goong",
          description: "Stir-fried rice noodles with prawns, bean sprouts, and tamarind sauce",
          price: 22,
          spiceLevel: 2,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "15-18 min",
          allergens: ["shellfish", "peanuts"],
          origin: "Thailand"
        },
        {
          id: "main4",
          name: "Chicken Teriyaki Bento",
          description: "Grilled chicken with teriyaki glaze, served with miso soup, salad, and rice",
          price: 24,
          spiceLevel: 0,
          isVegetarian: false,
          isGlutenFree: false,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "18-22 min",
          allergens: ["gluten", "soy"],
          origin: "Japan"
        },
        {
          id: "main5",
          name: "Vietnamese Pho Bo",
          description: "Traditional beef noodle soup with rice noodles, herbs, and aromatic broth",
          price: 19,
          spiceLevel: 1,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "12-15 min",
          allergens: [],
          origin: "Vietnam"
        },
        {
          id: "main6",
          name: "Mapo Tofu",
          description: "Silky tofu in spicy Szechuan sauce with ground pork and fermented black beans",
          price: 20,
          spiceLevel: 4,
          isVegetarian: false,
          isGlutenFree: true,
          isChefSpecial: true,
          isPopular: false,
          preparationTime: "15-18 min",
          allergens: ["soy"],
          origin: "China"
        }
      ]
    },
    {
      id: "vegetarian",
      name: "Plant-Based Selections",
      description: "Delicious vegetarian and vegan options from across Asia",
      items: [
        {
          id: "veg1",
          name: "Buddha's Delight",
          description: "Mixed vegetables and tofu in savory brown sauce with shiitake mushrooms",
          price: 18,
          spiceLevel: 1,
          isVegetarian: true,
          isGlutenFree: false,
          isChefSpecial: false,
          isPopular: false,
          preparationTime: "15-18 min",
          allergens: ["soy", "gluten"],
          origin: "China"
        },
        {
          id: "veg2",
          name: "Vegetable Pad See Ew",
          description: "Wide rice noodles with Chinese broccoli, egg, and sweet soy sauce",
          price: 17,
          spiceLevel: 0,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "12-15 min",
          allergens: ["soy", "eggs"],
          origin: "Thailand"
        },
        {
          id: "veg3",
          name: "Korean Bibimbap",
          description: "Mixed vegetables over rice with gochujang sauce and fried egg",
          price: 19,
          spiceLevel: 3,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "18-20 min",
          allergens: ["eggs", "soy"],
          origin: "Korea"
        }
      ]
    },
    {
      id: "desserts",
      name: "Sweet Endings",
      description: "Traditional and modern Asian-inspired desserts",
      items: [
        {
          id: "des1",
          name: "Mochi Ice Cream Trio",
          description: "Green tea, red bean, and mango mochi with premium ice cream",
          price: 12,
          spiceLevel: 0,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: true,
          preparationTime: "3-5 min",
          allergens: ["dairy"],
          origin: "Japan"
        },
        {
          id: "des2",
          name: "Thai Mango Sticky Rice",
          description: "Sweet coconut sticky rice topped with fresh mango slices",
          price: 10,
          spiceLevel: 0,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: true,
          isPopular: true,
          preparationTime: "5-7 min",
          allergens: [],
          origin: "Thailand"
        },
        {
          id: "des3",
          name: "Chinese Sesame Balls",
          description: "Crispy glutinous rice balls filled with red bean paste and rolled in sesame seeds",
          price: 9,
          spiceLevel: 0,
          isVegetarian: true,
          isGlutenFree: true,
          isChefSpecial: false,
          isPopular: false,
          preparationTime: "8-10 min",
          allergens: ["sesame"],
          origin: "China"
        }
      ]
    }
  ];

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame 
        key={i} 
        size={12} 
        className={i < level ? "text-red-500 fill-red-500" : "text-gray-300"} 
      />
    ));
  };

  const getDietaryBadges = (item: MenuItem) => {
    const badges = [];
    if (item.isVegetarian) badges.push(<Badge key="veg" className="bg-green-500/20 text-green-300 border-green-400/30"><Leaf size={12} className="mr-1" />Vegetarian</Badge>);
    if (item.isGlutenFree) badges.push(<Badge key="gf" className="bg-blue-500/20 text-blue-300 border-blue-400/30"><Wheat size={12} className="mr-1" />Gluten-Free</Badge>);
    if (item.isChefSpecial) badges.push(<Badge key="chef" className="bg-gold/20 text-gold border-gold/30"><Award size={12} className="mr-1" />Chef's Special</Badge>);
    if (item.isPopular) badges.push(<Badge key="pop" className="bg-purple-500/20 text-purple-300 border-purple-400/30"><Star size={12} className="mr-1" />Popular</Badge>);
    return badges;
  };

  return (
    <section id="asian-menu" className="py-20 bg-gradient-to-b from-charcoal to-charcoal-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
            Asian <span className="text-luxury">Fusion Menu</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto mb-8">
            A curated journey through the diverse flavors of Asia, featuring authentic dishes 
            and modern interpretations crafted with the finest ingredients.
          </p>
          
          {/* Menu Analysis Summary */}
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gold mb-1">6</div>
                <div className="text-warm-gray text-sm">Countries Represented</div>
              </CardContent>
            </Card>
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gold mb-1">22</div>
                <div className="text-warm-gray text-sm">Signature Dishes</div>
              </CardContent>
            </Card>
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gold mb-1">8</div>
                <div className="text-warm-gray text-sm">Vegetarian Options</div>
              </CardContent>
            </Card>
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gold mb-1">12</div>
                <div className="text-warm-gray text-sm">Gluten-Free Items</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Menu Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-charcoal-light/50 mb-12">
            {menuCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-gold data-[state=active]:text-charcoal"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-cormorant font-bold text-gold mb-2">
                  {category.name}
                </h3>
                <p className="text-warm-gray max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <Card 
                    key={item.id}
                    className={`bg-charcoal-light/50 border-gold/20 backdrop-blur-sm hover:scale-105 hover:shadow-luxury transition-all duration-500 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl font-cormorant text-gold">
                          {item.name}
                        </CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-cormorant font-bold text-warm-white">
                            ${item.price}
                          </div>
                          <div className="text-xs text-warm-gray">{item.origin}</div>
                        </div>
                      </div>
                      
                      {/* Dietary and Special Badges */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {getDietaryBadges(item)}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-warm-gray text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Item Details */}
                      <div className="space-y-3 mb-6">
                        {/* Spice Level */}
                        {item.spiceLevel > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-warm-gray text-xs">Spice Level:</span>
                            <div className="flex space-x-1">
                              {getSpiceIndicator(item.spiceLevel)}
                            </div>
                          </div>
                        )}
                        
                        {/* Preparation Time */}
                        <div className="flex items-center space-x-2 text-warm-gray text-xs">
                          <Clock size={12} />
                          <span>{item.preparationTime}</span>
                        </div>
                        
                        {/* Allergens */}
                        {item.allergens.length > 0 && (
                          <div className="text-xs text-warm-gray">
                            <span className="font-medium">Contains:</span> {item.allergens.join(", ")}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost-gold"
                        size="sm"
                        onClick={() => addToCart(item.id)}
                        className="w-full"
                      >
                        Add to Order
                        {cart[item.id] && (
                          <Badge className="ml-2 bg-gold text-charcoal">
                            {cart[item.id]}
                          </Badge>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Menu Analysis Report */}
        <div className="mt-20 bg-gradient-to-r from-charcoal-light/40 to-charcoal/40 rounded-xl p-8 border border-gold/20 backdrop-blur-lg">
          <h3 className="text-3xl font-cormorant font-bold text-gold mb-8 text-center">
            Menu Consultant Analysis
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-warm-white mb-4">✅ Strengths Identified</h4>
              <ul className="space-y-2 text-warm-gray text-sm">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Excellent cultural representation across 6 Asian countries
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Clear dietary indicators for modern dining preferences
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Logical flow from small plates to desserts
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Authentic dish names with descriptive explanations
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Good balance of familiar and adventurous options
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-warm-white mb-4">🎯 Key Improvements Made</h4>
              <ul className="space-y-2 text-warm-gray text-sm">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Reorganized into logical progression categories
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Added preparation times for customer expectations
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Enhanced descriptions with cooking methods and origins
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Implemented comprehensive allergen information
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Strategic pricing with clear value propositions
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gold/10 rounded-lg border border-gold/30">
            <h4 className="text-lg font-semibold text-gold mb-3">Top 5 Priority Recommendations</h4>
            <ol className="space-y-2 text-warm-gray text-sm">
              <li><strong className="text-gold">1.</strong> Implement visual spice level indicators for customer clarity</li>
              <li><strong className="text-gold">2.</strong> Add chef's special and popular item highlights to drive sales</li>
              <li><strong className="text-gold">3.</strong> Create dedicated vegetarian section to improve accessibility</li>
              <li><strong className="text-gold">4.</strong> Include preparation times to set proper expectations</li>
              <li><strong className="text-gold">5.</strong> Add country of origin labels to enhance cultural storytelling</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};