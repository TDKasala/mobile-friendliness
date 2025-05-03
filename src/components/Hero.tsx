
import { useState, useEffect, lazy, Suspense } from "react";
import { useDeviceType, useConnectionSpeed } from "@/hooks/use-mobile";

// Lazy load the statistics animation component
const StatisticsAnimation = lazy(() => import("./StatisticsAnimation"));

const Hero = () => {
  const [unemploymentRate, setUnemploymentRate] = useState(0);
  const deviceType = useDeviceType();
  const connectionSpeed = useConnectionSpeed();

  useEffect(() => {
    // Animate unemployment rate from 0 to 33.5
    const duration = 1500;
    const startTime = Date.now();
    const targetRate = 33.5;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const currentRate = progress * targetRate;
        setUnemploymentRate(parseFloat(currentRate.toFixed(1)));
        requestAnimationFrame(animate);
      } else {
        setUnemploymentRate(targetRate);
      }
    };
    
    animate();
  }, []);

  return (
    <div className="bg-white dark:bg-sa-blue py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="inline-block bg-sa-yellow/20 dark:bg-sa-yellow/30 px-3 sm:px-4 py-1 rounded-full">
              <p className="text-sa-blue dark:text-white text-xs sm:text-sm font-medium">
                Unlock your dream job in Mzansi!
              </p>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sa-blue dark:text-white leading-tight">
              The South African Job Market Reality
            </h1>
            
            <p className="text-sa-gray dark:text-gray-300 text-base sm:text-lg">
              In today's competitive environment, your CV needs to stand out and pass through automated systems before it ever reaches human recruiters.
            </p>
            
            {/* Buttons removed as requested */}
            
            <div className="pt-4 sm:pt-6 grid grid-cols-4 gap-2 sm:gap-4">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  {unemploymentRate}%
                </span>
                <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
                  SA Unemployment Rate
                </span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  75%
                </span>
                <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
                  Use ATS Systems SA Employers
                </span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  200+
                </span>
                <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
                  Applicants Per Job
                </span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  8s
                </span>
                <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
                  To Make First Impression
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Side Image - Using the resume analysis image you provided */}
          <div className="flex-1 flex justify-center mt-6 lg:mt-0">
            <img 
              src="/lovable-uploads/757b6da4-4f8d-4c0a-aee5-ab49b4550c78.png" 
              alt="Resume Analysis" 
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
