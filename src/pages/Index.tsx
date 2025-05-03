
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CVUpload from "@/components/CVUpload";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // This will simulate a "banner announcement" that appears after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const bannerElement = document.getElementById("announcement-banner");
      if (bannerElement) {
        bannerElement.classList.remove("hidden");
        bannerElement.classList.add("flex");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Announcement */}
      <div 
        id="announcement-banner"
        className="hidden items-center justify-center bg-sa-green text-white py-2 px-4 text-sm transition-all"
      >
        <span>🎉 Launch Discount: 50% off Premium for the first 500 users!</span>
        <button 
          className="ml-4 text-xs bg-white text-sa-green px-2 py-1 rounded-full hover:bg-opacity-90 transition"
          onClick={() => {
            const banner = document.getElementById("announcement-banner");
            if (banner) banner.classList.add("hidden");
          }}
        >
          Dismiss
        </button>
      </div>

      <Header />
      <Hero />
      <CVUpload />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
