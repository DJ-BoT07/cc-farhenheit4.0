"use client";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const WarpBackground = ({
  children,
  perspective = 100,
  className,
  gridColor = "hsl(var(--border))",
  ...props
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    import("/public/fire1.json").then((data) => {
      setAnimationData(data.default);
    });

    // Add responsive perspective calculation
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          {animationData && (
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0"
                variants={rotationVariants}
                animate="animate"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={lottieStyle}
                />
              </motion.div>
            </div>
          )}
        </div>
        {/* bottom side */}
        <div className="absolute top-full [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {animationData && (
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0"
                variants={rotationVariants}
                animate="animate"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={lottieStyle}
                />
              </motion.div>
            </div>
          )}
        </div>
        {/* left side */}
        <div className="absolute left-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
          {animationData && (
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0"
                variants={rotationVariants}
                animate="animate"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={lottieStyle}
                />
              </motion.div>
            </div>
          )}
        </div>
        {/* right side */}
        <div className="absolute right-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]">
          {animationData && (
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0"
                variants={rotationVariants}
                animate="animate"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={lottieStyle}
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
