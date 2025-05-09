
import { lazy, Suspense } from "react";
import StatisticsAnimation from "@/components/StatisticsAnimation";

// Lazy load components
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const MetricsSection = () => {
  return (
    <section className="py-10 bg-sa-blue/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-2 gap-6 md:gap-10">
            <StatisticsAnimation 
              value={20000} 
              suffix="+" 
              label="CV Analyses" 
              isLarge={true}
              delay={400}
            />
            <StatisticsAnimation 
              value={85} 
              suffix="%" 
              label="Success Rate" 
              isLarge={true}
              delay={800}
            />
            <StatisticsAnimation 
              value={5000} 
              suffix="+" 
              label="Users" 
              isLarge={true}
              delay={1200}
            />
            <StatisticsAnimation 
              value="R30" 
              label="Starting Price" 
              isLarge={true}
              delay={1600}
            />
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <img 
                src="/lovable-uploads/21346634-801b-4045-9332-df9a4713cf5b.png" 
                alt="ATSBoost Success" 
                className="w-full h-auto rounded-lg shadow-lg" 
              />
              <div className="absolute -top-4 -right-4 bg-sa-green text-white rounded-full p-3 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
