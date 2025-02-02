"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 bg-orange-500/30 rounded-full animate-pulse" />
    </div>
  ),
});

const loadingTexts = [""];

export default function LoadingScreen() {
  const [animationData, setAnimationData] = useState(null);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const data = await import("/public/fire1.json");
        setAnimationData(data.default);
      } catch (error) {
        console.error('Error loading animation:', error);
      }
    };

    loadAnimation();

    // Animate loading text
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
      >
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          {/* Glowing effect */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0.8 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
            className="absolute inset-0 blur-3xl bg-orange-500/30 rounded-full"
          />
          
          {/* Fire animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 10
                }}
              />
            )}
          </motion.div>
          
          {/* Loading text */}
          <motion.div
            key={loadingTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white text-lg sm:text-xl font-medium tracking-wider"
          >
            {loadingTexts[loadingTextIndex]}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 