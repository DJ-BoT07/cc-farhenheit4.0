"use client";
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-black/80 backdrop-blur-xl border-t border-orange-500/30 mt-auto"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] xs:text-xs sm:text-sm text-white">
        <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 text-center xs:text-left">
          <span className="whitespace-nowrap font-medium">© {new Date().getFullYear()} All Rights Reserved</span>
          <span className="hidden xs:inline text-orange-500/70">|</span>
          <motion.span
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
            className="text-orange-400 font-bold whitespace-nowrap"
          >
            Digvijay Mangaonkar
          </motion.span>
          <span className="hidden xs:inline text-orange-500/70">×</span>
          <motion.span
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              delay: 1
            }}
            className="text-orange-400 font-bold whitespace-nowrap"
          >
            Fahrenheit DYPCOE4.0
          </motion.span>
        </div>
        <a
          href="http://github.com/Dj-BoT07/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-orange-300 hover:text-orange-400 transition-colors mt-1 xs:mt-0 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="opacity-90"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="hover:underline whitespace-nowrap">@DJ-BoT07</span>
        </a>
      </div>
    </motion.footer>
  );
} 