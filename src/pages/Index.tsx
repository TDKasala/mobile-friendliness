
import { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SubscriptionTier } from "@/lib/types";
import { useConnectionSpeed } from "@/hooks/use-mobile";
import DiscountBanner from "@/components/DiscountBanner";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSubscription } from "@/services/database-service";

// Import refactored components
import QuizResults from "@/components/home/QuizResults";
import SectionCallout from "@/components/home/SectionCallout";
import BlogShowcase from "@/components/home/BlogShowcase";
import WhatsAppAlertsSection from "@/components/home/WhatsAppAlertsSection";

// Lazy load components
const CVUpload = lazy(() => import("@/components/CVUpload"));
const Features = lazy(() => import("@/components/Features"));
const Footer = lazy(() => import("@/components/Footer"));
const SubscriptionStatus = lazy(() => import("@/components/SubscriptionStatus"));
const ReferAFriend = lazy(() => import("@/components/ReferAFriend"));
const JobSeekerToolkit = lazy(() => import("@/components/JobSeekerToolkit"));
const JobSeekerTools = lazy(() => import("@/components/JobSeekerTools"));

// Simple loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const Index = () => {
  const connectionSpeed = useConnectionSpeed();
  const { user } = useAuth();
  
  // Announcement banner effect
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

  // Get user subscription data
  const [subscription, setSubscription] = useState<{
    tier: SubscriptionTier;
    expiryDate?: string;
  }>({
    tier: "free"
  });

  useEffect(() => {
    const loadSubscriptionData = async () => {
      if (user) {
        try {
          const subscriptionData = await getUserSubscription(user.id);
          if (subscriptionData) {
            setSubscription(subscriptionData);
          }
        } catch (error) {
          console.error("Error loading subscription data:", error);
        }
      } else {
        // Reset to free if not logged in
        setSubscription({ tier: "free" });
      }
    };

    loadSubscriptionData();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Announcement */}
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
      
      {/* Hero Section */}
      <Hero />
      
      {/* CV Upload */}
      <div id="analyze-cv">
        <Suspense fallback={<LoadingComponent />}>
          <CVUpload />
        </Suspense>
      </div>

      {/* Quiz Results Section */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <QuizResults />
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <div id="features">
        <Suspense fallback={<LoadingComponent />}>
          <Features />
        </Suspense>
      </div>
      
      {/* Job Seeker Tools Section */}
      <div id="jobseeker-tools">
        <JobSeekerTools />
      </div>
      
      {/* WhatsApp Alerts Section */}
      <WhatsAppAlertsSection />
      
      {/* Success Stories Callout */}
      <SectionCallout 
        title="Success Stories"
        description="Discover how job seekers across South Africa have boosted their career prospects with our ATS-optimized CV tools."
        buttonText="View Success Stories"
        buttonLink="/success-stories"
        bgColor="bg-sa-blue/5"
        borderColor="border-sa-blue/10"
      />
      
      {/* Job Fit Quiz Callout */}
      <SectionCallout 
        title="Find Your Perfect Job Fit"
        description="Take our quick 5-question quiz to get personalized CV tips for your industry and experience level."
        buttonText="Take the Job Fit Quiz"
        buttonLink="/job-fit-quiz"
        bgColor="bg-white"
        borderColor="border-sa-blue/10"
      />
      
      {/* Refer A Friend Section */}
      <section className="py-8 bg-[#FEF7CD] border-y border-sa-yellow/20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Suspense fallback={<LoadingComponent />}>
              <ReferAFriend />
            </Suspense>
          </div>
        </div>
      </section>
      
      {/* Job Seeker Toolkit Section */}
      <section className="py-8 bg-white border-y border-sa-green/10">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Suspense fallback={<LoadingComponent />}>
              <JobSeekerToolkit />
            </Suspense>
          </div>
        </div>
      </section>
      
      {/* Jobs Callout */}
      <SectionCallout 
        title="Browse Available Jobs"
        description="Explore job opportunities across South Africa and match your CV to specific positions."
        buttonText="View Job Listings"
        buttonLink="/jobs"
        bgColor="bg-sa-blue/5"
        buttonBgColor="bg-sa-blue"
        borderColor="border-sa-blue/10"
      />
      
      {/* Blog Showcase Section */}
      <BlogShowcase />
      
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
      
      <Footer />
      
      {/* Add the discount banner component */}
      {subscription.tier !== "premium" && <DiscountBanner />}
    </div>
  );
};

export default Index;
