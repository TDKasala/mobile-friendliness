
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
              Boost Your CV's Success Rate with AI-Powered <span className="text-sa-green">ATS Technology</span>
            </h1>
            
            <p className="text-sa-gray dark:text-gray-300 text-base sm:text-lg">
              Get your CV past applicant tracking systems and into the hands of recruiters. 
              Perfect for South African job seekers across all industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90 w-full sm:w-auto text-sm sm:text-base touch-manipulation">
                Analyze My CV <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10 w-full sm:w-auto text-sm sm:text-base touch-manipulation">
                Take Job Fit Quiz
              </Button>
            </div>
            
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4">
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
                  CVs Rejected by ATS
                </span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  89%
                </span>
                <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
                  User Success Rate
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Side Image/Illustration - Conditionally rendered based on device type */}
          <div className="flex-1 flex justify-center mt-6 lg:mt-0">
            {/* Only show simplified version on mobile with slow connection */}
            {deviceType === 'mobile' && connectionSpeed === 'slow' ? (
              <div className="bg-gradient-to-br from-sa-blue/5 to-sa-green/5 dark:from-sa-blue/20 dark:to-sa-green/20 rounded-xl p-4 sm:p-5 w-full max-w-md">
                <div className="bg-white dark:bg-sa-blue/60 rounded-lg shadow p-4">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-sa-green dark:text-sa-yellow mb-1">86</div>
                    <div className="text-sm text-sa-gray dark:text-gray-300">ATS Score</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-sa-blue/10 to-sa-green/10 dark:from-sa-blue/30 dark:to-sa-green/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md">
                <div className="bg-white dark:bg-sa-blue/80 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5">
                  <div className="mb-3 sm:mb-4">
                    <div className="h-5 sm:h-6 bg-sa-green/20 dark:bg-sa-green/40 rounded w-3/4 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-1/2"></div>
                  </div>
                  
                  {/* Don't render these elements on mobile+slow connection */}
                  {!(deviceType === 'mobile' && connectionSpeed === 'slow') && (
                    <>
                      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        <div className="h-2 sm:h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded"></div>
                        <div className="h-2 sm:h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded"></div>
                        <div className="h-2 sm:h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-3/4"></div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-sa-yellow/30 dark:bg-sa-yellow/50"></div>
                        <div>
                          <div className="h-2 sm:h-3 bg-sa-blue/20 dark:bg-sa-blue/40 rounded w-20 sm:w-24"></div>
                          <div className="h-1.5 sm:h-2 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-12 sm:w-16 mt-1"></div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="h-20 sm:h-28 bg-sa-blue/10 dark:bg-sa-blue/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-sa-green dark:text-sa-yellow mb-1 sm:mb-2">86</div>
                      <div className="text-xs sm:text-sm text-sa-gray dark:text-gray-300">ATS Score</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4">
                    <div className="h-6 sm:h-8 bg-sa-green dark:bg-sa-green rounded-md flex items-center justify-center">
                      <div className="h-2 sm:h-3 bg-white rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
