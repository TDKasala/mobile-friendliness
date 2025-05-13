
import { useState, useEffect } from "react";
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
        
        // Show image after statistics are loaded
        setTimeout(() => {
          setShowImage(true);
        }, 300);
      }
    };
    
    animate();
  }, []);

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sa-blue leading-tight">
              The South African Job Market Reality
            </h1>
            
            <p className="text-sa-gray text-base sm:text-lg">
              In today's competitive environment, your CV needs to stand out and pass through automated systems before it ever reaches human recruiters.
            </p>
            
            <div className="pt-4 sm:pt-6 grid grid-cols-4 gap-2 sm:gap-4">
              <StatisticsAnimation 
                value={unemploymentRate} 
                suffix="%" 
                label="SA Unemployment Rate" 
                isLarge={true} 
                highlightColor="text-sa-blue"
              />
              
              <StatisticsAnimation 
                value={atsPercentage} 
                suffix="%" 
                label="SA Employers Use ATS" 
                isLarge={true}
                highlightColor="text-sa-blue"
              />
              
              <StatisticsAnimation 
                value={applicantsCount} 
                suffix="+" 
                label="Applicants Per Job" 
                isLarge={true}
                highlightColor="text-sa-blue"
              />
              
              <StatisticsAnimation 
                value={impressionTime} 
                suffix="s" 
                label="To Make First Impression" 
                isLarge={true}
                highlightColor="text-sa-blue"
              />
            </div>
          </div>
          
          {/* Right Side Image - with elegant styling */}
          <div className="flex-1 flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-sa-blue/5 to-sa-green/5 rounded-xl blur-lg transform scale-105"
                style={{ zIndex: 0 }}
              ></div>
              <img 
                src="/lovable-uploads/c15fd730-8b9d-4571-bf18-d90ff2ab622e.png" 
                alt="South African Job Seekers" 
                className={`relative z-10 w-full rounded-xl shadow-md ${
                  showImage 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95"
                }`}
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
