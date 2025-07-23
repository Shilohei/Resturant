import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Eye, Gauge, Wifi, Battery } from "lucide-react";
import { motion } from "framer-motion";

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  networkType: string;
  deviceMemory: number;
  batteryLevel?: number;
  isOnline: boolean;
}

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
  icon: React.ReactNode;
  description: string;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [webVitals, setWebVitals] = useState<WebVital[]>([
    { name: 'LCP', value: 0, rating: 'good', threshold: { good: 2500, poor: 4000 }, icon: <Eye className="h-4 w-4" />, description: "Largest Contentful Paint" },
    { name: 'FID', value: 0, rating: 'good', threshold: { good: 100, poor: 300 }, icon: <Zap className="h-4 w-4" />, description: "First Input Delay" },
    { name: 'CLS', value: 0, rating: 'good', threshold: { good: 0.1, poor: 0.25 }, icon: <Clock className="h-4 w-4" />, description: "Cumulative Layout Shift" },
  ]);

  useEffect(() => {
    // Only show performance monitor in development or for admin users
    const isDev = import.meta.env.DEV;
    const isAdmin = localStorage.getItem('admin-mode') === 'true';
    
    if (!isDev && !isAdmin) return;

    setIsVisible(true);
    collectPerformanceMetrics();
    
    // Set up performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      setupWebVitalsObserver();
    }

    // Monitor network and battery status
    monitorDeviceStatus();
  }, []);

  const collectPerformanceMetrics = () => {
    if (!('performance' in window)) return;

    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length === 0) return;
    const navigation = navigationEntries[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const ttfb = navigation.responseStart - navigation.requestStart;

    // Get network information
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const networkType = connection?.effectiveType || 'unknown';
    
    // Get device memory
    const deviceMemory = (navigator as any).deviceMemory || 0;

    setMetrics({
      lcp: 0, // Will be updated by observer
      fid: 0, // Will be updated by observer
      cls: 0, // Will be updated by observer
      fcp,
      ttfb,
      networkType,
      deviceMemory,
      isOnline: navigator.onLine
    });
  };

  const setupWebVitalsObserver = () => {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      updateWebVital('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        updateWebVital('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      updateWebVital('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  };

  const updateWebVital = (name: string, value: number) => {
    const vitalConfig = {
      LCP: {
        threshold: { good: 2500, poor: 4000 },
        icon: <Eye className="h-4 w-4" />,
        description: "Largest Contentful Paint - Loading performance"
      },
      FID: {
        threshold: { good: 100, poor: 300 },
        icon: <Zap className="h-4 w-4" />,
        description: "First Input Delay - Interactivity"
      },
      CLS: {
        threshold: { good: 0.1, poor: 0.25 },
        icon: <Gauge className="h-4 w-4" />,
        description: "Cumulative Layout Shift - Visual stability"
      }
    };

    const config = vitalConfig[name as keyof typeof vitalConfig];
    if (!config) return;

    const rating = value <= config.threshold.good ? 'good' : 
                  value <= config.threshold.poor ? 'needs-improvement' : 'poor';

    setWebVitals(prev => {
      const filtered = prev.filter(vital => vital.name !== name);
      return [...filtered, {
        name,
        value,
        rating,
        threshold: config.threshold,
        icon: config.icon,
        description: config.description
      }];
    });
  };

  const monitorDeviceStatus = () => {
    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setMetrics(prev => prev ? { ...prev, batteryLevel: battery.level * 100 } : null);
      });
    }

    // Network status
    const updateOnlineStatus = () => {
      setMetrics(prev => prev ? { ...prev, isOnline: navigator.onLine } : null);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-warm-gray';
    }
  };

  const getRatingBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'good': return 'default';
      case 'needs-improvement': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  if (!isVisible || !metrics) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-40 max-w-sm"
    >
      <Card className="bg-charcoal-light/95 backdrop-blur-md border-warm-gray/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-cream text-sm flex items-center">
            <Gauge className="h-4 w-4 mr-2 text-gold" />
            Performance Monitor
          </CardTitle>
          <CardDescription className="text-xs text-warm-gray">
            Real-time Core Web Vitals
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Core Web Vitals */}
          <div className="space-y-2">
            {webVitals.map((vital) => (
              <div key={vital.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getRatingColor(vital.rating)}>
                    {vital.icon}
                  </div>
                  <span className="text-xs text-cream">{vital.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-warm-gray">
                    {vital.name === 'CLS' ? vital.value.toFixed(3) : `${Math.round(vital.value)}ms`}
                  </span>
                  <Badge 
                    variant={getRatingBadgeVariant(vital.rating)}
                    className="text-xs px-1 py-0"
                  >
                    {vital.rating === 'needs-improvement' ? 'OK' : vital.rating.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Device & Network Info */}
          <div className="border-t border-warm-gray/20 pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Wifi className={`h-3 w-3 ${metrics.isOnline ? 'text-green-400' : 'text-red-400'}`} />
                <span className="text-warm-gray">Network</span>
              </div>
              <span className="text-cream">{metrics.networkType.toUpperCase()}</span>
            </div>
            
            {metrics.deviceMemory > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-warm-gray">Memory</span>
                <span className="text-cream">{metrics.deviceMemory}GB</span>
              </div>
            )}
            
            {metrics.batteryLevel && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Battery className="h-3 w-3 text-green-400" />
                  <span className="text-warm-gray">Battery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={metrics.batteryLevel} 
                    className="w-12 h-1"
                  />
                  <span className="text-cream">{Math.round(metrics.batteryLevel)}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="border-t border-warm-gray/20 pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-warm-gray">FCP</span>
              <span className="text-cream">{Math.round(metrics.fcp)}ms</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-warm-gray">TTFB</span>
              <span className="text-cream">{Math.round(metrics.ttfb)}ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
