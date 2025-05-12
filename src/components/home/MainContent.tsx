
import { lazy, Suspense, useState, useEffect, useTransition } from "react";

// Lazy load components
const CVUpload = lazy(() => import("@/components/CVUpload"));
const Features = lazy(() => import("@/components/Features"));
const ReferAFriend = lazy(() => import("@/components/ReferAFriend"));
const JobSeekerToolkit = lazy(() => import("@/components/JobSeekerToolkit"));
const JobSeekerTools = lazy(() => import("@/components/JobSeekerTools"));

// Import refactored components
import QuizResults from "@/components/home/QuizResults";
import SectionCallout from "@/components/home/SectionCallout";
import BlogShowcase from "@/components/home/BlogShowcase";
import WhatsAppAlertsSection from "@/components/home/WhatsAppAlertsSection";
import MetricsSection from "@/components/home/MetricsSection";

// Simple loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const MainContent = () => {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  
  // Use startTransition when component mounts to avoid suspense during initial render
  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);
  
  // If not mounted yet, show a simple loading indicator
  if (!mounted) {
    return <LoadingComponent />;
  }

  return (
    <>
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
      
      {/* Stats Section */}
      <MetricsSection />
      
      {/* Job Seeker Tools Section */}
      <div id="jobseeker-tools">
        <Suspense fallback={<LoadingComponent />}>
          <JobSeekerTools />
        </Suspense>
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
    </>
  );
};

export default MainContent;
