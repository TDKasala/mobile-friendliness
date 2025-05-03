
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [unemploymentRate, setUnemploymentRate] = useState(0);

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
    <div className="bg-white dark:bg-sa-blue py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-sa-yellow/20 dark:bg-sa-yellow/30 px-4 py-1 rounded-full">
              <p className="text-sa-blue dark:text-white text-sm font-medium">
                Unlock your dream job in Mzansi!
              </p>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sa-blue dark:text-white leading-tight">
              Boost Your CV's Success Rate with AI-Powered <span className="text-sa-green">ATS Technology</span>
            </h1>
            
            <p className="text-sa-gray dark:text-gray-300 text-lg">
              Get your CV past applicant tracking systems and into the hands of recruiters. 
              Perfect for South African job seekers across all industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90">
                Analyze My CV <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10">
                Take Job Fit Quiz
              </Button>
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  {unemploymentRate}%
                </span>
                <span className="text-sm text-sa-gray dark:text-gray-300">
                  SA Unemployment Rate
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  75%
                </span>
                <span className="text-sm text-sa-gray dark:text-gray-300">
                  CVs Rejected by ATS
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
                  89%
                </span>
                <span className="text-sm text-sa-gray dark:text-gray-300">
                  User Success Rate
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Side Image/Illustration */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gradient-to-br from-sa-blue/10 to-sa-green/10 dark:from-sa-blue/30 dark:to-sa-green/30 rounded-2xl p-6 w-full max-w-md">
              <div className="bg-white dark:bg-sa-blue/80 rounded-xl shadow-lg p-5">
                <div className="mb-4">
                  <div className="h-6 bg-sa-green/20 dark:bg-sa-green/40 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-1/2"></div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded"></div>
                  <div className="h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded"></div>
                  <div className="h-3 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-3/4"></div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-sa-yellow/30 dark:bg-sa-yellow/50"></div>
                  <div>
                    <div className="h-3 bg-sa-blue/20 dark:bg-sa-blue/40 rounded w-24"></div>
                    <div className="h-2 bg-sa-gray/20 dark:bg-sa-gray/40 rounded w-16 mt-1"></div>
                  </div>
                </div>
                
                <div className="h-28 bg-sa-blue/10 dark:bg-sa-blue/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-sa-green dark:text-sa-yellow mb-2">86</div>
                    <div className="text-sm text-sa-gray dark:text-gray-300">ATS Score</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="h-8 bg-sa-green dark:bg-sa-green rounded-md flex items-center justify-center">
                    <div className="h-3 bg-white rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
