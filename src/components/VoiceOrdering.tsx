import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Zap, Brain } from "lucide-react";
import { toast } from "sonner";

interface VoiceCommand {
  id: string;
  command: string;
  response: string;
  action: string;
  confidence: number;
  timestamp: Date;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export const VoiceOrdering = () => {
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new ((window as { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Sample menu items for voice ordering
  const menuItems: MenuItem[] = [
    { id: "1", name: "Wagyu Beef Tenderloin", price: 85, category: "mains" },
    { id: "2", name: "Lobster Ravioli", price: 42, category: "mains" },
    { id: "3", name: "Truffle Risotto", price: 38, category: "mains" },
    { id: "4", name: "Caesar Salad", price: 18, category: "appetizers" },
    { id: "5", name: "Chocolate Soufflé", price: 16, category: "desserts" },
  ];

  const startListening = () => {
    if (!recognitionRef.current) {
      toast.error("Voice Recognition Not Supported", {
        description: "Your browser doesn't support voice recognition."
      });
      return;
    }

    setIsListening(true);
    setTranscript("");
    
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        processVoiceCommand(finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speak = (text: string) => {
    if (!synthRef.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let response = "";
    let action = "unknown";
    let confidence = 0;

    // Menu item recognition
    const foundItem = menuItems.find(item => 
      lowerCommand.includes(item.name.toLowerCase()) ||
      lowerCommand.includes(item.name.split(' ')[0].toLowerCase())
    );

    if (foundItem) {
      if (lowerCommand.includes("add") || lowerCommand.includes("order") || lowerCommand.includes("want")) {
        setCart(prev => [...prev, foundItem]);
        response = `Added ${foundItem.name} to your order for NRS ${foundItem.price}. Anything else?`;
        action = "add_to_cart";
        confidence = 95;
      } else if (lowerCommand.includes("price") || lowerCommand.includes("cost")) {
        response = `The ${foundItem.name} costs NRS ${foundItem.price}.`;
        action = "price_inquiry";
        confidence = 90;
      } else {
        response = `I found ${foundItem.name} on our menu. Would you like to add it to your order?`;
        action = "menu_inquiry";
        confidence = 85;
      }
    }
    // General commands
    else if (lowerCommand.includes("menu") || lowerCommand.includes("what do you have")) {
      response = "We have appetizers, main courses, and desserts. Our specialties include Wagyu Beef Tenderloin, Lobster Ravioli, and Truffle Risotto. What interests you?";
      action = "menu_overview";
      confidence = 95;
    }
    else if (lowerCommand.includes("cart") || lowerCommand.includes("order")) {
      if (cart.length === 0) {
        response = "Your cart is empty. Would you like to see our menu?";
      } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        response = `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart for a total of NRS ${total}.`;
      }
      action = "cart_inquiry";
      confidence = 90;
    }
    else if (lowerCommand.includes("clear") || lowerCommand.includes("empty")) {
      setCart([]);
      response = "Your cart has been cleared.";
      action = "clear_cart";
      confidence = 95;
    }
    else if (lowerCommand.includes("help")) {
      response = "You can say things like 'Add Wagyu to my order', 'What's the price of lobster ravioli?', or 'Show me the menu'. How can I help you?";
      action = "help";
      confidence = 100;
    }
    else if (lowerCommand.includes("checkout") || lowerCommand.includes("pay")) {
      if (cart.length > 0) {
        response = "I'll redirect you to checkout. Please confirm your order on screen.";
        action = "checkout";
        confidence = 95;
      } else {
        response = "Your cart is empty. Please add some items first.";
        action = "checkout_empty";
        confidence = 90;
      }
    }
    else {
      response = "I didn't quite understand that. You can ask about our menu, add items to your cart, or ask for help.";
      action = "unknown";
      confidence = 30;
    }

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command: command,
      response: response,
      action: action,
      confidence: confidence,
      timestamp: new Date()
    };

    setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
    speak(response);

    toast.info("Voice Command Processed", {
      description: response,
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "add_to_cart": return <Zap className="w-4 h-4 text-green-400" />;
      case "menu_inquiry": return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "price_inquiry": return <MessageSquare className="w-4 h-4 text-yellow-400" />;
      case "help": return <Brain className="w-4 h-4 text-purple-400" />;
      default: return <MessageSquare className="w-4 h-4 text-warm-gray" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <section className="py-16 bg-gradient-to-b from-charcoal-light to-charcoal">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-gold mr-3" />
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-warm-white">
                Voice <span className="text-luxury">Ordering</span>
              </h2>
            </div>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              Order naturally using your voice. Just speak and our AI will understand your requests.
            </p>
          </div>

          {/* Voice Control Interface */}
          <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-cormorant text-gold text-center">
                Voice Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Button
                    variant={isListening ? "luxury" : "ghost-gold"}
                    size="xl"
                    onClick={isListening ? stopListening : startListening}
                    className="relative overflow-hidden w-32 h-32 rounded-full"
                  >
                    {isListening ? (
                      <MicOff className="w-12 h-12" />
                    ) : (
                      <Mic className="w-12 h-12" />
                    )}
                    {isListening && (
                      <div className="absolute inset-0 bg-gold/20 animate-pulse rounded-full"></div>
                    )}
                  </Button>
                  
                  {/* Listening Animation */}
                  {isListening && (
                    <div className="absolute inset-0 rounded-full border-4 border-gold animate-ping"></div>
                  )}
                </div>
                
                <p className="text-warm-gray mt-4">
                  {isListening ? "Listening... Speak now" : "Click to start voice ordering"}
                </p>
                
                {transcript && (
                  <div className="mt-4 p-4 bg-charcoal/50 rounded-lg border border-gold/30">
                    <p className="text-gold font-medium">You said:</p>
                    <p className="text-warm-white">"{transcript}"</p>
                  </div>
                )}
              </div>

              {/* Voice Settings */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant="ghost-gold"
                  size="sm"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="flex items-center"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  {voiceEnabled ? "Voice On" : "Voice Off"}
                </Button>
                
                {isSpeaking && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30 animate-pulse">
                    Speaking...
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Cart */}
          {cart.length > 0 && (
            <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-cormorant text-gold">Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between items-center p-3 bg-charcoal/30 rounded-lg">
                      <span className="text-warm-white">{item.name}</span>
                      <span className="text-gold font-semibold">NRS {item.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gold/20 pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-warm-white">Total:</span>
                    <span className="text-xl font-bold text-gold">
                      NRS {cart.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Command History */}
          {commands.length > 0 && (
            <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-cormorant text-gold">Recent Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commands.map((cmd) => (
                    <div key={cmd.id} className="p-4 bg-charcoal/30 rounded-lg border border-gold/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getActionIcon(cmd.action)}
                          <span className="text-warm-white font-medium">"{cmd.command}"</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${getConfidenceColor(cmd.confidence)}`}>
                            {cmd.confidence}%
                          </span>
                          <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                            {cmd.action.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-warm-gray text-sm">{cmd.response}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voice Commands Help */}
          <Card className="bg-gradient-to-r from-charcoal-light/40 to-charcoal/40 border-gold/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-cormorant text-gold text-center">
                Voice Commands You Can Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-warm-white mb-3">Ordering</h4>
                  <ul className="space-y-2 text-warm-gray text-sm">
                    <li>"Add Wagyu beef to my order"</li>
                    <li>"I want the lobster ravioli"</li>
                    <li>"Order the chocolate soufflé"</li>
                    <li>"What's in my cart?"</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-warm-white mb-3">Information</h4>
                  <ul className="space-y-2 text-warm-gray text-sm">
                    <li>"Show me the menu"</li>
                    <li>"What's the price of truffle risotto?"</li>
                    <li>"What do you recommend?"</li>
                    <li>"Help me order"</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/30">
                <p className="text-warm-gray text-sm text-center">
                  <strong className="text-gold">Pro Tip:</strong> Speak naturally! Our AI understands context and can handle variations in how you phrase your requests.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};