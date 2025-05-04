
import { Link } from "react-router-dom";
import { useConnectionSpeed } from "@/hooks/use-mobile";

interface BlogArticlePreview {
  id: number;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: number;
  slug: string;
}

const BlogShowcase = () => {
  const connectionSpeed = useConnectionSpeed();
  
  // Mock articles data
  const articles: BlogArticlePreview[] = [
    {
      id: 1,
      title: "Top 10 CV Tips for the South African Job Market",
      excerpt: "Stand out in South Africa's competitive job market with these essential CV tips tailored for local expectations and ATS requirements.",
      publishDate: "2025-04-15",
      readTime: 8,
      slug: "top-10-cv-tips-south-african-job-market"
    },
    {
      id: 2,
      title: "How to Beat the ATS: A Guide for South African Job Seekers",
      excerpt: "Learn how Applicant Tracking Systems work in the South African context and how to optimize your CV to get past the first digital hurdle.",
      publishDate: "2025-04-10",
      readTime: 10,
      slug: "how-to-beat-the-ats-for-south-african-job-seekers"
    },
    {
      id: 3,
      title: "Critical Keywords for South African CVs by Industry",
      excerpt: "Industry-specific keywords that will help your CV pass ATS screening and catch recruiters' attention in the South African job market.",
      publishDate: "2025-04-05",
      readTime: 12,
      slug: "critical-keywords-for-south-african-cvs-by-industry"
    }
  ];

  // Display different number of articles based on connection speed
  const displayArticles = connectionSpeed === 'slow' ? articles.slice(0, 1) : articles;

  return (
    <section className="py-10 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-2 sm:mb-4">
            Latest CV Tips & Insights
          </h2>
          <p className="text-sa-gray max-w-2xl mx-auto text-sm sm:text-base">
            Expert advice to help you navigate the South African job market and optimize your CV for success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-6 sm:mb-10">
          {displayArticles.map((article) => (
            <Link to={`/blog/${article.slug}`} key={article.id} className="touch-manipulation">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-sa-blue hover:text-sa-green transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sa-gray text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-sa-gray">
                    <span>{article.publishDate}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
  );
};

export default BlogShowcase;
