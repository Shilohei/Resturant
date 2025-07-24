import axios from 'axios';
import { 
  AIRecommendation,
  CustomerProfile,
  MenuRecommendationRequest,
  ChatMessage,
  ReservationRequest,
  ReservationResponse,
  AnalyticsData,
  Order
} from '@/types/ai.types';

const AI_API_BASE_URL = 'https://openrouter.ai/api/v1';


class AIService {
  private apiClient;

  constructor() {
    this.apiClient = axios.create({
      baseURL: AI_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Restaurant Platform'
      }
    });

    this.apiClient.interceptors.request.use(config => {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (apiKey) {
        config.headers['Authorization'] = `Bearer ${apiKey}`;
      } else {
        console.error('VITE_OPENROUTER_API_KEY is not set.');
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }

  // AI Menu Recommendations
  async getMenuRecommendations(request: MenuRecommendationRequest): Promise<AIRecommendation[]> {
    try {
      const prompt = this.buildRecommendationPrompt(request);
      
      const response = await this.apiClient.post('/chat/completions', {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'You are an expert restaurant AI assistant specializing in personalized menu recommendations. Provide detailed, accurate recommendations in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const recommendations = this.parseRecommendations(response.data.choices[0].message.content);
      return recommendations;
    } catch (error) {
      console.error('Error getting menu recommendations:', error);
      return this.getFallbackRecommendations(request);
    }
  }

  // AI Chatbot
  async processChatMessage(message: string, context: ChatMessage[], menu: { dishName: string, price: number }[]): Promise<ChatMessage> {
    try {
      const contextPrompt = this.buildChatContext(context);
      
      const response = await this.apiClient.post('/chat/completions', {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are a friendly restaurant AI assistant. Help customers with menu questions, recommendations, orders, and reservations. Be conversational and helpful. When a user wants to order an item, respond with a confirmation message and include a JSON object with the order details. The JSON should be on its own line and have this structure: {"intent": "order", "items": [{"dishName": "string", "quantity": number, "price": number}]}. 

IMPORTANT: You must accurately parse the quantity and the dish name. For example, if the user says 'add two pizzas', you must identify 'two' as the quantity (2) and 'pizzas' as the dishName. If no quantity is specified, assume 1. 

Here are the available menu items: 
${menu.map(item => `- ${item.dishName}: $${item.price}`).join('\n')}

Only add items from this list to the order. If a user asks for something not on the menu, politely inform them it's not available and suggest an alternative from the menu.`
          },
          {
            role: 'user',
            content: `${contextPrompt}\n\nCustomer: ${message}`
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

            const content = response.data.choices[0].message.content;
      const orderJsonMatch = content.match(/\n({"intent":\s*"order".*})/);

      if (orderJsonMatch && orderJsonMatch[1]) {
        try {
          const orderData = JSON.parse(orderJsonMatch[1]);
          return {
            id: Date.now().toString(),
            role: 'assistant',
            content: content.replace(orderJsonMatch[0], '').trim(), // Return only the conversational part
            timestamp: new Date(),
            type: 'order',
            data: orderData
          };
        } catch (e) {
          console.error('Failed to parse order JSON from AI response', e);
        }
      }

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        type: 'text'
      };
    } catch (error) {
      console.error('Error processing chat message:', error);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again or speak with our staff.',
        timestamp: new Date(),
        type: 'text'
      };
    }
  }

  // Intelligent Reservation System
  async processReservation(request: ReservationRequest): Promise<ReservationResponse> {
    try {
      // Simulate AI-powered reservation processing
      const dynamicPrice = this.calculateDynamicPrice(request);
      const availability = await this.checkAvailability(request);
      
      return {
        id: `res_${Date.now()}`,
        status: availability.available ? 'confirmed' : 'waitlist',
        tableNumber: availability.tableNumber,
        estimatedWaitTime: availability.waitTime,
        dynamicPrice,
        alternatives: availability.alternatives
      };
    } catch (error) {
      console.error('Error processing reservation:', error);
      throw new Error('Failed to process reservation');
    }
  }

  // Order Submission
  async submitOrder(order: Order): Promise<{ success: boolean; orderId: string }> {
    try {
      // Simulate API call to submit the order
      console.log('Submitting order:', order);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return { success: true, orderId: order.id };
    } catch (error) {
      console.error('Error submitting order:', error);
      throw new Error('Failed to submit order');
    }
  }

  // Predictive Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      // In a real implementation, this would fetch from analytics API
      return {
        customerBehavior: {
          averageOrderValue: 45.50,
          popularTimes: ['12:00-14:00', '18:00-21:00'],
          frequentCustomers: 234,
          newCustomers: 89,
          retentionRate: 0.78
        },
        menuPerformance: {
          topDishes: [
            { name: 'Grilled Salmon', orders: 156, revenue: 3120, rating: 4.8 },
            { name: 'Beef Tenderloin', orders: 134, revenue: 4020, rating: 4.7 },
            { name: 'Pasta Carbonara', orders: 98, revenue: 1960, rating: 4.6 }
          ],
          underperforming: [
            { name: 'Quinoa Salad', orders: 12, lastOrdered: '2024-01-15' },
            { name: 'Vegetable Curry', orders: 8, lastOrdered: '2024-01-10' }
          ]
        },
        demandForecast: {
          predictedBusyHours: ['12:30-13:30', '19:00-20:30'],
          expectedCustomers: 180,
          recommendedStaffing: 12,
          peakDays: ['Friday', 'Saturday', 'Sunday']
        },
        inventoryInsights: {
          lowStock: [
            { item: 'Salmon Fillets', currentLevel: 15, recommendedOrder: 50 },
            { item: 'Truffle Oil', currentLevel: 2, recommendedOrder: 10 }
          ],
          wasteReduction: [
            { item: 'Fresh Herbs', suggestedAction: 'Create daily specials' },
            { item: 'Seasonal Vegetables', suggestedAction: 'Promote in lunch menu' }
          ]
        }
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw new Error('Analytics data unavailable');
    }
  }

  // Helper Methods
  private buildRecommendationPrompt(request: MenuRecommendationRequest): string {
    return `
      Generate personalized menu recommendations based on:
      - Meal Type: ${request.mealType}
      - Party Size: ${request.partySize}
      - Preferences: ${request.preferences?.join(', ') || 'None specified'}
      - Allergies: ${request.allergies?.join(', ') || 'None'}
      - Dietary Restrictions: ${request.dietaryRestrictions?.join(', ') || 'None'}
      - Budget: ${request.budget || 'No limit'}
      - Occasion: ${request.occasion || 'Casual dining'}

      Please provide 3-5 dish recommendations in JSON format with:
      - dishName, description, price, confidence, reason, category
      - Include allergen information and suggested pairings
      - Ensure recommendations match the specified criteria
    `;
  }

  private buildChatContext(context: ChatMessage[]): string {
    const recentMessages = context.slice(-5);
    return recentMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  }

  private parseRecommendations(content: string): AIRecommendation[] {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recommendations = JSON.parse(jsonMatch[0]);
        return recommendations.map((rec: any, index: number) => ({
          id: `rec_${Date.now()}_${index}`,
          dishId: `dish_${index}`,
          dishName: rec.dishName || rec.name,
          description: rec.description,
          price: rec.price || 0,
          confidence: rec.confidence || 0.8,
          reason: rec.reason || 'AI recommended',
          category: rec.category || 'Main Course',
          allergens: rec.allergens || [],
          pairings: rec.pairings || []
        }));
      }
    } catch (error) {
      console.error('Error parsing recommendations:', error);
    }
    
    return this.getFallbackRecommendations();
  }

  private getFallbackRecommendations(request?: MenuRecommendationRequest): AIRecommendation[] {
    return [
      {
        id: 'rec_1',
        dishId: 'dish_1',
        dishName: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with herbs and lemon',
        price: 28.99,
        confidence: 0.9,
        reason: 'Popular choice for healthy dining',
        category: 'Main Course',
        allergens: ['fish'],
        pairings: [
          {
            type: 'wine',
            name: 'Chardonnay',
            description: 'Crisp white wine that complements salmon',
            price: 12.99
          }
        ]
      },
      {
        id: 'rec_2',
        dishId: 'dish_2',
        dishName: 'Beef Tenderloin',
        description: 'Premium cut with seasonal vegetables',
        price: 42.99,
        confidence: 0.85,
        reason: 'Perfect for special occasions',
        category: 'Main Course',
        allergens: [],
        pairings: [
          {
            type: 'wine',
            name: 'Cabernet Sauvignon',
            description: 'Bold red wine perfect with beef',
            price: 15.99
          }
        ]
      }
    ];
  }

  private calculateDynamicPrice(request: ReservationRequest): number {
    const basePrice = 5.00;
    const timeMultiplier = this.getTimeMultiplier(request.time);
    const sizeMultiplier = request.partySize > 6 ? 1.2 : 1.0;
    
    return basePrice * timeMultiplier * sizeMultiplier;
  }

  private getTimeMultiplier(time: string): number {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 18 && hour <= 21) return 1.5; // Peak dinner hours
    if (hour >= 12 && hour <= 14) return 1.3; // Lunch rush
    return 1.0; // Off-peak
  }

  private async checkAvailability(request: ReservationRequest) {
    // Simulate availability check
    return {
      available: Math.random() > 0.3,
      tableNumber: `T${Math.floor(Math.random() * 20) + 1}`,
      waitTime: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 15 : 0,
      alternatives: [
        {
          time: '19:30',
          price: 7.50,
          tableType: 'Standard'
        },
        {
          time: '20:00',
          price: 5.00,
          tableType: 'Window'
        }
      ]
    };
  }
}

export const aiService = new AIService();
