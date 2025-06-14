
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award,
  Sparkles,
  ChevronRight,
  Star
} from "lucide-react";

const Hero = () => {
  const { user } = useAuth();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAnalyzeCv = () => {
    document.getElementById("analyze-cv")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const stats = [
    { number: "15,000+", label: "CVs Optimized", icon: CheckCircle },
    { number: "89%", label: "Success Rate", icon: TrendingUp },
    { number: "2,500+", label: "Happy Users", icon: Users },
    { number: "4.8/5", label: "User Rating", icon: Star }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 dark:from-sa-blue dark:via-sa-blue/90 dark:to-sa-blue/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-sa-blue/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-sa-green/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-sa-yellow/20 rounded-full blur-lg animate-bounce"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sa-blue/10 to-sa-green/10 text-sa-blue px-6 py-3 rounded-full text-sm font-medium mb-8 border border-sa-blue/20">
            <Award className="h-4 w-4" />
            <span>South Africa's #1 CV Optimization Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-sa-blue via-sa-green to-sa-blue bg-clip-text text-transparent animate-gradient">
              Hire
            </span>
            <span className="text-sa-green">Mzansi</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-200 font-medium">
              Your Gateway to Success
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your CV into an ATS-optimized masterpiece designed for the South African job market. 
            Get hired faster with AI-powered insights and personalized recommendations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToAnalyzeCv}
              className="bg-gradient-to-r from-sa-blue to-sa-green hover:from-sa-blue/90 hover:to-sa-green/90 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Optimize My CV Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {!user && (
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-2 border-sa-blue/30 text-sa-blue hover:bg-sa-blue/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Link to="/signup">
                  Start Free Account
                </Link>
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  statsVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/80 dark:bg-sa-blue/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                  <stat.icon className="h-8 w-8 text-sa-green mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
