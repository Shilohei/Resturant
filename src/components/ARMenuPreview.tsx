import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Smartphone, RotateCcw, ZoomIn, ZoomOut, Move3D, Sparkles } from "lucide-react";

interface ARMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  model3D: string;
  category: string;
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const ARMenuPreview = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ARMenuItem | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const arMenuItems: ARMenuItem[] = [
    {
      id: "ar-1",
      name: "Wagyu Beef Tenderloin",
      description: "Premium A5 Wagyu with truffle butter and seasonal vegetables",
      price: 85,
      model3D: "/models/wagyu-steak.glb",
      category: "mains",
      nutritionInfo: { calories: 650, protein: 45, carbs: 12, fat: 48 }
    },
    {
      id: "ar-2",
      name: "Lobster Ravioli",
      description: "House-made pasta filled with Maine lobster in saffron cream",
      price: 42,
      model3D: "/models/lobster-ravioli.glb",
      category: "mains",
      nutritionInfo: { calories: 520, protein: 28, carbs: 45, fat: 22 }
    },
    {
      id: "ar-3",
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla bean ice cream",
      price: 16,
      model3D: "/models/chocolate-souffle.glb",
      category: "desserts",
      nutritionInfo: { calories: 420, protein: 8, carbs: 52, fat: 18 }
    }
  ];

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraPermission('granted');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsARActive(true);
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission('denied');
    }
  };

  // Stop AR session
  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
    setSelectedItem(null);
  };

  // Simulate 3D model rendering
  useEffect(() => {
    if (isARActive && selectedItem && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simulate 3D model with a rotating rectangle (placeholder)
        ctx.save();
        ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
        ctx.rotate(rotation.y * Math.PI / 180);
        ctx.scale(scale, scale);
        
        // Draw a placeholder 3D-looking shape
        const gradient = ctx.createLinearGradient(-50, -30, 50, 30);
        gradient.addColorStop(0, '#D4AF37');
        gradient.addColorStop(0.5, '#FFD700');
        gradient.addColorStop(1, '#B8860B');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-50, -30, 100, 60);
        
        // Add some depth effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(-45, -25, 100, 60);
        
        ctx.restore();
        
        // Add floating info panel
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(10, 10, 200, 100);
        
        ctx.fillStyle = '#D4AF37';
        ctx.font = '16px Arial';
        ctx.fillText(selectedItem.name, 20, 30);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.fillText(`$${selectedItem.price}`, 20, 50);
        ctx.fillText(`${selectedItem.nutritionInfo.calories} cal`, 20, 70);
        ctx.fillText(`Protein: ${selectedItem.nutritionInfo.protein}g`, 20, 90);
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }
  }, [isARActive, selectedItem, rotation, scale, position]);

  const handleItemSelect = (item: ARMenuItem) => {
    setSelectedItem(item);
    if (!isARActive) {
      requestCameraPermission();
    }
  };

  const resetModel = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setScale(1);
    setPosition({ x: 0, y: 0, z: 0 });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-charcoal to-charcoal-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-gold mr-3" />
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-warm-white">
                AR Menu <span className="text-luxury">Preview</span>
              </h2>
            </div>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              See your dishes in 3D before you order. Place virtual food on your table using augmented reality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Menu Items */}
            <div className="space-y-6">
              <h3 className="text-2xl font-cormorant font-bold text-gold mb-6">
                AR-Enabled Dishes
              </h3>
              
              {arMenuItems.map((item) => (
                <Card 
                  key={item.id}
                  className={`bg-charcoal-light/50 border-gold/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-luxury ${
                    selectedItem?.id === item.id ? 'border-gold ring-2 ring-gold/30' : ''
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-cormorant font-semibold text-gold">
                        {item.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                          <Move3D className="w-3 h-3 mr-1" />
                          3D
                        </Badge>
                        <span className="text-2xl font-cormorant font-bold text-gold">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-warm-gray text-sm mb-4">
                      {item.description}
                    </p>
                    
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="bg-charcoal/30 rounded-lg p-2">
                        <div className="text-gold font-semibold text-sm">
                          {item.nutritionInfo.calories}
                        </div>
                        <div className="text-warm-gray text-xs">cal</div>
                      </div>
                      <div className="bg-charcoal/30 rounded-lg p-2">
                        <div className="text-gold font-semibold text-sm">
                          {item.nutritionInfo.protein}g
                        </div>
                        <div className="text-warm-gray text-xs">protein</div>
                      </div>
                      <div className="bg-charcoal/30 rounded-lg p-2">
                        <div className="text-gold font-semibold text-sm">
                          {item.nutritionInfo.carbs}g
                        </div>
                        <div className="text-warm-gray text-xs">carbs</div>
                      </div>
                      <div className="bg-charcoal/30 rounded-lg p-2">
                        <div className="text-gold font-semibold text-sm">
                          {item.nutritionInfo.fat}g
                        </div>
                        <div className="text-warm-gray text-xs">fat</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AR Viewer */}
            <div className="space-y-6">
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    AR Viewer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square bg-charcoal/50 rounded-lg overflow-hidden border border-gold/30">
                    {!isARActive ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Camera className="w-16 h-16 text-gold mb-4 animate-pulse" />
                        <p className="text-warm-gray text-center mb-4">
                          Select a dish to start AR preview
                        </p>
                        {cameraPermission === 'denied' && (
                          <p className="text-red-400 text-sm text-center">
                            Camera access denied. Please enable camera permissions.
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          playsInline
                          muted
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute inset-0 w-full h-full"
                          width={400}
                          height={400}
                        />
                        
                        {/* AR Controls Overlay */}
                        <div className="absolute top-4 right-4 space-y-2">
                          <Button
                            variant="ghost-gold"
                            size="sm"
                            onClick={resetModel}
                            className="bg-charcoal/80 backdrop-blur-sm"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Info Overlay */}
                        {selectedItem && (
                          <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 backdrop-blur-sm rounded-lg p-4 border border-gold/30">
                            <h4 className="text-gold font-semibold mb-1">
                              {selectedItem.name}
                            </h4>
                            <p className="text-warm-gray text-sm">
                              Tap and drag to rotate • Pinch to scale
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* AR Controls */}
                  {isARActive && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="ghost-gold"
                          size="sm"
                          onClick={() => setRotation(prev => ({ ...prev, y: prev.y - 15 }))}
                        >
                          ← Rotate
                        </Button>
                        <Button
                          variant="ghost-gold"
                          size="sm"
                          onClick={resetModel}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost-gold"
                          size="sm"
                          onClick={() => setRotation(prev => ({ ...prev, y: prev.y + 15 }))}
                        >
                          Rotate →
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="ghost-gold"
                          size="sm"
                          onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                        >
                          <ZoomOut className="w-4 h-4 mr-1" />
                          Smaller
                        </Button>
                        <Button
                          variant="ghost-gold"
                          size="sm"
                          onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
                        >
                          <ZoomIn className="w-4 h-4 mr-1" />
                          Larger
                        </Button>
                      </div>
                      
                      <Button
                        variant="luxury"
                        className="w-full"
                        onClick={stopAR}
                      >
                        Stop AR Preview
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AR Features */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
                    <h4 className="text-lg font-cormorant font-semibold text-purple-300">
                      AR Features
                    </h4>
                  </div>
                  
                  <ul className="space-y-2 text-warm-gray text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Realistic 3D food models with accurate proportions
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Interactive rotation and scaling controls
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Real-time nutritional information overlay
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Surface detection for realistic placement
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Browser Compatibility Notice */}
          <div className="mt-12 bg-charcoal-light/30 rounded-lg p-6 border border-gold/20">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gold mb-3">
                AR Compatibility
              </h4>
              <p className="text-warm-gray text-sm mb-4">
                AR Menu Preview works best on mobile devices with camera access. 
                For the full experience, use Chrome or Safari on iOS/Android.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  iOS Safari
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  Chrome Mobile
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                  Desktop (Limited)
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};