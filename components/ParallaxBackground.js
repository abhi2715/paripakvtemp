'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground({ targetRef, opacity = 0.03, image = '/images/background.jpeg' }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: `url('${image}')`, 
        backgroundSize: 'cover', backgroundPosition: 'center', opacity,
        y, zIndex: 0, pointerEvents: 'none'
      }} 
    />
  );
}
