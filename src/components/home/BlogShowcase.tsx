
import { Link } from "react-router-dom";
import { useConnectionSpeed } from "@/hooks/use-mobile";
import { blogArticles } from "@/data/blogArticles";

const BlogShowcase = () => {
  const connectionSpeed = useConnectionSpeed();
  
  // Use our actual blog articles from the data file
  const articles = blogArticles.slice(0, 3);

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
