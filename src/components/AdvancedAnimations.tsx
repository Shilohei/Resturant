import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Zap, Sparkles, Eye } from "lucide-react";

export const AdvancedAnimations = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Particle system animation
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${45 + Math.random() * 30}, 95%, ${60 + Math.random() * 20}%)`,
        life: 1
      };
    };

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.005;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Reset particle if life is over
        if (particle.life <= 0) {
          particles[index] = createParticle();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying]);

  const magneticElements = [
    { id: 1, title: "Wagyu Steak", price: "$85", color: "from-red-500 to-orange-500" },
    { id: 2, title: "Lobster Ravioli", price: "$42", color: "from-blue-500 to-purple-500" },
    { id: 3, title: "Truffle Risotto", price: "$38", color: "from-green-500 to-teal-500" },
    { id: 4, title: "Chocolate Soufflé", price: "$16", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-charcoal to-charcoal-light relative overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-gold mr-3 animate-pulse" />
              <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white">
                Interactive <span className="text-luxury glow">Animations</span>
              </h2>
            </div>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto mb-8">
              Experience cutting-edge web animations with physics-based interactions, magnetic effects, and immersive visual storytelling.
            </p>
            
            {/* Animation Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={isPlaying ? "luxury" : "ghost-gold"}
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Animations
              </Button>
              <Button
                variant="ghost-gold"
                onClick={() => window.location.reload()}
                className="flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Magnetic Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {magneticElements.map((item, index) => {
              const distance = Math.sqrt(
                Math.pow(mousePosition.x - (index % 4) * 300 - 150, 2) +
                Math.pow(mousePosition.y - Math.floor(index / 4) * 200 - 100, 2)
              );
              const magneticStrength = Math.max(0, 100 - distance) / 100;
              const offsetX = (mousePosition.x - (index % 4) * 300 - 150) * magneticStrength * 0.3;
              const offsetY = (mousePosition.y - Math.floor(index / 4) * 200 - 100) * magneticStrength * 0.3;

              return (
                <Card
                  key={item.id}
                  className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm cursor-pointer group relative overflow-hidden"
                  style={{
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${1 + magneticStrength * 0.1})`,
                    transition: 'transform 0.1s ease-out',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  
                  {/* Floating Sparkles */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                  </div>
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center">
                      <h3 className="text-xl font-cormorant font-semibold text-gold mb-2 group-hover:text-luxury transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="text-2xl font-bold text-warm-white group-hover:scale-110 transition-transform duration-300">
                        {item.price}
                      </div>
                    </div>
                    
                    {/* Morphing Button */}
                    <Button 
                      variant="ghost-gold" 
                      size="sm" 
                      className="w-full mt-4 group-hover:bg-gold group-hover:text-charcoal transition-all duration-500 transform group-hover:scale-105"
                    >
                      Add to Order
                    </Button>
                  </CardContent>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg shadow-glow"></div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Scroll-Triggered Animations */}
          <div className="space-y-16">
            {/* Morphing Text Animation */}
            <div className="text-center">
              <div className="relative inline-block">
                <h3 className="text-4xl md:text-5xl font-cormorant font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-dark to-burgundy animate-pulse">
                  Culinary Excellence
                </h3>
                <div className="absolute inset-0 text-4xl md:text-5xl font-cormorant font-bold text-gold opacity-50 blur-sm animate-pulse delay-500">
                  Culinary Excellence
                </div>
              </div>
            </div>

            {/* Physics-Based Card Stack */}
            <div className="relative h-96 flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Card
                  key={index}
                  className="absolute w-64 h-40 bg-charcoal-light/70 border-gold/30 backdrop-blur-sm cursor-pointer hover:z-10 transition-all duration-700"
                  style={{
                    transform: `
                      translateX(${index * 20 - 40}px) 
                      translateY(${index * 10 - 20}px) 
                      rotate(${index * 5 - 10}deg)
                    `,
                    zIndex: 5 - index,
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `
                      translateX(${index * 20 - 40}px) 
                      translateY(${index * 10 - 40}px) 
                      rotate(0deg) 
                      scale(1.1)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `
                      translateX(${index * 20 - 40}px) 
                      translateY(${index * 10 - 20}px) 
                      rotate(${index * 5 - 10}deg) 
                      scale(1)
                    `;
                  }}
                >
                  <CardContent className="p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gold font-cormorant text-xl font-semibold mb-2">
                        Experience {index + 1}
                      </div>
                      <div className="text-warm-gray text-sm">
                        Hover to explore
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Liquid Loading Animation */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-64 h-8 bg-charcoal-light rounded-full border border-gold/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full relative overflow-hidden"
                    style={{
                      width: '75%',
                      animation: 'liquidFill 3s ease-in-out infinite'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="text-gold font-semibold mt-2">Loading Culinary Experience...</div>
              </div>
            </div>

            {/* Interactive Eye-Tracking Simulation */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-cormorant font-bold text-purple-300">
                    Eye-Tracking Optimization
                  </h3>
                </div>
                
                <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
                  Our layout is optimized for natural reading patterns using advanced eye-tracking research. 
                  Notice how your attention flows naturally through the content.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                    <h4 className="text-purple-300 font-semibold mb-2">F-Pattern Layout</h4>
                    <p className="text-warm-gray text-sm">Content arranged following natural eye movement patterns</p>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 animate-pulse delay-300"></div>
                    <h4 className="text-blue-300 font-semibold mb-2">Visual Hierarchy</h4>
                    <p className="text-warm-gray text-sm">Strategic placement of important elements in high-attention zones</p>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 animate-pulse delay-500"></div>
                    <h4 className="text-green-300 font-semibold mb-2">Cognitive Load</h4>
                    <p className="text-warm-gray text-sm">Reduced mental effort through intuitive design patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Showcase */}
          <div className="mt-16 bg-gradient-to-r from-charcoal-light/40 to-charcoal/40 rounded-xl p-8 border border-gold/20 backdrop-blur-lg">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-gold mr-3" />
                <h3 className="text-3xl font-cormorant font-bold text-gold">
                  Performance Optimized
                </h3>
              </div>
              <p className="text-warm-gray max-w-2xl mx-auto">
                All animations are hardware-accelerated and optimized for 60fps performance across all devices
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">60fps</div>
                <div className="text-warm-gray text-sm">Smooth Animations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">GPU</div>
                <div className="text-warm-gray text-sm">Hardware Accelerated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">WebGL</div>
                <div className="text-warm-gray text-sm">3D Graphics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">GSAP</div>
                <div className="text-warm-gray text-sm">Professional Library</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes liquidFill {
          0%, 100% { width: 20%; }
          50% { width: 85%; }
        }
      `}</style>
    </section>
  );
};