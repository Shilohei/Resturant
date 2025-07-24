// AI System Types
export interface AIRecommendation {
  id: string;
  dishId: string;
  dishName: string;
  description: string;
  price: number;
  confidence: number;
  reason: string;
  category: string;
  image?: string;
  allergens: string[];
  nutritionalInfo?: NutritionalInfo;
  pairings?: Pairing[];
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface Pairing {
  type: 'wine' | 'beer' | 'cocktail' | 'non-alcoholic';
  name: string;
  description: string;
  price: number;
}

export interface CustomerProfile {
  id: string;
  preferences: string[];
  allergies: string[];
  dietaryRestrictions: string[];
  pastOrders: string[];
  favoriteCategories: string[];
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
  priceRange: 'budget' | 'moderate' | 'premium';
}

export interface MenuRecommendationRequest {
  customerId?: string;
  preferences?: string[];
  allergies?: string[];
  dietaryRestrictions?: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  partySize: number;
  budget?: number;
  occasion?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'recommendation' | 'order';
  data?: any;
}

export interface ReservationRequest {
  date: string;
  time: string;
  partySize: number;
  preferences?: string[];
  specialRequests?: string;
  customerId?: string;
}

export interface ReservationResponse {
  id: string;
  status: 'confirmed' | 'pending' | 'waitlist';
  tableNumber?: string;
  estimatedWaitTime?: number;
  dynamicPrice?: number;
  alternatives?: ReservationAlternative[];
}

export interface OrderItem {
  id: string;
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  customerId?: string;
  createdAt: Date;
}

export interface ReservationAlternative {
  time: string;
  price: number;
  tableType: string;
}



export interface AnalyticsData {
  customerBehavior: CustomerBehaviorData;
  menuPerformance: MenuPerformanceData;
  demandForecast: DemandForecastData;
  inventoryInsights: InventoryInsightsData;
}

export interface CustomerBehaviorData {
  averageOrderValue: number;
  popularTimes: string[];
  frequentCustomers: number;
  newCustomers: number;
  retentionRate: number;
}

export interface MenuPerformanceData {
  topDishes: Array<{
    name: string;
    orders: number;
    revenue: number;
    rating: number;
  }>;
  underperforming: Array<{
    name: string;
    orders: number;
    lastOrdered: string;
  }>;
}

export interface DemandForecastData {
  predictedBusyHours: string[];
  expectedCustomers: number;
  recommendedStaffing: number;
  peakDays: string[];
}

export interface InventoryInsightsData {
  lowStock: Array<{
    item: string;
    currentLevel: number;
    recommendedOrder: number;
  }>;
  wasteReduction: Array<{
    item: string;
    suggestedAction: string;
  }>;
}
