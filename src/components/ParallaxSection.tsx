import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  speed?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, backgroundImage, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y 
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
