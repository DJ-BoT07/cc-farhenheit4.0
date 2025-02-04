"use client";
import { useEffect, useState } from "react";

export default function PointsTable() {
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
              Department: "Instrumentation & Control",
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

  return (
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
  );
} 
