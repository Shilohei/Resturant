import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Leaf } from "lucide-react";
import menuSteak from "@/assets/menu-steak.jpg";
import menuPasta from "@/assets/menu-pasta.jpg";
import { MenuItem } from "@/types/menu.types";
import { panAsianMenu } from "@/constants/panAsianMenu";

const originalMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Wagyu Beef Tenderloin",
    description: "Premium A5 Wagyu with truffle butter, roasted vegetables, and red wine reduction",
    price: 85,
    image: menuSteak,
    category: "mains",
    dietary: ["gluten-free"],
    featured: true
  },
  {
    id: "2",
    name: "Lobster Ravioli",
    description: "House-made pasta filled with Maine lobster in saffron cream sauce",
    price: 42,
    image: menuPasta,
    category: "mains",
    dietary: []
  },
  {
    id: "3",
    name: "Seared Foie Gras",
    description: "Pan-seared with fig compote and balsamic reduction",
    price: 28,
    category: "appetizers",
    dietary: ["gluten-free"]
  },
  {
    id: "4",
    name: "Tuna Tartare",
    description: "Yellowfin tuna with avocado mousse, crispy shallots, and ponzu",
    price: 24,
    category: "appetizers",
    dietary: ["gluten-free"]
  },
  {
    id: "5",
    name: "Duck Confit",
    description: "Slow-cooked duck leg with garlic potatoes and cherry gastrique",
    price: 38,
    category: "mains",
    dietary: ["gluten-free"]
  },
  {
    id: "6",
    name: "Chocolate Soufflé",
    description: "Dark chocolate soufflé with vanilla bean ice cream (15 min preparation)",
    price: 16,
    category: "desserts",
    dietary: ["vegetarian"]
  },
  {
    id: "7",
    name: "Crème Brûlée",
    description: "Classic vanilla custard with caramelized sugar and seasonal berries",
    price: 14,
    category: "desserts",
    dietary: ["vegetarian", "gluten-free"]
  }
];

const menuItems: MenuItem[] = [...originalMenuItems, ...panAsianMenu];

const categories = [
  { id: "all", name: "All Dishes", icon: "" },
  { id: "appetizers", name: "Appetizers", icon: "" },
  { id: "mains", name: "Main Courses", icon: "" },
  { id: "desserts", name: "Desserts", icon: "" },
  { id: "japan", name: "Japan", icon: "" },
  { id: "china", name: "China", icon: "" },
  { id: "korea", name: "Korea", icon: "" },
  { id: "thailand", name: "Thailand", icon: "" },
  { id: "vietnam", name: "Vietnam", icon: "" },
  { id: "india", name: "India", icon: "" },
  { id: "malaysia-singapore", name: "Malaysia & Singapore", icon: "" },
  { id: "desserts-asia", name: "Asian Desserts", icon: "" },
  { id: "beverages-asia", name: "Asian Beverages", icon: "" },
];

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum: number, count: number) => sum + count, 0);
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-charcoal to-charcoal-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
            Our <span className="text-luxury">Menu</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Each dish is crafted with the finest ingredients and presented as a work of art
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "luxury" : "ghost-gold"}
              size="lg"
              onClick={() => setSelectedCategory(category.id)}
              className="font-medium"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className={`menu-card rounded-lg overflow-hidden group animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              {item.image && (
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gold text-charcoal font-semibold">
                        <Star size={12} className="mr-1" />
                        Chef's Choice
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-sm text-gold px-3 py-1 rounded-full font-semibold">
                    ${item.price}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-cormorant font-semibold text-warm-white group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  {!item.image && (
                    <span className="text-2xl font-cormorant font-bold text-gold">
                      ${item.price}
                    </span>
                  )}
                </div>

                <p className="text-warm-gray text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Dietary Info */}
                {item.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((diet) => (
                      <Badge key={diet} variant="outline" className="text-xs border-gold/30 text-gold">
                        <Leaf size={10} className="mr-1" />
                        {diet}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add to Order Button */}
                <Button 
                  variant="ghost-gold"
                  size="sm"
                  onClick={() => addToCart(item.id)}
                  className="w-full group-hover:bg-gold/10 transition-colors duration-300"
                >
                  Add to Order
                  {cart[item.id] && (
                    <Badge className="ml-2 bg-gold text-charcoal">
                      {cart[item.id]}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6 bg-charcoal-light/90 backdrop-blur-sm border border-gold/30 rounded-lg p-4 animate-slide-up z-40">
            <div className="flex items-center space-x-4">
              <div className="text-gold font-semibold">
                {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in order
              </div>
              <Button variant="luxury" size="sm">
                View Order
              </Button>
            </div>
          </div>
        )}

        {/* Wine Pairing Note */}
        <div className="text-center bg-charcoal-light/50 rounded-lg p-8 border border-gold/20">
          <h3 className="text-2xl font-cormorant font-semibold text-gold mb-3">Wine Pairings Available</h3>
          <p className="text-warm-gray mb-4">
            Our sommelier has carefully selected wines to complement each dish. 
            Ask your server about our curated pairings.
          </p>
          <Button variant="ghost-gold">
            View Wine List
          </Button>
        </div>
      </div>
    </section>
  );
};