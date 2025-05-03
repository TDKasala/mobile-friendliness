
import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SubscriptionTier } from "@/lib/types";
import { useConnectionSpeed } from "@/hooks/use-mobile";

// Lazy load components
const Features = lazy(() => import("@/components/Features"));
const CVUpload = lazy(() => import("@/components/CVUpload"));
const Footer = lazy(() => import("@/components/Footer"));
const SubscriptionStatus = lazy(() => import("@/components/SubscriptionStatus"));

// Simple loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const Index = () => {
  const connectionSpeed = useConnectionSpeed();
  
  // This will simulate a "banner announcement" that appears after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const bannerElement = document.getElementById("announcement-banner");
      if (bannerElement) {
        bannerElement.classList.remove("hidden");
        bannerElement.classList.add("flex");
      }
    }, connectionSpeed === 'slow' ? 3500 : 2000); // Delay longer on slow connections

    return () => clearTimeout(timer);
  }, [connectionSpeed]);

  // Simulated user subscription data - in a real app, this would come from Supabase
  const [subscription, setSubscription] = useState<{
    tier: SubscriptionTier;
    expiryDate?: string;
  }>({
    tier: "free"
    // If premium: expiryDate: "2025-06-01"
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Announcement - make touch friendly */}
      <div 
        id="announcement-banner"
        className="hidden items-center justify-center bg-sa-green text-white py-2 px-3 sm:px-4 text-xs sm:text-sm transition-all"
      >
        <span className="text-center">🎉 Launch Discount: 50% off Premium for the first 500 users!</span>
        <button 
          className="ml-3 sm:ml-4 text-xs bg-white text-sa-green px-2 py-1 rounded-full hover:bg-opacity-90 transition touch-manipulation"
          onClick={() => {
            const banner = document.getElementById("announcement-banner");
            if (banner) banner.classList.add("hidden");
          }}
          aria-label="Dismiss announcement"
        >
          Dismiss
        </button>
      </div>

      <Header />
      <Hero />
      
      {/* Subscription Status */}
      <section className="py-4 sm:py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<LoadingComponent />}>
              <SubscriptionStatus 
                tier={subscription.tier}
                expiryDate={subscription.expiryDate}
              />
            </Suspense>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<LoadingComponent />}>
        <CVUpload />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <Features />
      </Suspense>
      
      {/* Blog Showcase Section - mobile optimized */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-2 sm:mb-4">Latest CV Tips & Insights</h2>
            <p className="text-sa-gray max-w-2xl mx-auto text-sm sm:text-base">
              Expert advice to help you navigate the South African job market and optimize your CV for success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-6 sm:mb-10">
            {/* Only show 1 article on mobile with slow connection, otherwise 3 */}
            {[1, 2, 3].slice(0, connectionSpeed === 'slow' ? 1 : 3).map((id) => {
              const article = id <= 5 ? {
                id: id,
                title: ["Top 10 CV Tips for the South African Job Market", "How to Beat the ATS: A Guide for South African Job Seekers", "Critical Keywords for South African CVs by Industry"][id - 1],
                excerpt: ["Stand out in South Africa's competitive job market with these essential CV tips tailored for local expectations and ATS requirements.", "Learn how Applicant Tracking Systems work in the South African context and how to optimize your CV to get past the first digital hurdle.", "Industry-specific keywords that will help your CV pass ATS screening and catch recruiters' attention in the South African job market."][id - 1],
                publishDate: ["2025-04-15", "2025-04-10", "2025-04-05"][id - 1],
                readTime: [8, 10, 12][id - 1],
                slug: ["top-10-cv-tips-south-african-job-market", "how-to-beat-the-ats-for-south-african-job-seekers", "critical-keywords-for-south-african-cvs-by-industry"][id - 1]
              } : null;
              
              return article ? (
                <Link to={`/blog/${article.slug}`} key={article.id} className="touch-manipulation">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-sa-blue hover:text-sa-green transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sa-gray text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-sa-gray">
                        <span>{article.publishDate}</span>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null;
            })}
          </div>
          
          <div className="text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sa-blue hover:text-sa-green font-medium transition touch-manipulation text-sm sm:text-base"
            >
              View all articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<LoadingComponent />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
