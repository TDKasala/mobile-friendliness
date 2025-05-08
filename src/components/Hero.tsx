
import { useState, useEffect, lazy, Suspense } from "react";
import { useDeviceType, useConnectionSpeed } from "@/hooks/use-mobile";
import StatisticsAnimation from "./StatisticsAnimation";

const Hero = () => {
  const [unemploymentRate, setUnemploymentRate] = useState(0);
  const [atsPercentage, setAtsPercentage] = useState(0);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [impressionTime, setImpressionTime] = useState(0);
  const [showImage, setShowImage] = useState(false);
  
  const deviceType = useDeviceType();
  const connectionSpeed = useConnectionSpeed();

  useEffect(() => {
    // Animate all statistics
    const duration = 1500;
    const startTime = Date.now();
    const targetUnemploymentRate = 33.5;
    const targetAtsPercentage = 75;
    const targetApplicantsCount = 200;
    const targetImpressionTime = 8;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setUnemploymentRate(parseFloat((progress * targetUnemploymentRate).toFixed(1)));
        setAtsPercentage(Math.round(progress * targetAtsPercentage));
        setApplicantsCount(Math.round(progress * targetApplicantsCount));
        setImpressionTime(Math.round(progress * targetImpressionTime));
        requestAnimationFrame(animate);
      } else {
        setUnemploymentRate(targetUnemploymentRate);
        setAtsPercentage(targetAtsPercentage);
        setApplicantsCount(targetApplicantsCount);
        setImpressionTime(targetImpressionTime);
        
        // Show image with animation after statistics are loaded
        setTimeout(() => {
          setShowImage(true);
        }, 300);
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
            
            <div className="pt-4 sm:pt-6 grid grid-cols-4 gap-2 sm:gap-4">
              <StatisticsAnimation 
                value={unemploymentRate} 
                suffix="%" 
                label="SA Unemployment Rate" 
                isLarge={true} 
                highlightColor="text-sa-blue dark:text-sa-yellow"
              />
              
              <StatisticsAnimation 
                value={atsPercentage} 
                suffix="%" 
                label="SA Employers Use ATS" 
                isLarge={true}
                highlightColor="text-sa-blue dark:text-sa-yellow"
              />
              
              <StatisticsAnimation 
                value={applicantsCount} 
                suffix="+" 
                label="Applicants Per Job" 
                isLarge={true}
                highlightColor="text-sa-blue dark:text-sa-yellow"
              />
              
              <StatisticsAnimation 
                value={impressionTime} 
                suffix="s" 
                label="To Make First Impression" 
                isLarge={true}
                highlightColor="text-sa-blue dark:text-sa-yellow"
              />
            </div>
          </div>
          
          {/* Right Side Image - with animation */}
          <div className="flex-1 flex justify-center mt-6 lg:mt-0">
            <img 
              src="/lovable-uploads/7f58eda8-ee43-4ba3-b45f-d83c28f7db6b.png" 
              alt="ATSBoost Logo" 
              className={`w-full max-w-md transition-all duration-700 ease-in-out ${
                showImage 
                  ? "opacity-100 scale-100 animate-pulse" 
                  : "opacity-0 scale-95"
              }`}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('scale-105');
                e.currentTarget.classList.remove('animate-pulse');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('scale-105');
                e.currentTarget.classList.add('animate-pulse');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
