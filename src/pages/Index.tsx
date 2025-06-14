
import { useState, useEffect, lazy, Suspense, useTransition } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import { SubscriptionTier } from "@/lib/types";
import { useConnectionSpeed } from "@/hooks/use-mobile";
import DiscountBanner from "@/components/DiscountBanner";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSubscription } from "@/services/database-service";

// Import main content component
import MainContent from "@/components/home/MainContent";

// Lazy load subscription status
const SubscriptionStatus = lazy(() => import("@/components/SubscriptionStatus"));

// Simple loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const Index = () => {
  const connectionSpeed = useConnectionSpeed();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  
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

  // Flag to track if subscription data is loading
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  useEffect(() => {
    const loadSubscriptionData = async () => {
      if (user) {
        try {
          setIsLoadingSubscription(true);
          // First mark the transition as pending
          startTransition(() => {
            // Then inside the transition, we do the data fetching
            // This isn't directly in the transition callback, but comes after it
            (async () => {
              const subscriptionData = await getUserSubscription(user.id);
              if (subscriptionData) {
                setSubscription(subscriptionData);
              }
              setIsLoadingSubscription(false);
            })();
          });
        } catch (error) {
          console.error("Error loading subscription data:", error);
          setIsLoadingSubscription(false);
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
      <Helmet>
        <title>HireMzansi: Optimize Your CV for South African Job Applications</title>
        <meta name="description" content="Boost your job application success with HireMzansi. Get your CV optimized for ATS and tailored for South African employers. Sign up now for free!" />
      </Helmet>
      
      {/* Banner Announcement */}
      <div 
        id="announcement-banner"
        className="hidden items-center justify-center bg-gradient-to-r from-sa-green to-sa-blue text-white py-3 px-4 text-sm transition-all shadow-lg"
      >
        <span className="text-center font-medium">🎉 Launch Special: 50% off Premium for the first 500 users!</span>
        <button 
          className="ml-4 text-xs bg-white/20 text-white px-3 py-1 rounded-full hover:bg-white/30 transition touch-manipulation font-medium"
          onClick={() => {
            const banner = document.getElementById("announcement-banner");
            if (banner) banner.classList.add("hidden");
          }}
          aria-label="Dismiss announcement"
        >
          Dismiss
        </button>
      </div>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <MainContent />
      
      {/* Subscription Status */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<LoadingComponent />}>
              {!isLoadingSubscription && (
                <SubscriptionStatus 
                  tier={subscription.tier}
                  expiryDate={subscription.expiryDate}
                />
              )}
            </Suspense>
          </div>
        </div>
      </section>
      
      {/* Add the discount banner component */}
      {subscription.tier !== "premium" && <DiscountBanner />}
    </div>
  );
};

export default Index;
