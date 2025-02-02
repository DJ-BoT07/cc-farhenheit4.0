"use client";
import Image from "next/image";
import { WarpBackground } from "@/components/ui/warp-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [pointsData, setPointsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        console.log('Fetching points data...');
        
        const response = await fetch('/api/getPoints');
        const result = await response.json();
        
        console.log('API Response:', result);

        if (result.error) {
          throw new Error(result.error);
        }

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Invalid data format received');
        }

        // Initialize with sample data if no data exists
        if (result.data.length === 0) {
          const sampleData = [
            { 
              Ranking: 1,
              Department: "Artificial Intelligence & Data Science",
              "First Places": 4,
              "Second Places": 2,
              "Total Wins": 2,
              Points: 50
            },
            {
              Ranking: 2,
              Department: "Infrumentation & Control",
              "First Places": 4,
              "Second Places": 4,
              "Total Wins": 1,
              Points: 15
            },
            {
              Ranking: 3,
              Department: "Computer Science",
              "First Places": 3,
              "Second Places": 4,
              "Total Wins": 3,
              Points: 10
            }
          ];
          
          // Post sample data to the API
          await Promise.all(sampleData.map(async (item) => {
            await fetch('/api/updatePoints', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            });
          }));

          setPointsData(sampleData);
        } else {
          setPointsData(result.data);
        }
      } catch (err) {
        console.error('Error fetching points:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  // Debug output
  console.log('Current state:', { loading, error, pointsData });

  return (
    <>
      {/* First Screen - Logo and Title */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-500 to-yellow-500 animate-gradient-xy">
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-50 mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>

        {/* Logo container with warp background */}
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-8rem)] lg:min-h-0">
          <WarpBackground 
            className="border-none p-0 w-full h-full scale-125 sm:scale-100"
            gridColor="rgba(255,255,255,0.1)"
          >
            <div className="relative flex flex-col items-center justify-center mx-auto py-8 sm:py-0">
              {/* Logo Container */}
              <div className="relative w-[300px] h-[300px] xs:w-[500px] xs:h-[500px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] flex items-center justify-center">
                {/* Glowing effect behind logo */}
                <div className="absolute inset-0 blur-3xl bg-orange-500/30 animate-pulse rounded-full scale-110"></div>
                
                {/* Logo */}
                <Image
                  className="relative z-10 transition-all p-4 sm:p-8 scale-90 sm:scale-100"
                  src="/F.png"
                  alt="Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </WarpBackground>
        </div>
      </div>

      {/* Second Screen - Points Table */}
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1),transparent_50%)]"></div>
        
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-8 sm:mb-16">
            Points Table
          </h2>

          {/* Table Container with horizontal scroll for small screens */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 shadow-2xl shadow-orange-500/10 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 p-4 sm:p-6 border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl">Ranking</div>
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl col-span-2">Department</div>
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl text-center">1st</div>
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl text-center">2nd</div>
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl text-center">Total Wins</div>
                <div className="text-orange-400 font-bold text-sm sm:text-lg md:text-xl text-center">Total Points</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-orange-500/10">
                {loading ? (
                  // Loading skeleton
                  [...Array(10)].map((_, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-7 gap-2 sm:gap-4 p-4 sm:p-6 animate-pulse"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700"></div>
                      </div>
                      <div className="col-span-2 h-4 sm:h-6 bg-gray-700 rounded"></div>
                      <div className="h-4 sm:h-6 bg-gray-700 rounded"></div>
                      <div className="h-4 sm:h-6 bg-gray-700 rounded"></div>
                      <div className="h-4 sm:h-6 bg-gray-700 rounded"></div>
                      <div className="h-4 sm:h-6 bg-gray-700 rounded"></div>
                    </div>
                  ))
                ) : error ? (
                  <div className="p-4 sm:p-6 text-center text-red-500">
                    Error loading points data: {error}
                  </div>
                ) : (
                  pointsData.map((item, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-7 gap-2 sm:gap-4 p-4 sm:p-6 hover:bg-orange-500/5 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-sm sm:text-base ${
                          item.Ranking === 1 ? 'bg-yellow-500' :
                          item.Ranking === 2 ? 'bg-gray-300' :
                          item.Ranking === 3 ? 'bg-orange-600' :
                          'bg-gray-700'
                        } text-black font-bold`}>
                          {item.Ranking}
                        </span>
                      </div>
                      <div className="text-white font-medium col-span-2 text-sm sm:text-base truncate">{item.Department}</div>
                      <div className="text-white font-medium text-center text-sm sm:text-base">{item["First Places"]}</div>
                      <div className="text-white font-medium text-center text-sm sm:text-base">{item["Second Places"]}</div>
                      <div className="text-white font-medium text-center text-sm sm:text-base">{item["Total Wins"]}</div>
                      <div className="text-white font-medium text-center text-sm sm:text-base">{item.Points}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}