"use client";
import Image from "next/image";
import ClientWarpBackground from "./ClientWarpBackground";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="min-h-screen lg:max-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="w-full z-50 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
        <h1 className="text-white font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight relative z-20 font-sans">
          Cultural
        </h1>
        <h1 className="text-white font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight relative z-20 font-sans">
          Championship
        </h1>
      </nav>

      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-500 to-yellow-500"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgb(234, 88, 12), rgb(239, 68, 68), rgb(234, 179, 8))",
            "linear-gradient(to bottom right, rgb(234, 179, 8), rgb(234, 88, 12), rgb(239, 68, 68))",
            "linear-gradient(to bottom right, rgb(239, 68, 68), rgb(234, 179, 8), rgb(234, 88, 12))"
          ]
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{
          backgroundSize: "200% 200%",
          willChange: "background",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)"
        }}
      >
        {/* Noise overlay with reduced opacity for mobile */}
        <div className="absolute inset-0 opacity-30 xs:opacity-50 mix-blend-overlay transition-opacity duration-1000">
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              WebkitTransform: "translate3d(0,0,0)",
              transform: "translate3d(0,0,0)"
            }}
          ></div>
        </div>
      </motion.div>

      {/* Logo container with warp background */}
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-8rem)] lg:min-h-0">
        <ClientWarpBackground 
          className="border-none p-0 w-full h-full scale-125 sm:scale-100"
          gridColor="rgba(255,255,255,0.1)"
        >
          <div className="relative flex flex-col items-center justify-center mx-auto py-8 sm:py-0">
            {/* Logo Container */}
            <div className="relative w-[300px] h-[300px] xs:w-[500px] xs:h-[500px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] flex items-center justify-center">
              {/* Glowing effect behind logo */}
              <motion.div 
                className="absolute inset-0 blur-3xl bg-orange-500/30 rounded-full scale-110"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1.1, 1.15, 1.1]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  willChange: "opacity, transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              />
              
              {/* Logo */}
              <Image
                className="relative z-10 transition-all p-4 sm:p-8 scale-90 sm:scale-100"
                src="/F.png"
                alt="Logo"
                fill
                style={{ 
                  objectFit: 'contain',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                priority
              />
            </div>
          </div>
        </ClientWarpBackground>
      </div>
    </div>
  );
} 