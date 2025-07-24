import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { useAIChat } from '@/hooks/useAI';
import { useOrder } from '@/hooks/useOrder';
import { ChatMessage } from '@/types/ai.types';
import { OrderItem } from '@/types/ai.types';
import { aiService } from '@/services/aiService';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Loader2,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  customerId?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onToggle, customerId }) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  
  const { sendMessage, chatHistory, isLoading } = useAIChat();
  const { order, addItem, removeItem, clearOrder } = useOrder();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, order]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (content?: string) => {
    const userMessage = content || message;
    if (!userMessage.trim()) return;

    setMessage('');

    try {
      const response = await sendMessage.mutateAsync({ message: userMessage, context: chatHistory });

      if (response.type === 'order' && response.data?.items) {
        response.data.items.forEach((item: any) => {
          addItem({ ...item, dishId: item.dishName.toLowerCase().replace(/\s/g, '-') });
        });
      }

      if (voiceEnabled && 'speechSynthesis' in window) {
        speakText(response.content);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Automatically send message after speech ends
      const finalTranscript = message.trim();
      if(finalTranscript) {
        handleSendMessage(finalTranscript);
      }
    };

    recognition.start();
  };

  const handlePlaceOrder = async () => {
    if (!order || order.items.length === 0) return;

    setIsSubmitting(true);
    setSubmissionStatus('Placing your order...');

    try {
      const result = await aiService.submitOrder(order);
      if (result.success) {
        setSubmissionStatus(`Order placed successfully! Your order ID is ${result.orderId}.`);
        setTimeout(() => {
          clearOrder();
          setSubmissionStatus(null);
        }, 5000);
      } else {
        setSubmissionStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmissionStatus('An error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      stopSpeaking();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getQuickReplies = () => [
    'What are your specials?',
    'Can I make a reservation?',
    'What are the most popular dishes?',
    'Tell me about the chef.',
    'What are your opening hours?',
    'Do you have vegetarian options?',
  ];

  if (!isOpen) {
    return (
      <Button onClick={onToggle} className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50" size="icon">
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`w-96 shadow-2xl ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="relative">
                <Bot className="h-5 w-5 text-blue-500" />
                {isListening && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
              </div>
              AI Assistant
              {isSpeaking && <Badge variant="secondary" className="text-xs">Speaking</Badge>}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)} className="h-8 w-8 p-0">
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
                {chatHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-semibold">Welcome!</p>
                    <p className="text-sm text-muted-foreground">How can I help you today?</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {getQuickReplies().slice(0, 3).map((reply, index) => (
                        <Button key={index} variant="outline" size="sm" onClick={() => handleSendMessage(reply)} className="text-xs h-7">
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {chatHistory.map((msg, index) => <ChatMessageBubble key={index} message={msg} />)}

                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                )}

                {order && order.items.length > 0 && (
                  <div className="p-4 border-t">
                    <h4 className="font-semibold mb-2">Your Order</h4>
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div>
                            <p>{item.dishName} (x{item.quantity})</p>
                            <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}><X className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 text-right">
                      <Button 
                        onClick={handlePlaceOrder} 
                        disabled={isSubmitting || order.items.length === 0}
                      >
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                      </Button>
                    </div>
                    {submissionStatus && (
                      <p className={`mt-2 text-sm text-right ${submissionStatus.includes('Failed') || submissionStatus.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                        {submissionStatus}
                      </p>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4 space-y-3">
              {chatHistory.length === 0 && (
                <div className="flex flex-wrap gap-1">
                  {getQuickReplies().slice(3).map((reply, index) => (
                    <Button key={index} variant="ghost" size="sm" onClick={() => handleSendMessage(reply)} className="text-xs h-7">
                      {reply}
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={isListening ? stopVoiceRecording : startVoiceRecording} disabled={isLoading} className={isListening ? 'text-red-500' : ''}>
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={() => handleSendMessage()} disabled={!message.trim() || isLoading} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {isSpeaking && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>AI is speaking...</span>
                  <Button variant="ghost" size="sm" onClick={stopSpeaking} className="h-6 text-xs">Stop</Button>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500' : 'bg-gray-200'}`}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-gray-600" />}
        </div>
        <div className={`rounded-lg px-3 py-2 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
