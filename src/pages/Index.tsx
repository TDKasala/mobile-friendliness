
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CVUpload from "@/components/CVUpload";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      
      {/* Blog Showcase Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-sa-blue mb-4">Latest CV Tips & Insights</h2>
            <p className="text-sa-gray max-w-2xl mx-auto">
              Expert advice to help you navigate the South African job market and optimize your CV for success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {/* Only show 3 most recent articles */}
            {[1, 2, 3].map((id) => {
              const article = id <= 5 ? {
                id: id,
                title: ["Top 10 CV Tips for the South African Job Market", "How to Beat the ATS: A Guide for South African Job Seekers", "Critical Keywords for South African CVs by Industry"][id - 1],
                excerpt: ["Stand out in South Africa's competitive job market with these essential CV tips tailored for local expectations and ATS requirements.", "Learn how Applicant Tracking Systems work in the South African context and how to optimize your CV to get past the first digital hurdle.", "Industry-specific keywords that will help your CV pass ATS screening and catch recruiters' attention in the South African job market."][id - 1],
                publishDate: ["2025-04-15", "2025-04-10", "2025-04-05"][id - 1],
                readTime: [8, 10, 12][id - 1],
                slug: ["top-10-cv-tips-south-african-job-market", "how-to-beat-the-ats-for-south-african-job-seekers", "critical-keywords-for-south-african-cvs-by-industry"][id - 1]
              } : null;
              
              return article ? (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-sa-blue hover:text-sa-green transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sa-gray text-sm mb-4 line-clamp-2">{article.excerpt}</p>
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
              className="inline-flex items-center text-sa-blue hover:text-sa-green font-medium transition"
            >
              View all articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
