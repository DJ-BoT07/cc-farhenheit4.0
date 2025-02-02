"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => null
});

export const WarpBackground = ({
  children,
  perspective = 100,
  className,
  gridColor = "hsl(var(--border))",
  ...props
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop size

  useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      try {
        if (typeof window !== 'undefined') {
          const data = await import("/public/fire1.json");
          if (mounted) {
            setAnimationData(data.default);
          }
        }
      } catch (error) {
        console.error('Error loading animation:', error);
      }
    };

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };

    loadAnimation();
    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        mounted = false;
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Calculate responsive perspective
  const responsivePerspective = windowWidth < 640 ? 30 :
    windowWidth < 768 ? 75 :
    windowWidth < 1024 ? 100 :
    150;

  const rotationVariants = {
    animate: {
      rotate: 360,
      scale: windowWidth < 640 ? 1.2 : 1,
      transition: {
        duration: windowWidth < 640 ? 15 : 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const lottieStyle = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const renderLottieAnimation = () => {
    if (!animationData) return null;
    
    return (
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          variants={rotationVariants}
          animate="animate"
        >
          <DynamicLottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={lottieStyle}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <div className={cn("relative rounded border p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8", className)} {...props}>
      <div
        style={{
          "--perspective": `${responsivePerspective}px`,
          "--grid-color": gridColor,
          "--beam-size": windowWidth < 640 ? "4%" : "5%"
        }}
        className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d] scale-125 sm:scale-100"
      >
        {/* top side */}
        <div className="absolute [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {renderLottieAnimation()}
        </div>
        {/* bottom side */}
        <div className="absolute top-full [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {renderLottieAnimation()}
        </div>
        {/* left side */}
        <div className="absolute left-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
          {renderLottieAnimation()}
        </div>
        {/* right side */}
        <div className="absolute right-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]">
          {renderLottieAnimation()}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
