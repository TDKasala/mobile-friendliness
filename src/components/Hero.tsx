
import { useState, useEffect } from "react";
import { useDeviceType, useConnectionSpeed } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import StatisticsAnimation from "./StatisticsAnimation";

const Hero = () => {
  const [unemploymentRate, setUnemploymentRate] = useState(0);
  const [atsPercentage, setAtsPercentage] = useState(0);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [impressionTime, setImpressionTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const deviceType = useDeviceType();
  const connectionSpeed = useConnectionSpeed();

  useEffect(() => {
    // Show stats after a brief delay
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 500);

    // Animate statistics
    const duration = 2000;
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
      }
    };

    const animationTimer = setTimeout(() => {
      animate();
    }, 800);

    return () => {
      clearTimeout(statsTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const scrollToAnalyze = () => {
    document.getElementById("analyze-cv")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 pt-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sa-blue/10 to-sa-green/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-sa-green/10 to-sa-blue/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-sa-yellow/5 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-sa-green/10 text-sa-green px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Boost Your Career Success</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-sa-blue via-sa-blue to-sa-green bg-clip-text text-transparent">
                  Beat the ATS
                </span>
                <br />
                <span className="text-gray-800 dark:text-white">
                  Land Your Dream Job
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Transform your CV with AI-powered optimization designed for South African job market. 
                <span className="font-semibold text-sa-blue"> Get past ATS systems</span> and into recruiters' hands.
              </p>
            </div>

            {/* Key benefits */}
            <div className="space-y-3">
              {[
                "Free ATS compatibility check",
                "Industry-specific optimization",
                "Instant feedback & improvements"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sa-green flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToAnalyze}
                size="lg"
                className="bg-gradient-to-r from-sa-blue to-sa-green hover:from-sa-blue/90 hover:to-sa-green/90 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Analyze My CV Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-sa-blue text-sa-blue hover:bg-sa-blue hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Side - Statistics */}
          <div className="flex-1 w-full max-w-2xl">
            <div className={`transition-all duration-1000 ${showStats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="bg-white/80 dark:bg-sa-blue/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                  South African Job Market Reality
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center space-y-2 p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-red-600 mx-auto" />
                    <StatisticsAnimation 
                      value={unemploymentRate} 
                      suffix="%" 
                      label="SA Unemployment" 
                      isLarge={true} 
                      highlightColor="text-red-600" 
                    />
                  </div>
                  
                  <div className="text-center space-y-2 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                    <Users className="h-8 w-8 text-sa-blue mx-auto" />
                    <StatisticsAnimation 
                      value={atsPercentage} 
                      suffix="%" 
                      label="Employers Use ATS" 
                      isLarge={true} 
                      highlightColor="text-sa-blue" 
                    />
                  </div>
                  
                  <div className="text-center space-y-2 p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
                    <Users className="h-8 w-8 text-orange-600 mx-auto" />
                    <StatisticsAnimation 
                      value={applicantsCount} 
                      suffix="+" 
                      label="Applicants Per Job" 
                      isLarge={true} 
                      highlightColor="text-orange-600" 
                    />
                  </div>
                  
                  <div className="text-center space-y-2 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                    <Clock className="h-8 w-8 text-sa-green mx-auto" />
                    <StatisticsAnimation 
                      value={impressionTime} 
                      suffix="s" 
                      label="First Impression" 
                      isLarge={true} 
                      highlightColor="text-sa-green" 
                    />
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
