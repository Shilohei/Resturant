import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Plus, Minus, Star, Clock, Leaf, Flame, MapPin, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import PexelsImage from "@/components/PexelsImage";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  dietary: string[];
  spiceLevel?: number;
  featured?: boolean;
  preparationTime?: number;
  calories?: number;
  ingredients?: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
  customizations?: string;
  totalPrice: number;
}

interface OrderDetails {
  type: 'delivery' | 'pickup';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    specialInstructions?: string;
  };
  paymentMethod: 'card' | 'cash' | 'digital';
  scheduledTime?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Wagyu Beef Tenderloin",
    description: "Premium A5 Wagyu with truffle butter, roasted vegetables, and red wine reduction",
    price: 85,
    category: "mains",
    dietary: ["gluten-free"],
    featured: true,
    preparationTime: 25,
    calories: 650,
    ingredients: ["Wagyu beef", "Truffle butter", "Seasonal vegetables", "Red wine"]
  },
  {
    id: "2",
    name: "Lobster Ravioli",
    description: "House-made pasta filled with Maine lobster in saffron cream sauce",
    price: 42,
    category: "mains",
    dietary: [],
    preparationTime: 18,
    calories: 520,
    ingredients: ["Fresh pasta", "Maine lobster", "Saffron", "Heavy cream"]
  },
  {
    id: "3",
    name: "Seared Foie Gras",
    description: "Pan-seared with fig compote and balsamic reduction",
    price: 28,
    category: "appetizers",
    dietary: ["gluten-free"],
    preparationTime: 12,
    calories: 380,
    ingredients: ["Foie gras", "Fresh figs", "Balsamic vinegar"]
  },
  {
    id: "4",
    name: "Tuna Tartare",
    description: "Yellowfin tuna with avocado, citrus, and sesame oil",
    price: 24,
    category: "appetizers",
    dietary: ["gluten-free", "dairy-free"],
    preparationTime: 8,
    calories: 220,
    ingredients: ["Yellowfin tuna", "Avocado", "Citrus", "Sesame oil"]
  },
  {
    id: "5",
    name: "Chocolate Soufflé",
    description: "Dark chocolate soufflé with vanilla bean ice cream",
    price: 16,
    category: "desserts",
    dietary: ["vegetarian"],
    preparationTime: 20,
    calories: 450,
    ingredients: ["Dark chocolate", "Eggs", "Vanilla bean ice cream"]
  },
  {
    id: "6",
    name: "Seasonal Fruit Tart",
    description: "Fresh seasonal fruits on pastry cream with honey glaze",
    price: 14,
    category: "desserts",
    dietary: ["vegetarian"],
    preparationTime: 5,
    calories: 320,
    ingredients: ["Seasonal fruits", "Pastry cream", "Honey", "Tart shell"]
  }
];

