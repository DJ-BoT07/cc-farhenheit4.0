"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

// Dynamically import components with loading states
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  loading: () => <LoadingScreen />,
  ssr: false
});

const ClientWrapper = dynamic(() => import("./components/ClientWrapper"), {
  loading: () => null,
  ssr: false
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the logo image
    const preloadImage = new Image();
    preloadImage.src = "/F.png";
    
    // Start loading timer after image is loaded
    preloadImage.onload = () => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      return () => clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Suspense fallback={<LoadingScreen />}>
          <HeroSection />
          <ClientWrapper />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}