import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '@/services/aiService';
import {
  AIRecommendation,
  MenuRecommendationRequest,
  ChatMessage,
  ReservationRequest,
  ReservationResponse,

  AnalyticsData
} from '@/types/ai.types';

// Menu Recommendations Hook
export const useMenuRecommendations = (request: MenuRecommendationRequest) => {
  return useQuery({
    queryKey: ['menu-recommendations', request],
    queryFn: () => aiService.getMenuRecommendations(request),
    enabled: !!request.mealType,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });
};

// Chat Hook
export const useAIChat = () => {
  const queryClient = useQueryClient();

  const mockMenu = [
    { dishName: 'Classic Burger', price: 15.99 },
    { dishName: 'Margherita Pizza', price: 18.50 },
    { dishName: 'Caesar Salad', price: 12.00 },
    { dishName: 'Spaghetti Carbonara', price: 22.75 },
    { dishName: 'Grilled Salmon', price: 28.00 },
    { dishName: 'Mushroom Risotto', price: 20.50 },
    { dishName: 'French Onion Soup', price: 9.75 },
    { dishName: 'Chocolate Lava Cake', price: 11.00 },
  ];

  const sendMessage = useMutation<ChatMessage, Error, { message: string; context: ChatMessage[] }>({
    mutationFn: ({ message, context }) => 
      aiService.processChatMessage(message, context, mockMenu),
    onSuccess: (response, variables) => {
      // Update chat history in cache
      queryClient.setQueryData(['chat-history'], (old: ChatMessage[] = []) => [
        ...old,
        {
          id: Date.now().toString(),
          role: 'user',
          content: variables.message,
          timestamp: new Date(),
          type: 'text'
        },
        response
      ]);
    }
  });

  const chatHistory = useQuery({
    queryKey: ['chat-history'],
    queryFn: () => {
      // Load from localStorage or return empty array
      const stored = localStorage.getItem('ai-chat-history');
      return stored ? JSON.parse(stored) : [];
    },
    staleTime: Infinity
  });

  return {
    sendMessage,
    chatHistory: chatHistory.data || [],
    isLoading: sendMessage.isPending,
    menu: mockMenu
  };
};

// Reservation Hook
export const useAIReservation = () => {
  return useMutation({
    mutationFn: (request: ReservationRequest) => aiService.processReservation(request),
    onSuccess: (response) => {
      // Store reservation in localStorage
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      reservations.push(response);
      localStorage.setItem('reservations', JSON.stringify(reservations));
    }
  });
};



// Analytics Hook
export const useAIAnalytics = () => {
  return useQuery({
    queryKey: ['ai-analytics'],
    queryFn: () => aiService.getAnalytics(),
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

// Customer Profile Hook
export const useCustomerProfile = (customerId?: string) => {
  return useQuery({
    queryKey: ['customer-profile', customerId],
    queryFn: () => {
      // Load from localStorage or return default profile
      const stored = localStorage.getItem(`customer-profile-${customerId}`);
      return stored ? JSON.parse(stored) : {
        id: customerId || 'guest',
        preferences: [],
        allergies: [],
        dietaryRestrictions: [],
        pastOrders: [],
        favoriteCategories: [],
        spiceLevel: 'medium',
        priceRange: 'moderate'
      };
    },
    enabled: !!customerId,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Save Customer Profile Hook
export const useSaveCustomerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: any) => {
      localStorage.setItem(`customer-profile-${profile.id}`, JSON.stringify(profile));
      return Promise.resolve(profile);
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(['customer-profile', profile.id], profile);
    }
  });
};

// Personalized Recommendations Hook
export const usePersonalizedRecommendations = (customerId?: string) => {
  const { data: profile } = useCustomerProfile(customerId);
  
  const request: MenuRecommendationRequest = {
    customerId,
    preferences: profile?.preferences || [],
    allergies: profile?.allergies || [],
    dietaryRestrictions: profile?.dietaryRestrictions || [],
    mealType: 'dinner', // Default to dinner
    partySize: 2 // Default party size
  };

  return useMenuRecommendations(request);
};

// Real-time Notifications Hook
export const useAINotifications = () => {
  const queryClient = useQueryClient();

  const addNotification = useMutation({
    mutationFn: (notification: any) => {
      const notifications = JSON.parse(localStorage.getItem('ai-notifications') || '[]');
      const newNotification = {
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
        ...notification
      };
      notifications.unshift(newNotification);
      localStorage.setItem('ai-notifications', JSON.stringify(notifications.slice(0, 50))); // Keep last 50
      return Promise.resolve(newNotification);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-notifications'] });
    }
  });

  const notifications = useQuery({
    queryKey: ['ai-notifications'],
    queryFn: () => {
      const stored = localStorage.getItem('ai-notifications');
      return stored ? JSON.parse(stored) : [];
    },
    refetchInterval: 30 * 1000 // Check every 30 seconds
  });

  const markAsRead = useMutation({
    mutationFn: (notificationId: string) => {
      const notifications = JSON.parse(localStorage.getItem('ai-notifications') || '[]');
      const updated = notifications.map((n: any) => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('ai-notifications', JSON.stringify(updated));
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-notifications'] });
    }
  });

  return {
    notifications: notifications.data || [],
    addNotification,
    markAsRead,
    unreadCount: (notifications.data || []).filter((n: any) => !n.read).length
  };
};