export const OnlineOrdering = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    type: 'delivery',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      specialInstructions: ''
    },
    paymentMethod: 'card'
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const categories = ["all", "appetizers", "mains", "desserts"];
  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem, customizations?: string) => {
    const existingItem = cart.find(cartItem => 
      cartItem.id === item.id && cartItem.customizations === customizations
    );

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id && cartItem.customizations === customizations
          ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: (cartItem.quantity + 1) * item.price }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        ...item,
        quantity: 1,
        customizations,
        totalPrice: item.price
      }]);
    }

    toast.success(`${item.name} added to cart!`, {
      description: "Continue shopping or view your cart to checkout.",
      action: {
        label: "View Cart",
        onClick: () => setIsCartOpen(true)
      }
    });
  };

  const updateQuantity = (id: string, customizations: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => !(item.id === id && item.customizations === customizations)));
    } else {
      setCart(cart.map(item =>
        item.id === id && item.customizations === customizations
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price }
          : item
      ));
    }
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.totalPrice, 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getEstimatedTime = () => {
    const maxTime = Math.max(...cart.map(item => item.preparationTime || 15));
    return maxTime + (orderDetails.type === 'delivery' ? 20 : 0);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Order placed successfully!", {
      description: `Your order will be ready in ${getEstimatedTime()} minutes.`,
    });
    
    setCart([]);
    setIsCartOpen(false);
    setIsCheckingOut(false);
  };

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian': return <Leaf className="text-green-500" size={16} />;
      case 'vegan': return <Leaf className="text-green-600" size={16} />;
      case 'gluten-free': return <span className="text-blue-500 text-xs font-bold">GF</span>;
      case 'dairy-free': return <span className="text-purple-500 text-xs font-bold">DF</span>;
      default: return null;
    }
  };

  return (
    <section id="ordering" className="py-20 bg-charcoal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Order Online
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Experience our culinary excellence from the comfort of your home. 
            Fresh ingredients, expert preparation, delivered to your door.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-charcoal-light p-2 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize ${
                  selectedCategory === category 
                    ? "bg-gold text-charcoal hover:bg-gold/90" 
                    : "text-warm-gray hover:text-cream"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-charcoal-light border-warm-gray/20 hover:border-gold/50 transition-all duration-300 group flex flex-col overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <PexelsImage
                      query={`${item.name} food`}
                      fallbackType="food"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.name}
                    />
                    {item.featured && (
                      <Badge className="absolute top-2 left-2 bg-gold text-charcoal z-10">
                        <Star size={12} className="mr-1" />
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-1 z-10">
                      {item.dietary.map((diet) => (
                        <div key={diet} className="bg-charcoal/80 p-1 rounded">
                          {getDietaryIcon(diet)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-cream text-lg">{item.name}</CardTitle>
                      <span className="text-gold font-bold text-lg">${item.price}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-warm-gray text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-warm-gray mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{item.preparationTime} min</span>
                      </div>
                      {item.calories && (
                        <span>{item.calories} cal</span>
                      )}
                      {item.spiceLevel && (
                        <div className="flex items-center space-x-1">
                          <Flame size={12} className="text-red-500" />
                          <span>{item.spiceLevel}/5</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => addToCart(item)}
                      className="w-full bg-gold text-charcoal hover:bg-gold/90 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Cart Button */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 bg-gold text-charcoal hover:bg-gold/90 rounded-full p-4 shadow-lg z-50"
              size="lg"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-6 h-6 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent className="bg-charcoal border-warm-gray/20 text-cream w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="text-cream">Your Order</SheetTitle>
              <SheetDescription className="text-warm-gray">
                Review your items and proceed to checkout
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto text-warm-gray mb-4" />
                  <p className="text-warm-gray">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.customizations}`} className="flex items-center space-x-3 bg-charcoal-light p-3 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-cream">{item.name}</h4>
                          {item.customizations && (
                            <p className="text-xs text-warm-gray">{item.customizations}</p>
                          )}
                          <p className="text-gold font-bold">${item.totalPrice}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.customizations, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.customizations, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-warm-gray/20" />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{orderDetails.type === 'delivery' ? '$4.99' : 'Free'}</span>
                    </div>
                    <Separator className="bg-warm-gray/20" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-gold">
                        ${(getTotalPrice() * 1.08 + (orderDetails.type === 'delivery' ? 4.99 : 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-warm-gray">
                      Estimated time: {getEstimatedTime()} minutes
                    </div>
                  </div>

                  {/* Order Type Selection */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={orderDetails.type === 'delivery' ? 'default' : 'outline'}
                        onClick={() => setOrderDetails({...orderDetails, type: 'delivery'})}
                        className="flex items-center space-x-2"
                      >
                        <Truck size={16} />
                        <span>Delivery</span>
                      </Button>
                      <Button
                        variant={orderDetails.type === 'pickup' ? 'default' : 'outline'}
                        onClick={() => setOrderDetails({...orderDetails, type: 'pickup'})}
                        className="flex items-center space-x-2"
                      >
                        <MapPin size={16} />
                        <span>Pickup</span>
                      </Button>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="name" className="text-warm-gray">Name</Label>
                          <Input
                            id="name"
                            value={orderDetails.customerInfo.name}
                            onChange={(e) => setOrderDetails({
                              ...orderDetails,
                              customerInfo: {...orderDetails.customerInfo, name: e.target.value}
                            })}
                            className="bg-charcoal-light border-warm-gray/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-warm-gray">Phone</Label>
                          <Input
                            id="phone"
                            value={orderDetails.customerInfo.phone}
                            onChange={(e) => setOrderDetails({
                              ...orderDetails,
                              customerInfo: {...orderDetails.customerInfo, phone: e.target.value}
                            })}
                            className="bg-charcoal-light border-warm-gray/20"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-warm-gray">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderDetails.customerInfo.email}
                          onChange={(e) => setOrderDetails({
                            ...orderDetails,
                            customerInfo: {...orderDetails.customerInfo, email: e.target.value}
                          })}
                          className="bg-charcoal-light border-warm-gray/20"
                        />
                      </div>

                      {orderDetails.type === 'delivery' && (
                        <div>
                          <Label htmlFor="address" className="text-warm-gray">Delivery Address</Label>
                          <Textarea
                            id="address"
                            value={orderDetails.customerInfo.address}
                            onChange={(e) => setOrderDetails({
                              ...orderDetails,
                              customerInfo: {...orderDetails.customerInfo, address: e.target.value}
                            })}
                            className="bg-charcoal-light border-warm-gray/20"
                            rows={2}
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="instructions" className="text-warm-gray">Special Instructions</Label>
                        <Textarea
                          id="instructions"
                          value={orderDetails.customerInfo.specialInstructions}
                          onChange={(e) => setOrderDetails({
                            ...orderDetails,
                            customerInfo: {...orderDetails.customerInfo, specialInstructions: e.target.value}
                          })}
                          className="bg-charcoal-light border-warm-gray/20"
                          rows={2}
                          placeholder="Any special requests or dietary restrictions..."
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="text-warm-gray">Payment Method</Label>
                      <Select value={orderDetails.paymentMethod} onValueChange={(value) => 
                        setOrderDetails({...orderDetails, paymentMethod: value as 'card' | 'cash' | 'digital'})
                      }>
                        <SelectTrigger className="bg-charcoal-light border-warm-gray/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">
                            <div className="flex items-center space-x-2">
                              <CreditCard size={16} />
                              <span>Credit/Debit Card</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="cash">Cash on {orderDetails.type === 'delivery' ? 'Delivery' : 'Pickup'}</SelectItem>
                          <SelectItem value="digital">Digital Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut || !orderDetails.customerInfo.name || !orderDetails.customerInfo.phone}
                      className="w-full bg-gold text-charcoal hover:bg-gold/90"
                    >
                      {isCheckingOut ? "Processing..." : `Place Order - $${(getTotalPrice() * 1.08 + (orderDetails.type === 'delivery' ? 4.99 : 0)).toFixed(2)}`}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};
